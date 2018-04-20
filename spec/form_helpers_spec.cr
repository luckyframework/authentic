require "./spec_helper"

private class TestForm < LuckyRecord::VirtualForm
  include Authentic::FormHelpers

  property authenticatable : FakeAuthenticatable?
  virtual password : String

  private def validate(user : FakeAuthenticatable?)
    if user && user.encrypted_password != "right"
      password.add_error "Password must be: 'right'"
    end
  end

  private def find_authenticatable
    @authenticatable
  end
end

describe Authentic::FormHelpers do
  it "authenticatable is not returned when form is invalid" do
    authenticatable = FakeAuthenticatable.new(encrypted_password: "wrong")
    form = TestForm.new
    form.authenticatable = authenticatable

    form.submit do |form, user|
      form.valid?.should be_false
      user.should be_nil
    end
  end

  it "authenticatable is returned when form is valid" do
    authenticatable = FakeAuthenticatable.new(encrypted_password: "right")
    form = TestForm.new
    form.authenticatable = authenticatable

    form.submit do |form, user|
      form.valid?.should be_true
      user.should eq authenticatable
    end
  end

  it "authenticatable is not returned when it is not found" do
    form = TestForm.new

    form.submit do |form, user|
      form.valid?.should be_true
      user.should be_nil
    end
  end
end
