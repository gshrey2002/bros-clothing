const express=require("express");
const { registerUser, loginUser, logout, forgotPassword } = require("../controller/usercontroller");
const router=express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgotPassword").post(forgotPassword);
router.route("/logout").get(logout)

module.exports=router;