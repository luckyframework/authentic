class FakeAuthenticatable
  include Authentic::PasswordAuthenticatable
  alias PrimaryKeyType = Int32

  getter id : Int32
  getter encrypted_password : String?

  def initialize(@id = 1, @encrypted_password = "abc123")
  end
end
