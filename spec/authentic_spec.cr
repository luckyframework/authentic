require "./spec_helper"

class Test::Action < Lucky::Action
  get "/" { text "Doesn't matter" }
end

class Fallback::Action < Lucky::Action
  get "/fallback" { text "Doesn't matter" }
end

private class FakeEncryptor
  getter value_to_encrypt : String?
  getter cost : Int32?

  def create(@value_to_encrypt, @cost)
    self
  end

  def to_s
    "fake encrypted value - #{value_to_encrypt}"
  end
end

describe Authentic do
  it "remembers the requested path if it is a GET " do
    context = ContextHelper.new(path: "/redirect_here").build
    action = Test::Action.new(context, empty_params)
    action.session.get?(:return_to).should be_nil

    Authentic.remember_requested_path(action)

    action.session.get?(:return_to).should eq "/redirect_here"
  end

  it "does not remember the requested path if it isn't a GET " do
    context = ContextHelper.new(method: "POST").build
    action = Test::Action.new(context, empty_params)
    action.session.get?(:return_to).should be_nil

    Authentic.remember_requested_path(action)

    action.session.get?(:return_to).should be_nil
  end

  it "redirects to originally requested path if it is set" do
    context = ContextHelper.new.build
    action = Test::Action.new(context, empty_params)
    action.session.set(:return_to, "/redirect_here")

    response = Authentic.redirect_to_originally_requested_path(
      action,
      fallback: Fallback::Action
    )

    response.context.response.headers["Location"].should eq "/redirect_here"
  end

  it "redirects to fallback Lucky::Action.class if return to is not set" do
    context = ContextHelper.new.build
    action = Test::Action.new(context, empty_params)

    response = Authentic.redirect_to_originally_requested_path(
      action,
      fallback: Fallback::Action
    )

    response.context.response.headers["Location"].should eq Fallback::Action.path
  end

  it "redirects to fallback RouteHelper if return_to is not set" do
    context = ContextHelper.new.build
    action = Test::Action.new(context, empty_params)

    response = Authentic.redirect_to_originally_requested_path(
      action,
      fallback: Fallback::Action.route
    )

    response.context.response.headers["Location"].should eq Fallback::Action.path
  end

  it "can check whether the given password is correct or not" do
    encrypted_password = Authentic.generate_encrypted_password("password")
    authenticatable = FakeAuthenticatable.new(encrypted_password: encrypted_password)
    authenticatable_without_password = FakeAuthenticatable.new(encrypted_password: nil)

    Authentic.correct_password?(authenticatable, "password").should be_true
    Authentic.correct_password?(authenticatable, "incorrect password").should be_false
    Authentic.correct_password?(authenticatable_without_password, "anything").should be_false
  end

  it "can save an encrypted password to a Avram::Attribute" do
    password = build_field(value: "password")
    encrypted_password = build_field(value: "")

    Authentic.copy_and_encrypt from: password, to: encrypted_password

    encrypted_password.value.not_nil!.size.should eq 60
  end

  it "can create an encrypted password" do
    encryptor = FakeEncryptor.new

    encrypted_password = Authentic.generate_encrypted_password("password", encryptor)

    encrypted_password.should eq "fake encrypted value - password"
    encryptor.value_to_encrypt.should eq "password"
    encryptor.cost.should eq Authentic.settings.encryption_cost
  end

  it "can generate and check for a valid password reset token" do
    authenticatable = FakeAuthenticatable.new(id: 1)
    other_authenticatable = FakeAuthenticatable.new(id: 2)

    fresh_token = Authentic.generate_password_reset_token(authenticatable, expires_in: 1.second)
    Authentic.valid_password_reset_token?(other_authenticatable, fresh_token).should be_false
    Authentic.valid_password_reset_token?(authenticatable, fresh_token).should be_true

    expired_token = Authentic.generate_password_reset_token(authenticatable, expires_in: 0.seconds)
    sleep(0.01)
    Authentic.valid_password_reset_token?(other_authenticatable, expired_token).should be_false
    Authentic.valid_password_reset_token?(authenticatable, expired_token).should be_false
  end
end

private def empty_params
  {} of String => String
end

private def build_field(value)
  Avram::Attribute.new(
    name: :does_not_matter,
    value: value,
    param: nil,
    param_key: "does_not_matter"
  )
end
