const Errorhandler = require("../utils/errorhandler");
const catchasyncerror=require("../middleware/catchasyncerror")
const User=require("../model/usermodel");
const sendtoken = require("../utils/jwttoken");
const sendEmail=require("../utils/sendemail");

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

 // logout user
 exports.logout=catchasyncerror(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httponly:true,
    });
    res.status(200).json({
        success:true,
        message:"logged out",
    });
 });

 //forgot password
 exports.forgotPassword=catchasyncerror(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return next(new Errorhandler("error user not found",404))
    }
    // get restet token
    const resetTokenn=user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl= `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetTokenn}`

    const message=`your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this Kindly Ignore it`;

    try{
        await sendEmail({
            email:user.email,
            subject: `Bros-Clothing Password Recovery ${user.email}`,
            message,

        })
        res.status(200).json({
            success:true,
            message:`email sent to ${user.email} successfully`
        })

    }catch(error){
        user.resetPasswordToken= undefined;
        user.resetPasswordExpire= undefined;
        await user.save({validateBeforeSave:false});

        return next(new Errorhandler(error.message,500))

    }
 })
