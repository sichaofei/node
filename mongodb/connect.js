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
            cb(db);
        }
    })
}
/***********************插入*******************************/
// 查找是否存在用户名
module.exports.findUser=function(name,connection,cd){
    _connect(function(db){
        db.collection(connection).find({name:name}).toArray(function(err,results){
            cd(results)
        })
    })
}
// 注册时查找手机号是否已经注册
module.exports.findPhone=function(phone,connection,cd){
    _connect(function(db){
        db.collection(connection).find({phone:phone}).toArray(function(err,results){
            cd(results)
        })
    })
}
// 注册一个用户
module.exports.reserUser=function(obj,connection,cd){
    _connect(function(db){
        var timestamp=new Date().getTime()
        console.log(timestamp)
        obj.timestamp=timestamp
        console.log(obj)
        db.collection(connection).insertOne(obj,function(err,results){
            if(err){
                cd(0)
            }else{
                cd(1) 
            }  
        })
    })
}
// 获取用户信息
module.exports.findUserMsg=function(id,connection,cd){
    _connect(function(db){
        let _id = ObjectId(id);
        db.collection(connection).find({_id:_id}).toArray(function(err,results){
           results[0].password=undefined
            cd(results)
        })
    })
}