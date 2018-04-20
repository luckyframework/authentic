# Base form class for setting up and validating an Authentic form
#
# This is typically used for a sign in form and a password reset request form.
#
# To see an example, Lucky projects are generated with a `SignInForm` and
# `PasswordResetRequestForm` that use this.
module Authentic::FormHelpers
  # Run validations and yield the form and the authenticatable if valid
  #
  # When you call `submit` the form will find the authenticatable, pass it to
  # your form's `validate` method and then yield the form and the
  # `authenticatable` if the `authenticatable` is found and the form is valid.
  def submit
    authenticatable = find_authenticatable
    validate(authenticatable)

    if valid?
      yield self, authenticatable
    else
      yield self, nil
    end
  end

  abstract def validate(authenticatable)

  abstract def find_authenticatable
end
