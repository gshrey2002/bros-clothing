// token creating and cookie 

const sendtoken=(user,statusCode,res)=>{
const token=user.getJWTToken();
// option for cookie
const option={
    
    expire:new Date(
        Date.now + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpsonly:true,
};

  // Set the cookie using res.cookie()
res.cookie('token', token, option);

res.status(statusCode).json({
    success:true,
    user,
    token,
})

}
module.exports= sendtoken;