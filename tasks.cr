require "lucky_cli"
require "./src/authentic"
require "./config"
require "./db/migrations/*"

LuckyCli::Runner.run
