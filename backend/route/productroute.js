const express=require("express");
const { testroute,createProduct,getProduct,updateProduct,deleteProduct,getDetails} = require("../controller/productcontroller");
const { route } = require("../app");

const router=express.Router();

router.route("/testroute").get(testroute)
router.route("/products/new").post(createProduct)
router.route("/product/getProduct").get(getProduct)
router.route("/products/updateProduct/:id").put(updateProduct)
router.route("/products/deleteProduct/:id").delete(deleteProduct)
// router.route("/product/getdetails/:id").get(getDetails)
router.route("/product/getdetails/").get(getDetails)

// router.route("/products/update").put(createProduct)

module.exports=router
