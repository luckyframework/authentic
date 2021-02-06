require "habitat"
require "lucky"
require "avram"
require "crypto/bcrypt/password"
require "./authentic/*"

# Module for handling authentication
#
# ## Configuration
#
# Authentic uses [Habitat](https://github.com/luckyframework/habitat) for
# configuration.
#
# Here's how to set it up:
#
# ```
# # Most of this is set up for you when you generate a new Lucky project.
# # This is usually in config/authentic.cr
# Authentic.configure do |settings|
#   # Required: You must set a secret key for encrypting password reset tokens
#   # Hint: generate a key with: Random::Secure.base64(32)
#   settings.secret_key = "32 character long secret"
#
#   # Optional: `encryption_cost` defaults to `Crypto::Bcrypt::DEFAULT_COST`
#   # For faster tests set to 4 (the lowest allowed cost).
#   # Make sure to use `Crypto::Bcrypt::DEFAULT_COST` in production
#   settings.encryption_cost = 1
#
#   # Optional: `default_password_reset_time_limit` defaults to 15.minutes
#   settings.default_password_reset_time_limit = 1.day
# end
# ```
module Authentic
  Habitat.create do
    setting encryption_cost : Int32 = Crypto::Bcrypt::DEFAULT_COST
    setting default_password_reset_time_limit : Time::Span = 15.minutes
    setting secret_key : String
  end

  # Remember the originally requested path if it is a GET
  #
  # Call this if the user requested an action that requires sign in.
  # It will remember the path they requested if it is a get.
  #
  # Once the user signs in call `Authentic.redirect_to_originally_requested_path`
  # to redirect them back.
  def self.remember_requested_path(action : Lucky::Action) : Void
    if action.request.method.upcase == "GET"
      action.session.set(:return_to, action.request.resource)
    end
  end

  # After successful sign in, call this to redirect back to the originally request path
  #
  # First call `Authentic.remember_requested_path` if the user is not signed in.
  # Then call this to redirect them. A `fallback` action is required. The
  # `fallback` action will be used if user was not trying to access a protected
  # page before sign in.
  def self.redirect_to_originally_requested_path(
    action : Lucky::Action,
    fallback : Lucky::Action.class | Lucky::RouteHelper
  ) : Lucky::Response
    return_to = action.session.get?(:return_to)
    action.session.delete(:return_to)
    action.redirect to: return_to || fallback
  end

  # Checks whether the password is correct
  #
  # ```
  # user = UserQuery.first
  # Authentic.correct_password?(user, "my-password")
  # ```
  def self.correct_password?(
    authenticatable : Authentic::PasswordAuthenticatable,
    password_value : String
  ) : Bool
    encrypted_password = authenticatable.encrypted_password

    if encrypted_password
      Crypto::Bcrypt::Password.new(encrypted_password).verify(password_value)
    else
      false
    end
  end

  # Encrypts a form password
  #
  # ```
  # class SignUpUser < User::SaveOperation
  #   attribute password : String
  #
  #   before_save encrypt_password
  #
  #   def encrypt_password
  #     # Encrypt the `password` and copy the value to the `encrypted_password` field
  #     Authentic.copy_and_encrypt password, to: encrypted_password
  #   end
  # end
  # ```
  def self.copy_and_encrypt(
    from password_field : Avram::Attribute | Avram::PermittedAttribute,
    to encrypted_password_field : Avram::Attribute | Avram::PermittedAttribute
  ) : Void
    password_field.value.try do |value|
      encrypted_password_field.value = generate_encrypted_password(value)
    end
  end

  # Generates a encrypted password from a password string
  #
  # By default it uses Bcrypt to encrypt the password.
  def self.generate_encrypted_password(
    password_value : String,
    encryptor = Crypto::Bcrypt::Password
  ) : String
    encryptor.create(
      password_value,
      cost: settings.encryption_cost
    ).to_s
  end

  # Generates a password reset token
  def self.generate_password_reset_token(
    authenticatable : Authentic::PasswordAuthenticatable,
    expires_in : Time::Span = Authentic.settings.default_password_reset_time_limit
  ) : String
    encryptor = Lucky::MessageEncryptor.new(secret: settings.secret_key)
    encryptor.encrypt_and_sign("#{authenticatable.id}:#{expires_in.from_now.to_unix_ms}")
  end

  # Checks that the given reset token is valid
  #
  # A token is valid if the id matches the authenticatable and the token is not
  # expired.
  #
  # To generate a token see `Authentic.generate_password_reset_token`
  def self.valid_password_reset_token?(
    authenticatable : Authentic::PasswordAuthenticatable,
    token : String
  ) : Bool
    encryptor = Lucky::MessageEncryptor.new(secret: settings.secret_key)
    user_id, expiration_in_ms = String.new(encryptor.verify_and_decrypt(token)).split(":")
    Time.utc.to_unix_ms <= expiration_in_ms.to_i64 && user_id.to_s == authenticatable.id.to_s
  end

  private def self.secret_key
    if settings.secret_key.length != 32
      raise "Authentic secret_key must be 32 characters long"
    end
    settings.secret_key
  end
end
