require "crypto/bcrypt/password"

module Authentic::BasePasswordResetRequestForm
  macro included
    def self.submit(params)
      new(params).submit do |form|
        yield form
      end
    end
  end

  def submit
    validate_password_request(user_from_email)
    valid? && user_from_email.try do |user|
      when_valid(user)
    end
    yield self
  end

  abstract def validate_password_request(user : User?)

  private def user_from_email : User?
    email.value.try do |value|
      UserQuery.new.email(value).first?
    end
  end
end
