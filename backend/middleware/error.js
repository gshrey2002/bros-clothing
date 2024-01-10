const { error } = require("console")
const Errorhandler=require("../utils/errorhandler")

module.exports=(err,req,res,next)=>{
    err.statuscode=err.statuscode || 500
    err.message=err.message || "Internal Server Error"

//wrong mongodb-id error

if(err.name == "Casterror"){
    const message=`resource not found. Invalid ${err.path}`
    err=new Errorhandler("message",400)
}


    res.status(err.statuscode).json({
        success:false,
        message:err.message,
    });

};