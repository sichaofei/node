//express_demo.js 文件
var express = require('express');
var bodyParser=require("body-parser");  
var fs=require("fs")
// 读取文件
var multer  = require('multer')
// 处理formdata
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
app.use(express.static('./public'))
// app.use(multer);
app.all('*', function (req, res, next) {
   var orginList=[
        "http://localhost:8080",
        "http://192.168.0.108:8080",
    ]
    if(orginList.includes(req.headers.origin.toLowerCase())){
        //设置允许跨域的域名，*代表允许任意域名跨域
        res.header("Access-Control-Allow-Origin",req.headers.origin);
    }
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization, Accept,X-Requested-With,token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
    else next();
});
// 路由模块逻辑
reser(app)
login(app)
my(app)
upload(app,multer)
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
