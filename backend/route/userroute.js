const express=require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, changePassword, updateProileDetails } = require("../controller/usercontroller");
// const { isAuthenticatedUser } = require("../middleware/auth");

// const (auth)
const router=express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgotPassword").post(forgotPassword);
router.route("/forgotPassword/reset/:token").put(resetPassword)
router.route("/info").get(isAuthenticatedUser,getUserDetails)
router.route("/logout").get(isAuthenticatedUser,logout)
router.route("/updatePassword").put(isAuthenticatedUser,changePassword)
router.route("/updateProfile").put(isAuthenticatedUser,updateProileDetails)

module.exports=router;