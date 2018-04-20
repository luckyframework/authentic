require "./spec_helper"

private class TestSignInForm < LuckyRecord::VirtualForm
  include Authentic::BaseSignInForm

  virtual password : String

  def initialize(
    @authenticatable : FakeAuthenticatable?
  )
  end

  private def validate_allowed_to_sign_in(user : FakeAuthenticatable?)
    if user && user.encrypted_password != "right"
      password.add_error "Password must be: 'right'"
    end
  end

  private def find_authenticatable
    @authenticatable
  end
end

describe Authentic::BaseSignInForm do
  it "authenticatable is not returned when form is invalid" do
    authenticatable = FakeAuthenticatable.new(encrypted_password: "wrong")
    form = TestSignInForm.new(authenticatable)

    form.submit do |form, user|
      form.valid?.should be_false
      user.should be_nil
    end
  end

  it "authenticatable is returned when form is valid" do
    authenticatable = FakeAuthenticatable.new(encrypted_password: "right")
    form = TestSignInForm.new(authenticatable)

    form.submit do |form, user|
      form.valid?.should be_true
      user.should eq authenticatable
    end
  end

  it "authenticatable is not returned when it is not found" do
    form = TestSignInForm.new(nil)

    form.submit do |form, user|
      form.valid?.should be_true
      user.should be_nil
    end
  end
end
