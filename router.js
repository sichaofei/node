var fs=require("fs")
module.exports =function router(pathname,response){
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile("./view"+pathname,function(err,data){
        if(!err){
        console.log(data)
        response.write(data);
        }else{
            
        }
        response.end();
    })
   
}