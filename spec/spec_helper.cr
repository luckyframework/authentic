require "spec"
require "avram"
require "../config"
require "../src/authentic"
require "./support/**"

Spec.before_each do
  AppDatabase.truncate
end
