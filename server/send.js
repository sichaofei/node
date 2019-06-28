var outData={
    code:'',
    msg:"",
    data:{}
}
// code为1成功 0失败
// 执行发送数据任务
module.exports=function(res,code,msg,data){
    outData.code=code
    outData.msg=msg
    outData.data=data
    res.send(outData)
}