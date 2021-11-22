database = "authentic_test"

class AppDatabase < Avram::Database
end

AppDatabase.configure do |settings|
  if ENV["DATABASE_URL"]?
    settings.credentials = Avram::Credentials.parse(ENV["DATABASE_URL"])
  else
    settings.credentials = Avram::Credentials.new(
      database: database,
      hostname: "db",
      username: "lucky",
      password: "developer"
    )
  end
end

Avram.configure do |settings|
  settings.database_to_migrate = AppDatabase
end

Lucky::ForceSSLHandler.configure do |settings|
  settings.enabled = false
end

Lucky::Session.configure do |settings|
  settings.key = "_authentic_session"
end

Lucky::ErrorHandler.configure do |settings|
  settings.show_debug_output = true
end

Lucky::RouteHelper.configure do |settings|
  settings.base_uri = "example.com"
end

Lucky::Server.configure do |settings|
  settings.secret_key_base = Random::Secure.base64(32)
end

Lucky::Server.configure do |settings|
  settings.host = "localhost"
  settings.port = 3000
end

Authentic.configure do |settings|
  settings.secret_key = "1" * 32
  settings.encryption_cost = 4
end

Habitat.raise_if_missing_settings!
