require "avram"

database = "authentic_test"

Avram::Repo.configure do |settings|
  if ENV["DATABASE_URL"]?
    settings.url = ENV["DATABASE_URL"]
  else
    settings.url = Avram::PostgresURL.build(
      database: database,
      hostname: "localhost"
    )
  end
end

Lucky::StaticFileHandler.configure do |settings|
  settings.hide_from_logs = true
end

Lucky::Session.configure do |settings|
  settings.key = "_authentic_session"
end

Lucky::ErrorHandler.configure do |settings|
  settings.show_debug_output = true
end

Lucky::LogHandler.configure do |settings|
  settings.show_timestamps = false
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
