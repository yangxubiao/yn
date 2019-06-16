#设置浏览器发送服务器的文件脚本为UTF8
SET NAMES UTF8;
#丢弃数据库如果存在
DROP DATABASE IF EXISTS yn;
#创建数据库设置服务器保存到数据库的的数据脚本为UTF8
CREATE DATABASE yn CHARSET=UTF8;
#进入数据库
USE yn;
CREATE TABLE yn_admin(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname CHAR(20),
  upwd  CHAR(11)
);
INSERT INTO yn_admin VALUES 
  (1,"李阳","15838687566"),
  (2,"杨旭彪","17621225524");

CREATE TABLE yn_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname CHAR(20),
  upwd  CHAR(11),
  Rdate DATE,
  Cmoney FlOAT(10,2)
);
INSERT INTO yn_user VALUES 
  (1,"丁丁","11111111111",now(),3789),
  (2,"当当","22222222222",now(),-283);

CREATE TABLE yn_charge(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname CHAR(20),
  Rdate DATE,
  total FlOAT(10,2),
  auditor CHAR(18)
);
INSERT INTO yn_charge VALUES 
  (1,"丁丁",now(),3789,"李阳"),
  (2,"当当",now(),3383,"李阳");

CREATE TABLE yn_history(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname CHAR(20),
  Rdate DATE,
  descInfo CHAR(100),
  total FlOAT(10,2),
  head  CHAR(18)
);
INSERT INTO yn_history VALUES 
  (1,"丁丁",now(),"做指甲",80,"李阳"),
  (2,"当当",now(),"做脚指甲",100,"李阳");
