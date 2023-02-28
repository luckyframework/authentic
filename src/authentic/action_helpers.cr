# Helpers methods for Lucky actions
module Authentic::ActionHelpers(T)
  # Signs a user in using the browser session.
  def sign_in(authenticatable : T) : Nil
    session.set(Authentic.settings.sign_in_key, authenticatable.id.to_s)
  end

  # Sign the user out by clearing the session.
  def sign_out : Nil
    session.clear
  end

  # Returns the signed in user if signed in, otherwise returns `nil`
  #
  # This method is often overridden by different modules/pipes. For example,
  # When sign in is required this method is typically overridden by calling
  # `not_nil!` since the user will always be returned.
  #
  # For an example, see the `Auth::RequireSignIn` module in a newly generated
  # Lucky project.
  def current_user : T?
    current_user?
  end

  # TODO: https://github.com/luckyframework/lucky/issues/1396
  @__current_user : T? = nil

  # Return the signed in user if signed in, otherwise returns `nil`
  #
  # This method should *not* be overridden. If you want to require a current user,
  # override the `current_user` method (note no `?`).
  def current_user? : T?
    @__current_user ||= begin
      if id = session.get?(Authentic.settings.sign_in_key)
        find_current_user(id)
      end
    end
  end

  abstract def find_current_user(id : String | T::PrimaryKeyType) : T?
end
