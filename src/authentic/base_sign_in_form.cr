require "crypto/bcrypt/password"

module Authentic::BaseSignInForm
  def submit
    authenticatable = find_authenticatable
    validate_allowed_to_sign_in(authenticatable)
    if valid?
      yield self, authenticatable
    else
      yield self, nil
    end
  end

  abstract def validate_allowed_to_sign_in(authenticatable)

  abstract def find_authenticatable
end
