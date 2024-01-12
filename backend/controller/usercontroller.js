const Errorhandler = require("../utils/errorhandler");
const catchasyncerror=require("../middleware/catchasyncerror")
const User=require("../model/usermodel");
const sendtoken = require("../utils/jwttoken");

//register user
 exports.registerUser = catchasyncerror(async (req,res,next)=>{
    const {name,email,password}=req.body;
    const userDetail = await User.create({
        name,
        email,
        password,
        profilePhoto:{
            publicId:"image public id",
            ImageUrl:"image url"
        },

    });
    // const token=userDetail.getJWTToken();

    // res.status(201).json({
    //     success:true,
    //     token
    // });
    sendtoken(userDetail,201,res)

 })
 //login user
 exports.loginUser=catchasyncerror(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new Errorhandler("Please enter email or password ",400));
    }
    const user=await User.findOne({ email }).select("+password")
    if(!user){
        return next(new Errorhandler("Invalid email or password ",401))
    }

    const isPasswordMatched = await user.comparePassword(password);
    // const isPasswordMatched=user.comparePassword();

    if(!isPasswordMatched){
        return next(new Errorhandler("Invalid email or password ",401))
    }
    // const token=user.getJWTToken();

    // res.status(200).json({
    //     success:true,
    //     token
    // });
    sendtoken(user,200,res);
 })
