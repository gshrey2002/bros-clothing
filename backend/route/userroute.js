const express=require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword } = require("../controller/usercontroller");
const router=express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgotPassword").post(forgotPassword);
router.route("/forgotPassword/reset/:token").put(resetPassword)
router.route("/logout").get(logout)

module.exports=router;