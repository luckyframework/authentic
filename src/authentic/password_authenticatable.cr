module Authentic::PasswordAuthenticatable
  abstract def id
  abstract def encrypted_password : String?
end
