const Order= require("../model/ordermodel");
const Errorhandler = require("../utils/errorhandler");
const catchasyncerror=require("../middleware/catchasyncerror");
const Product=require("../model/productmodel");


//create new order
exports.newOrder=catchasyncerror(async(req,res,next)=>{
    const {
        shippingInfo,
        orderItem,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    }=req.body;

    const order = await Order.create({
        shippingInfo,
        orderItem,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt : Date.now(),
        user:req.user._id,

    });
    res.status(201).json({
        success:true,
        order,
    })
})

//get single order
exports.getSingleOrderDetails=catchasyncerror(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new Errorhandler("order not found",404))
    }
    res.status(200).json({
        success:true,
        order
    })
})

//get order of logged in user
exports.myOrders=catchasyncerror(async(req,res,next)=>{
    const orders=await Order.find({user:req.user._id})

    res.status(200).json({
        success:true,
        orders
    })
})

//get all order admin
exports.getAllOrders=catchasyncerror(async(req,res,next)=>{
    const orders=await Order.find()

    let totalamount=0;
    orders.forEach((order)=>{
        totalamount+=order.totalPrice;
    })

    res.status(200).json({
        success:true,
        orders,
        totalamount
    })
})

//update order status
exports.updateOrderStatus=catchasyncerror(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);

    if(!orders){
        return next(new Errorhandler("order not found",404))
    }
    if(order.orderStatus=="delivered"){
        return next(new Errorhandler("you have already delivered this product",400))
    }

    order.orderItem.forEach(async(order)=>{
        await updateStock(order.product,order.quantity)
    })
    order.orderStatus=req.body.status;

    if(req.body.status=="delivered"){
        order.deliverAt=Date.now();
    }
    await order.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,

    })

})

async function updateStock(id,quantity){
const product=await Product.findById(id);

product.productStock -= quantity;

await product.save({validateBeforeSave:false});

}

// delete order
exports.deleteOrders=catchasyncerror(async(req,res,next)=>{
    const orders=await Order.findById(req.params.id)
    if(!orders){
        return next(new Errorhandler("order not found",404))
    }
    await orders.deleteOne();


    res.status(200).json({
        success:true,
       
    })
})
