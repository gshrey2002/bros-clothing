const { error } = require("console")
const Errorhandler=require("../utils/errorhandler")

module.exports=(err,req,res,next)=>{
    err.statuscode=err.statuscode || 500
    err.message=err.message || "Internal Server Error"

//wrong mongodb-id error

if(err.name == "Casterror"){
    const message=`resource not found. Invalid ${err.path}`
    err=new Errorhandler(message,400)
}

//mongodb duplicate key error
if(err.code===11000){
    const message=`duplicate ${Object.keys(err.keyValue)} entered `
    err=new Errorhandler(message,400)
}

//jwt token

if(err.name == "JsonWebTokenError"){
    const message=`JSON web token is invalid , try again`
    err=new Errorhandler(message,400)
}

//jwt expire error

if(err.name == "TokenExpiredError"){
    const message=`JSON web token is expired , try again`
    err=new Errorhandler(message,400)
}

    res.status(err.statuscode).json({
        success:false,
        message:err.message,
    });

};