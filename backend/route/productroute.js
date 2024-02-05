const express=require("express");
const { testroute,createProduct,getProduct,updateProduct,deleteProduct,getDetails,  createProductReview} = require("../controller/productcontroller");
const { route } = require("../app");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


const router=express.Router();

router.route("/testroute").get(testroute,isAuthenticatedUser)
router.route("/products/new").post(createProduct,isAuthenticatedUser,authorizeRoles("admin"))
router.route("/product/getProduct").get(getProduct,isAuthenticatedUser)
router.route("/products/updateProduct/:id").put(updateProduct,isAuthenticatedUser,authorizeRoles("admin"))
router.route("/products/deleteProduct/:id").delete(deleteProduct,isAuthenticatedUser,authorizeRoles("admin"))
// router.route("/product/getdetails/:id").get(getDetails)
router.route("/product/getdetails").get(getDetails,isAuthenticatedUser)
// router.route("/products/:productId/review").post(createProductReview,isAuthenticatedUser)
router.route("/products/review").put(createProductReview,isAuthenticatedUser)

// router.route("/products/update").put(createProduct)

module.exports=router
