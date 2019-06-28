//express_demo.js 文件
var express = require('express');
var bodyParser=require("body-parser");  
// const jwt = require('jsonwebtoken');
// 一般情况下只要设置 dest 属性设置文件存储的位置
var fs=require("fs")
let multer  = require('multer');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
let uploadImg = multer({dest:"public/images"}).single('multfile')
// var multipartMiddleware = multipart();
var reser=require("./reser")
// 登陆服务
var login=require("./login")
// 获取用户信息
var my=require("./myMsg")
// 上传图片
var upload=require("./upload")
var app = express();
// app.use(objMulter.any());
app.use(bodyParser.json());//数据JSON类型
// app.use(multer)
app.use(express.static('../public'))
// app.use(multer);
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization, Accept,X-Requested-With,token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});
reser(app)
login(app)
my(app)
upload(app,uploadImg)
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
