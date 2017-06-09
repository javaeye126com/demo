FROM ubuntu:14.04

MAINTAINER KiwenLau <kiwenlau@gmail.com>

WORKDIR /root

RUN apt-get update && apt-get install -y openssh-server openjdk-7-jdk wget

RUN  whereis java && ls /usr/lib/jvm/

# install hadoop 2.7.2
RUN wget https://nodejs.org/download/rc/v0.10.41-rc.1/node-v0.10.41-rc.1-linux-x64.tar.gz node-v0.10.41.tar.gz && \
    tar -xzvf node-v0.10.41.tar.gz  && \
    mv node-v0.10.41 /usr/local/node-v0.10.41 && \
    rm node-v0.10.41.tar.gz
    
RUN node -v     
