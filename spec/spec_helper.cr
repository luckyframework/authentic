require "spec"
require "../src/authentic"
require "../config"
require "./support/**"

Spec.before_each do
  AppDatabase.truncate
end
