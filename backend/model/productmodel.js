const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    name:{
    type:String,
    required:[true,"please enter product name"]
        },
    description:{
        type:String,
        required:[true,"please enter product description"]

    },
    price:{
        type:Number,
        required:[true,"please enter product description"],
        maxLength:[6,"please enter under limit"]
    
    },
    ratings:{
        type:String,
        default:0
    },
    images:[
     {
        publicId:{
            type:String,
            required:true
        },
        imageurl:{
            type:String,
            required:true
        }
     }
    ],
    category:{
        type:String,
        required:[true,"please enter product category"],
        maxLength:[6,"please enter under limit"]

    },
    productStock:{
        type:Number,
        required:[true,"please enter product stock"],
        maxLength:[3,"please dont exceed product stock under 1000"]

    },
    numberofReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
              },
            name:{
                type:String,
                required:[true,"name should be there"]
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "User",
    //     required: true,
    //   },
    createdAt:{
        type:Date,
        default:Date.now
    }



})

module.exports=mongoose.model("product",productSchema);
////////////////////////////////////////////////////////////////////
// const mongoose = require("mongoose");

// const productSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please Enter product Name"],
//     trim: true,
//   },
//   description: {
//     type: String,
//     required: [true, "Please Enter product Description"],
//   },
//   price: {
//     type: Number,
//     required: [true, "Please Enter product Price"],
//     maxLength: [8, "Price cannot exceed 8 characters"],
//   },
//   ratings: {
//     type: Number,
//     default: 0,
//   },
//   images: [
//     {
//       public_id: {
//         type: String,
//         required: true,
//       },
//       url: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
//   category: {
//     type: String,
//     required: [true, "Please Enter Product Category"],
//   },
//   Stock: {
//     type: Number,
//     required: [true, "Please Enter product Stock"],
//     maxLength: [4, "Stock cannot exceed 4 characters"],
//     default: 1,
//   },
//   numOfReviews: {
//     type: Number,
//     default: 0,
//   },
//   reviews: [
//     {
//       user: {
//         type: mongoose.Schema.ObjectId,
//         ref: "User",
//         required: true,
//       },
//       name: {
//         type: String,
//         required: true,
//       },
//       rating: {
//         type: Number,
//         required: true,
//       },
//       comment: {
//         type: String,
//         required: true,
//       },
//     },
//   ],

// //   user: {
// //     type: mongoose.Schema.ObjectId,
// //     ref: "User",
// //     required: true,
// //  },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Product", productSchema);
