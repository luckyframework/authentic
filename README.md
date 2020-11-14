# Authentic

[![API Documentation Website](https://img.shields.io/website?down_color=red&down_message=Offline&label=API%20Documentation&up_message=Online&url=https%3A%2F%2Fluckyframework.github.io%2Fauthentic%2F)](https://luckyframework.github.io/authentic)

A Crystal library for handling common authentication actions in Lucky projects.

## Installation

Authentic is bundled in Lucky projects automatically.

## Contributing

1. Fork it ( https://github.com/luckyframework/authentic/fork )
1. Create your feature branch (git checkout -b my-new-feature)
1. Install docker and docker-compose: https://docs.docker.com/compose/install/
1. Run `scripts/setup`
1. Make your changes
1. Run `scripts/test` to run the specs, build shards, and check formatting
1. Commit your changes (git commit -am 'Add some feature')
1. Push to the branch (git push origin my-new-feature)
1. Create a new Pull Request

## Testing

To run the tests:

1. Install docker and docker-compose: https://docs.docker.com/compose/install/
1. Run `scripts/setup` to set up the docker environment
1. Run `scripts/test` to run the specs, build shards, and check formatting

You can run individual tests like this: `docker-compose run --rm app crystal spec path/to/spec.cr`

> Remember to run `docker-compose down` when you're done. This will stop the
> Crystal container.

## Contributors

- [paulcsmith](https://github.com/paulcsmith) Paul Smith - creator, maintainer
