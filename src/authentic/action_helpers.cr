# Helpers methods for Lucky actions
module Authentic::ActionHelpers(T)
  SIGN_IN_KEY = "user_id"

  # Signs a user in using the browser session.
  def sign_in(authenticatable : T) : Void
    session.set(SIGN_IN_KEY, authenticatable.id.to_s)
  end

  # Sign the user out by clearing the session.
  def sign_out : Void
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

  # Return the signed in user if signed in, otherwise returns `nil`
  #
  # This method should *not* be overridden. If you want to require a current user,
  # override the `current_user` method (note no `?`).
  def current_user? : T?
    id = session.get?(SIGN_IN_KEY)
    if id
      find_current_user(id)
    end
  end

  abstract def find_current_user(id) : T?
end
