const multer=require("multer");

const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,"uploads/chat");
    },
    filename(req,file,cb){
        cb(
            null,
            Date.now()+"-"+file.originalname
        );
    }
});

module.exports=multer({
    storage,
    limits:{
        fileSize:2*1024*1024*1024
    },
    fileFilter(req,file,cb){
        cb(null,true);
    }
});