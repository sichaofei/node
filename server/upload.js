var sendFn=require("./send")
module.exports=function(app,multer){
	var url=""
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
	    console.log(url)
	    cb(null,url);
	  }
	});
	const uploadImg = multer({storage}).single('multfile');
    app.post("/upload/headImg",uploadImg,function(req,res){
    	sendFn(res,1,"",{})
    })
}