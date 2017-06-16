
FROM registry.cn-hangzhou.aliyuncs.com/docker-base-env/centos-base:base-1.0 
MAINTAINER admin

WORKDIR /root

# install   openjdk  1.7
RUN yum install -y  java-1.7.0-openjdk.x86_64  
#mkdir 
RUN mkdir -p /opt/modules/
 
#install tomcat7	
RUN wget http://mirrors.tuna.tsinghua.edu.cn/apache/tomcat/tomcat-7/v7.0.78/bin/apache-tomcat-7.0.78.tar.gz && \
    tar -xzvf apache-tomcat-7.0.78.tar.gz && \
    mv apache-tomcat-7.0.78 /opt/modules/tomcat-7.0.78 && \
    rm apache-tomcat-7.0.78.tar.gz
RUN  chmod 777 /opt/modules/tomcat-7.0.78/*
#RUN sh /opt/modules/tomcat-7.0.78/bin/catalina.sh run 
EXPOSE 8080
#CMD [ "sh", "-c", "service ssh start; bash"]
CMD [ "sh", "-c", "/opt/modules/tomcat-7.0.78/bin/catalina.sh run ; bash"] 

