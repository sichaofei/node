var sendFn=require("./send")
module.exports=function(app,uploadImg){
    app.post("/upload/headImg",uploadImg,function(req,res){
        console.log(req.body)
        sendFn(res,1,"",{})
    })
}