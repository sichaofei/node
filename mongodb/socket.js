var mongodb=require("mongodb");
var MongoClient=mongodb.MongoClient;
var connStr="mongodb://127.0.0.1:27017/";
var ObjectId = require('mongodb').ObjectId
//连接数据库
function _connect(cb){
    MongoClient.connect(connStr, { useNewUrlParser: true },function(err,client){
        if(err){
            console.log("失败");
        }else{
            var db=client.db("sichaofei");
            cb(db,client);
        }
    })
}
// 链接socket用户
module.exports.socketUSers=function(message,connection,cd){
    _connect(function(db,client){
        db.collection(connection).find({userId:message.userId}).toArray(function(err,results){
            // console.log(results)
            var obj={message,db,client,connection,cd}
           if(results.length==0){
                insertSocketUser(obj)
           }else{
               cd()
                client.close()
           }
        })
    })
}
// 加入socketuser
function insertSocketUser(obj){
    var {message,db,client,connection,cd}=obj
    db.collection(connection).insertOne(message,function(err,results){
        if(!err){
            cd("ok")
        }else{
            cd()
        }
        client.close()
    })
}
// 实时更新socketId
// function uplateSocketId(obj){
//     var {message,db,client,connection,cd}=obj
//     var updateStr = {$set: message};
//     var whereStr={userId:message.userId}
//     db.collection(connection).updateOne(whereStr, updateStr, function(err, results) {
//         if(!err){
//             cd(results)
//         }
//         client.close()
//     });
// }
// 查询在线人数
module.exports.findNum=function(connection,cd){
    _connect(function(db){
        db.collection(connection).find({}).toArray(function(err,results){
            cd(results)
        })
    })
}
// 用户离线
module.exports.outNum=function(userId,connection,cd){
    _connect(function(db){
        db.collection(connection).deleteOne({userId:userId},function(){
            cd()
        })
    })
}
// searchUser
// function searchUser(results,userId){
//     for(var a=0;a<results.length;a++){
//         if(results[a].userId!=userId){
//             return true
//         }else{
//             return false
//         }
//     }
// }