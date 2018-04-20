require "crypto/bcrypt/password"

module Authentic::BaseSignInForm
  macro included
    def self.submit(params)
      new(params).submit do |form, user|
        yield form, user
      end
    end
  end

  def submit
    validate_allowed_to_sign_in(user_from_email)
    if valid?
      yield self, user_from_email
    else
      yield self, nil
    end
  end

  abstract def validate_allowed_to_sign_in(user)

  private def user_from_email : User?
    email.value.try do |value|
      UserQuery.new.email(value).first?
    end
  end
end
