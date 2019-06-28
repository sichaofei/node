var mongodb=require("./../mongodb/connect.js")
var sendFn=require("./send")
module.exports=function(app){
    app.post("/my/msg",function(req,res){
        // console.log(req)
        var id=req.body.userId
        mongodb.findUserMsg(id,"sichaofei",function(data){
            if(data.length==0){
                sendFn(res,0,"没有此用户")
            }else{
                sendFn(res,1,"",data[0])
            }
        })
    })
}