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
    rating:{
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
            name:{
                type:String,
                required:[true,"name should be there"]
            },
            rating:{
                type:Number,
                required:true
            },
            Comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }



})

module.exports=mongoose.model("product",productSchema);
