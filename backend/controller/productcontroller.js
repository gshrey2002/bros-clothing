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
    const resultperpage=5;
    const productCount=await Product.countDocuments();
    const searchprod=new searchfeature(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultperpage);
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
        getdetails,
        productCount,
        
    })
    
    })

//route check -- admin
exports.testroute = (req,res)=>{
// console.log(req.auth);
res.status(200).json({message:"route is working fine"})
}


// get product details "single product"
/*#################################################*/
// exports.addUpdateReview=catchasyncerror(async(req,res,next)=>{
    
//     const {rating,comment,productId}=req.body;
//     if (!req.user || !req.user.id) {
//         return next(new Errorhandler("User information is missing", 400));
//     }
//     const review={
//         user:req.user.id,
//         name:req.user.name,
//         rating:Number(rating),
//         comment,
//         productId,
//     }

//     const product=await Product.findById(productId);
//     const isRewiewed=product.reviews.find(rev=>rev.user.toString()===req.user._id.toString())
//     if(isRewiewed){
//         product.reviews.forEach((rev)=>{
//             if(rev.user.toString()===req.user._id.toString()){
//             rev.rating=rating,
//             rev.comment=comment}
//         })
//     }else{
//         product.reviews.push(review)
//         product.numberofReviews=product.reviews.length();
//     }
//     let avg=0;
//     product.ratings=product.reviews.forEach(rev=>{
//     avg+=rev.rating;
//     })/product.reviews.length

//     await product.save({validateBeforeSave:false})

//     res.status(200).json({
//         success:true,
//         message:"review posted successfully",

//     })
// })
/*#################################################*/
exports.createProductReview = catchasyncerror(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    // console.log(req.user.id) // to test
  
        // const jwtAuth = req.cookies['jwt-auth']
        // if (jwtAuth === undefined) {
        //   throw new Error('missing token');
        // }

  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment: String(comment),
    };
  
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
    //   console.log(req.user._id);
  
    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
      );

    // const existingReviewIndex = product.reviews.findIndex(
    //     (review) => review.name === name
    //   );
  
    if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user.toString() === req.user._id.toString())
            (rev.rating = rating), (rev.comment = comment);
        });
    } else {
      product.reviews.push(review);
      product.numberofReviews = product.reviews.length;
    }
    

    // product.reviews.push(review);
    // product.numOfReviews = product.reviews.length;
    // if (existingReviewIndex !== -1) {
    //     // Update the existing review
    //     product.reviews[existingReviewIndex].rating = rating;
    //     product.reviews[existingReviewIndex].Comment = comment;
    //   } else {
    //     // Add a new review
    //     product.reviews.push({ name, rating, Comment: comment });
    //     product.numberofReviews += 1;
    //   }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
    
  });
  
  //get all review

  exports.getAllProductReviews= catchasyncerror(async(req,res,next)=>{
    const product=await Product.findById(req.query.id);
    
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
    //   console.log(product.reviews);

      res.status(200).json({
        success: true,
        reviews: product.reviews
      });

  })

  //delete reviews

  exports.deleteReviews=catchasyncerror(async(req,res,next)=>{
    const product=await Product.findById(req.query.productId);
    if(!product){
        return res.status(400).json({error:'product not found'});
    }
    const review=product.reviews.filter(rev=>rev._id.toString()!==req.query.id.toString()
    // const filteredReviews = product.reviews.filter(rev => rev._id.toString() !== req.query.reviewId.toString()
    );

      
    let avg = 0;
  
    review.forEach((rev) => {
      avg += rev.rating;
    });
  
    const ratings = avg / review.length;
    const numberofReviews=review.length
  
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews: review
        ,ratings,numberofReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
    })
  })
  
  
    // );

    // let avg = 0;

    // filteredReviews.forEach((rev) => {
    //     avg += rev.rating;
    // });

    // const ratings = avg / filteredReviews.length;
    // const numberofReviews = filteredReviews.length;

    // await Product.findByIdAndUpdate(req.query.productId, {
    //     reviews: filteredReviews,
    //     ratings,
    //     numberofReviews
    // }, {
    //     new: true,
    //     runValidators: true,
    //     useFindAndModify: false
    // });


   



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