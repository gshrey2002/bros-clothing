const mongoose=require("mongoose");

const validator=require("validator");
const bcrypt=require("bcryptjs")
const jwt= require("jsonwebtoken")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"],
        maxLength:[30,"Cannot exceed max length of name"],
        minLength:[3,"minimum length of name is 2"],
    },
    email:{
        type:String,
        required:[true,"please enter your email"],
        unique:true,
        validate:[validator.isEmail,"please enter a valid email"],
        
    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        minLength:[8,"password should be of minimum length 8 character"],
        select:false,

    },
    profilePhoto:{
        
        publicId:{
            type:String,
            required:true,
        },
        ImageUrl:{
            type:String,
            required:true,
        
        }},
        role:{
            type:String,
            default:"user",

        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    

    
})
userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
})

//jwt token method
userSchema.methods.getJWTToken = function(){
return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE,
});
};

//compare password
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);

}
 // reset password functionality
 userSchema.methods.getResetPasswordToken= function(){
    //generating token
    const resetToken=require('crypto').randomBytes(20).toString("hex");
    

    // hashing and adding token
    this.resetPasswordToken= require('crypto').createHash("sha256").update(resetToken).digest("hash");

    this.resetPasswordExpire=Date.now() + 15 *60*1000;

    return resetToken;

 }

module.exports=mongoose.model("User",userSchema)