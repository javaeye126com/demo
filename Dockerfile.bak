FROM ubuntu:14.04

MAINTAINER KiwenLau <kiwenlau@gmail.com>

WORKDIR /root

RUN apt-get update && apt-get install -y openssh-server openjdk-7-jdk wget

RUN  whereis java && ls /usr/lib/jvm/
# install tomcat 7
RUN wget http://mirrors.tuna.tsinghua.edu.cn/apache/tomcat/tomcat-7/v7.0.78/bin/apache-tomcat-7.0.78.tar.gz && \
	tar -xzvf apache-tomcat-7.0.78.tar.gz && \
    mv apache-tomcat-7.0.78 /usr/local/tomcat-7.0.78 && \
    rm apache-tomcat-7.0.78.tar.gz
RUN  ls /usr/local/tomcat-7.0.78 

# install hadoop 2.7.2
RUN wget https://nodejs.org/download/rc/v0.10.41-rc.1/node-v0.10.41-rc.1-linux-x64.tar.gz  && \
    tar -xzvf node-v0.10.41-rc.1-linux-x64.tar.gz  && \
    mv node-v0.10.41-rc.1-linux-x64.tar.gz /usr/local/node-v0.10.41 && \
    rm node-v0.10.41-rc.1-linux-x64.tar.gz
    
RUN node -v     
