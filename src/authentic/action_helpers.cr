module Authentic::ActionHelpers
  # Signs a user in using the browser session
  private def sign_in(user : User)
    session["user_id"] = user.id.to_s
  end

  # Sign the user out by clearing the session
  private def sign_out
    session.destroy
  end

  # Checks if the user is signed in
  private def signed_in? : Bool
    !!current_user?
  end

  # Returns the current_user if signed in, otherwise returns `nil`
  #
  # This method is often overriden by different modules/pipes. For example,
  # When sign in is required this method is typically overridden by calling
  # `not_nil!` since the user will always be returned
  private def current_user : User?
    current_user?
  end

  # Return the current_user if there is one, otherwise returns `nil`
  private def current_user? : User?
    user_id = session["user_id"]
    if user_id
      UserQuery.new.id(user_id).first?
    end
  end
end
