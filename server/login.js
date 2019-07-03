var mongodb=require("../mongodb/connect.js")
var sendFn=require("./send")
module.exports=function(app){
    app.post("/login/msg",function(req,res){
        let {name,password}=req.body
        mongodb.findUser(name,"sichaofei",function(data){
            if(data.length==0){
               sendFn(res,0,"用户名错误") 
            }else{
                if(password!=data[0].password){
                    sendFn(res,0,"密码错误") 
                    return
                }
                data[0].password=undefined
                data[0].userId=data[0]._id
                data[0]._id=undefined
                sendFn(res,1,"登陆成功",data[0]) 
            }
        })
    })
}