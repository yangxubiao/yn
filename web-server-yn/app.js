//引入模板
const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const userRouter=require("./routes/user");
const session=require('express-session')

//创建服务器
var server=express();
//监听端口
server.listen(3000);

//server.use(cors,{
  //  "Origin":"http://127.0.0.1:5500"
//})
server.use(cors({
    origin:
    ["http://127.0.0.1:8080","http://127.0.0.1:8081","http://127.0.0.1:8082","http://127.0.0.1:8083","http://localhost:8080","http://localhost:8081","http://localhost:8082","http://localhost:8083"],//放行的端口号，是自己本机的端口号，所以是用自己本身的ip
    credentials:true
  }));
server.use(session({
  secret:"128位字符串",
  resave:false,
  saveUninitialized:true
}))
//插入中间件解析浏览器的post发来的url
server.use(bodyParser.urlencoded({
    extended:false
}));
//中间件 静态页面托管
//server.use(express.static("../public"))
// 中间件 为路由添加别名
server.use("/user",userRouter);