var sendFn=require("./send")
var imgUrlHead="http://192.168.0.108:8081/images/"
var mongodb=require("../mongodb/connect.js")
var url
module.exports=function(app,multer){
	const storage = multer.diskStorage({
		
	  // destination:'public/uploads/'+new Date().getFullYear() + (new Date().getMonth()+1) + new Date().getDate(),
	  // 设置存储文件地址
	  destination(req,res,cb){
	    cb(null,"public/images");
	  },
	  // 设置存储文件名字
	  filename(req,file,cb){
	    const filenameArr = file.originalname.split('.');
	    url=Date.now() + '.' + filenameArr[filenameArr.length-1]
	    cb(null,url);
	  }
	});
	const uploadImg = multer({storage}).single('multfile');
	// 接受图片存储本地
    app.post("/upload/headImg",uploadImg,function(req,res){
    	console.log(imgUrlHead)
    	console.log(url)
    	imgUrlHead+=url
    	let obg={imgurl:imgUrlHead}
    	sendFn(res,1,"",obg)
    })
    // 图片存储mongodbimg
    app.post("/upload/imgMongodb",function(req,res){
    	var obj={userId:req.body.userId,imgUrl:req.body.imgUrl}
    	mongodb.findUserHeadImg(obj,"userImg",function(results){
    		if(results){
    			sendFn(res,1,"成功",obj)
    		}else{
    			sendFn(res,0,"修改失败",{})
    		}
    	})
    })
    // 查询用户头像
    app.post("/user/headImg",function(req,res){
    	var obj={userId:req.body.userId}
    	mongodb.findUserHeadImg(obj,"userImg",function(results){
    		sendFn(res,1,"ok",results)
    	},"find")
    })
}