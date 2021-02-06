FROM crystallang/crystal:0.36.1

RUN apt-get update
RUN apt-get install -y libgconf-2-4 \
  build-essential \
  curl \
  libreadline-dev \
  libevent-dev \
  libssl-dev \
  libxml2-dev \
  libyaml-dev \
  libgmp-dev \
  git \
  postgresql \
  postgresql-contrib
# Lucky cli
RUN git clone https://github.com/luckyframework/lucky_cli --branch v0.25.0 --depth 1 /usr/local/lucky_cli
WORKDIR /usr/local/lucky_cli
RUN shards install && crystal build src/lucky.cr -o /usr/local/bin/lucky
# Cleanup leftovers
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN mkdir /data
WORKDIR /data
COPY shard.* /data/
RUN shards install
ADD . /data
