require "./spec_helper"

class Authentication::TestAction < Lucky::Action
  include Authentic::ActionHelpers(FakeAuthenticatable)

  get "/test-auth" { text "Doesn't matter" }

  private def find_current_user(id) : FakeAuthenticatable
    FakeAuthenticatable.new(id: id.to_i)
  end
end

describe Authentic::ActionHelpers do
  it "can sign in a user" do
    action = build_action
    authenticatable = FakeAuthenticatable.new(id: 123)
    action.session.get?("user_id").should be_nil

    action.sign_in(authenticatable)

    action.session.get?("user_id").should eq "123"
  end

  it "can sign out a user" do
    action = build_action
    action.sign_in(FakeAuthenticatable.new)

    action.sign_out

    action.session.get?("user_id").should be_nil
  end

  it "returns the current user using the #find_user method" do
    action = build_action
    action.sign_in(FakeAuthenticatable.new(id: 123))

    action.current_user.should be_a FakeAuthenticatable
    action.current_user.not_nil!.id.should eq 123
  end

  it "returns nil if user is not signed in?" do
    action = build_action

    action.current_user.should be_nil
  end
end

private def empty_params
  {} of String => String
end

private def build_action
  context = ContextHelper.new.build
  Authentication::TestAction.new(context, empty_params)
end
