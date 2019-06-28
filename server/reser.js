var mongodb=require("../mongodb/connect.js")
var sendFn=require("./send")

module.exports=function(app){
    app.get('/index', function (req, res) {
            mongodb.insertOne({name:"阿建设规划"},"sichaofei",function(data){
                if(data=="404"){
                    res.sendStatus(404)
                }else{
                    res.send(data)
                }
            })
    })
    app.get("/index.html",function(req,res){
        res.sendFile("./view/index.html" );
    })
    app.post("/reser/msg",function(req,res){
        mongodb.findUser(req.body.name,"sichaofei",function(data){
            if(data.length>0){
                sendFn(res,0,"用户名已存在")
                return
            }
            let user={
                name:req.body.name,
                password:req.body.password,
                phone:req.body.phone
            }
            findPhone(res,req.body.phone,user)
        })
    })
    // // 执行发送数据任务
    // function sendFn(res,code,msg){
    //     outData.code=code
    //     outData.msg=msg
    //     res.send(outData)
    // }
    // 查看用户手机号是否注册
    function findPhone(res,phone,user){
        mongodb.findPhone(phone,"sichaofei",function(data){
            if(data.length>0){
                sendFn(res,0,"当前手机号已被注册")
                return
            }
            reserUser(user,res)
        })
    }
    // 执行注册用户任务
    function reserUser(user,res){
        mongodb.reserUser(user,"sichaofei",function(data){
            if(data==1){
                sendFn(res,1,"")
            }else{
                sendFn(res,0,"注册失败")
            }
        })
    }
}