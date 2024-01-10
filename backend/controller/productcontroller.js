const Product=require("../model/productmodel");
const Errorhandler = require("../utils/errorhandler");
const catchasyncerror=require("../middleware/catchasyncerror")
const searchfeature=require("../utils/apifeature")

//create product -- admin
exports.createProduct = catchasyncerror(async (req,res,next)=>{
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
    })

//get product

exports.getProduct=catchasyncerror(async(req,res)=>{
    // console.log(req.query);
    const searchprod=new searchfeature(Product.find(),req.query)
    .search()
    .filter();
    // console.log(searchprod);
    const products = await searchprod.query;
    console.log(products)
    res.status(200).json({
        success:true,
        products
    })

})

// update product

exports.updateProduct=catchasyncerror(async(req,res,next)=>{
    let updateprod= await Product.findById(req.params.id);
        if(!updateprod){

        res.status(404).json({
            success:false,
            message:"product not found"
        })
    }
    updateprod=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        updateprod
        
    })
})
//delete product admin
exports.deleteProduct = catchasyncerror(async(req,res,next)=>{
    const deleteProd = await Product.findById(req.params.id);
    if(!deleteProd){
        return res.status(404).json({
            
            success:false,
            message:"product not found"
        })
      
    }
       await Product.findByIdAndDelete(req.params.id);
        // await Product.remove();
        res.status(202).json({
            success:true,
            message:"successfully deleted the product"
        })
    
    })

// get product details "single product"
exports.getDetails=catchasyncerror(async(req,res,next)=>{
    const getdetails=await Product.findById(req.params.id);
    if(!getdetails){
        return next(new Errorhandler("product not found",404))
        // return res.status(404).json({
        //     success:false,
        //     message:"product not found"
        // })
    }
    res.status(200).json({
        success:true,
        getdetails
        
    })
    
    })

//route check -- admin
exports.testroute = (req,res)=>{
res.status(200).json({message:"route is working fine"})
}


// exports.getDetails=catchasyncerror(async(req,res,next)=>{

//     const apisearch=new searchfeature(Product.findById(req.params.id),req.query).search()
//     // const getdetails=await Product.findById(req.params.id);
//     const getdetails=await apisearch.query;
//     if(!getdetails){
//         return next(new Errorhandler("product not found",404))
//         // return res.status(404).json({
//         //     success:false,
//         //     message:"product not found"
//         // })
//     }
//     res.status(200).json({
//         success:true,
//         getdetails
        
//     })
    
//     })