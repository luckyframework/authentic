class CreateUsers::V20180416193329 < Avram::Migrator::Migration::V1
  def migrate
    create :users do
      add email : String, unique: true
      add encrypted_password : String
    end
  end

  def rollback
    drop :users
  end
end
