const express=require("express");
const { route } = require("../app");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { newOrder, getSingleOrderDetails, myOrders, getAllOrders, deleteOrders, updateOrderStatus } = require("../controller/orderController");
const router=express.Router();


router.route("/order/new").post(isAuthenticatedUser,newOrder);
router.route("/admin/order/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleOrderDetails);
router.route("/myOrders").get(isAuthenticatedUser,myOrders)
router.route("/admin/allOrder").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);
router.route("/admin/updateOrderStatus/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateOrderStatus);
router.route("/admin/deleteOrder/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrders);





module.exports=router
updateOrderStatus