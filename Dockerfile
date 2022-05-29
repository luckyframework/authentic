FROM crystallang/crystal:1.4.1

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

RUN mkdir /data
WORKDIR /data
COPY shard.* /data/
RUN shards install
ADD . /data
