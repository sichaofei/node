var mongodb=require("../../mongodb/connect")
var sendFn=require("../send")
module.exports=function(app){
var list=[]
app.post("/find/friend",function(req,res){
    mongodb.peoples("sichaofei",function(results){
        for(var a=0;a<results.length;a++){
            clear(results[a])
        }
        sendFn(res,1,"ok",list)
        list=[]
    })
})
    function clear(item){
        var user={}
       let name=item.name
       let userId=item._id
       user.name=name
       user.userId=userId
       list.push(user)
    }
}