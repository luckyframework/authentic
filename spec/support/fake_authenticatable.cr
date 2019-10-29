class FakeAuthenticatable
  include Authentic::PasswordAuthenticatable

  getter id : Int32
  getter encrypted_password : String?

  def initialize(@id = 1, @encrypted_password = "abc123")
  end
end
