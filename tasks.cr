require "lucky_task"
require "./src/authentic"
require "./config"
require "./db/migrations/*"

LuckyTask::Runner.run
