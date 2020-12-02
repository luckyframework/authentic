class CreateUsers::V20180416193329 < Avram::Migrator::Migration::V1
  def migrate
    create :users do
      add email : String, unique: true
      add encrypted_password : String
    end
    execute <<-SQL
    CREATE EXTENSION IF NOT EXISTS citext;
SQL
    execute <<-SQL
    ALTER TABLE users ALTER COLUMN email TYPE citext;
SQL
  end

  def rollback
    drop :users
  end
end
