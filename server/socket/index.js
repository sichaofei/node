var mongodb=require("../../mongodb/socket")

module.exports=function(io){
    var socketIdList=[]
    io.on('connection', function(socket){
        var query = socket.request._query;
        var userId=query.userId
        // 用户登陆
        // 存储socket和userID
        var obj={}
        var clientIp = socket.request.connection.remoteAddress
        // console.log(clientIp)
        var socketId = socket.id;
        // id相同ip不同强制退出登录
        socketIdList.map((item,index)=>{
            if(item.userId==userId){
                if(clientIp!=item.ip){
                    if (io.sockets.connected[item.socketId]) {
                        io.sockets.connected[item.socketId].emit('goout');
                    }
                }
                socketIdList.splice(index,1)
            }
        })
        //
        obj.userId=userId
        obj.socketId=socketId
        obj.ip=clientIp
        socketIdList.push(obj)
        // console.log(socketIdList)
        // io.sockets.emit("message","ni好")
        // socketArr.push(socketId); //把连接的socket.id都存入数组
        socket.on("socketlogin", function(message) {
            mongodb.socketUSers(message,"socketUser",function(){
                    sendOut()
            })            
        })
        //    接受请求查询在线人数
        socket.on("reqNum",function(){
            sendOut()
        })
        // 全体广播在线人数
        function sendOut(){
            mongodb.findNum("socketUser",function(results){
                io.sockets.emit("userNum",results)
            })
        }
        // 用户退出
        socket.on("socketOut",function(message){
            mongodb.outNum(message,"socketUser",function(){
                sendOut()
            })
        })
        // 接受好友发送消息

        // 向好友发消息
        socket.on("sendMsgTo",function(message){
            // 查询特定socketID发送消息
            var socketId
            var userId
            socketIdList.map((item,index)=>{
                if(item.userId==message.userId){
                    socketId=item.socketId
                    userId=item.userId
                }
            })
            if (io.sockets.connected[socketId]) {
                io.sockets.connected[socketId].emit('message',{msg:message.msg,userId:userId,oneUserId:message.oneUserId});
            }
        })
    })
}