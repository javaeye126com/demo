
FROM registry.cn-hangzhou.aliyuncs.com/docker-base-env/centos-base:6.7 
MAINTAINER sss

WORKDIR /root

# install openssh-server, openjdk and wget
RUN yum update -y && yum install -y openssh-server  java-1.7.0-openjdk.x86_64 wget 
#mkdir 
RUN mkdir -p /opt/modules/hadoop /opt/modules/tomcat-7.0.78
# install hadoop 2.7.2
RUN wget --no-check-certificate https://mirrors.cnnic.cn/apache/hadoop/common/hadoop-2.7.2/hadoop-2.7.2.tar.gz && \
    tar -xzvf hadoop-2.7.2.tar.gz && \
    mv hadoop-2.7.2 /opt/modules/hadoop && \
    rm hadoop-2.7.2.tar.gz
#install tomcat7	
RUN wget http://mirrors.tuna.tsinghua.edu.cn/apache/tomcat/tomcat-7/v7.0.78/bin/apache-tomcat-7.0.78.tar.gz && \
	  tar -xzvf apache-tomcat-7.0.78.tar.gz && \
    mv apache-tomcat-7.0.78 /opt/modules/tomcat-7.0.78 && \
    rm apache-tomcat-7.0.78.tar.gz
RUN  chmod 777 /opt/modules/tomcat-7.0.78/*
RUN /opt/modules/tomcat-7.0.78/bin/catalina.sh run 
EXPOSE 8080
CMD [ "sh", "-c", "service ssh start; bash"]

