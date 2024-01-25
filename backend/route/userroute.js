const express=require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, changePassword, updateProileDetails, getAllUser, getSingleUser, updateUserProileDetails, deleteUserProile } = require("../controller/usercontroller");
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
router.route("/admin/getAllUser").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUser)
router.route("/admin/getUser/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)
router.route("/admin/updateUser/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateUserProileDetails)
router.route("/admin/deleteUser/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUserProile)


module.exports=router;
