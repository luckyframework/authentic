class FakeAuthenticatable
  include Authentic::PasswordAuthenticatable

  getter id, encrypted_password

  def initialize(@id : Int32 = 1, @encrypted_password : String = "abc123")
  end
end
