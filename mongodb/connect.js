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
// 创建存储图片集合并存储 
// module.exports.uploadImg=function(obj,connection,cd){
//     _connect(function(db){
//         db.collection(connection).insertOne(obj,function(err,results){
//             if(!err){
//                 cd(results)
//             }else{
//                 cd()
//             }
//         })
//     })
// }
function insertImg(db,connection,cd,obj){
     db.collection(connection).insertOne(obj,function(err,results){
             if(!err){
                 cd(results)
             }else{
                 cd()
             }
    })
}
// 查询用户头像集合
module.exports.findUserHeadImg=function(obj,connection,cd,find){
    let id=obj.userId
    var whereStr={userId:id}
    _connect(function(db){
        db.collection(connection).find(whereStr).toArray(function(err,results){
            if(find){
                cd(results[0])
            }else{
                    if(results.length==0){
                        insertImg(db,connection,cd,obj)
                    }else{
                        reserveImg(db,connection,cd,results,obj)
                    }
            }
           
        })
    })
}
//更新用户头像
function reserveImg(db,connection,cd,results,obj){
     let id=obj.userId
     let url=obj.imgUrl[0]
    let whereStr={userId:id}
    let imgUrl=results[0].imgUrl
    imgUrl.unshift(url)
     var updateStr = {$set: { "imgUrl": imgUrl}};
    db.collection(connection).updateOne(whereStr, updateStr, function(err, results) {
        if(!err){
            cd(results)
        }
    });
}
// 查询符合的用户历史头像
module.exports.uplateHistoryImg=function(obj,connection,cd){
    var whereStr={userId:obj.userId}
    var updateStr
   _connect(function(db){
       db.collection(connection).find({userId:obj.userId}).toArray(function(err,results){
           let imgList=results[0].imgUrl
           for(var i=0;i<imgList.length;i++){
               if(imgList[i]==obj.imgUrl){
                imgList.splice(i,1);
                imgList.unshift(obj.imgUrl)
                updateStr = {$set: { "imgUrl": imgList}};
                changeHistoryImg(db,updateStr,whereStr,cd,connection)
                break
               }
           }
       })
   })
}
// 更改历史头像位置
function changeHistoryImg(db,updateStr,whereStr,cd,connection){
    db.collection(connection).updateOne(whereStr,updateStr,function(err,results){
        if(!err){
            cd("ok")
        }
        
    })
}
// 查找所有用户
module.exports.peoples=function(connection,cd){
    _connect(function(db,client){
        db.collection(connection).find({}).toArray(function(err,results){
            cd(results)
            client.close()
        })
    })
}