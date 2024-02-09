const express=require("express");
const { testroute,createProduct,getProduct,updateProduct,deleteProduct,getDetails,  createProductReview, getAllProductReviews, deleteReviews} = require("../controller/productcontroller");
const { route } = require("../app");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


const router=express.Router();

router.route("/testroute").get(isAuthenticatedUser,testroute)
router.route("/products/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct)
router.route("/product/getProduct").get(isAuthenticatedUser,getProduct)
router.route("/products/updateProduct/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
router.route("/products/deleteProduct/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
// router.route("/product/getdetails/:id").get(getDetails)
router.route("/product/getdetails").get(isAuthenticatedUser,getDetails)
// router.route("/products/:productId/review").post(createProductReview,isAuthenticatedUser)
router.route("/products/review").put(isAuthenticatedUser,createProductReview)
router.route("/reviews").get(getAllProductReviews).delete(isAuthenticatedUser,deleteReviews)
// router.route("/deleteReview").put(isAuthenticatedUser,authorizeRoles("admin"),deleteReviews)

// router.route("/products/update").put(createProduct)

module.exports=router
