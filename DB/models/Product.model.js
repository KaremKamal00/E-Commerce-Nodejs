import mongoose,{ Schema,model } from "mongoose";
import { Types } from "mongoose";
export const productSchema=new Schema({

    name:{
        type:String,
        required:[true,"Name Is Required"],
        trim:true,
        lowerCase:true,
        min:3,
        max:30
    },

    slug:{
        type:String,
        required:[true,"Slug Is Required"],
        trim:true,
        lowerCase:true
    },

    mainImage:{
        type:Object,
        required:[true,"Image Is Required"]
    },

    subImages:[{
        type:Object,
    }],

    price:{
        type:Number,
        required:[true,"Price Is Required"],
        min:1
    },

    finalPrice:{
        type:Number
    },


    discount:{
        type:Number,
        default:0
    },

    stock:{
        type:Number,
        required:[true,"Stock Is Required"]
    },


    description:String,
    colors:[String],


    createdBy:{
        type:Types.ObjectId,
        ref:"User",
        required:[true,"UserId Is Required"] 
    

    },
    updatedBy:{
        type:Types.ObjectId,
        ref:"User"

    },
    
    categoryId:{
        type:Types.ObjectId,
        ref:"Category",
        required:[true,"category Id is required"]
    },

    subCategoryId:{
        type:Types.ObjectId,
        ref:"SubCategory",
        required:[true,"subCategory Id is required"]
    },

    brandId:{
        type:Types.ObjectId,
        ref:"Brand",
        required:[true,"Brand Id is required"]
    },


    isDeleted:{
        type:Boolean,
        default:false
    },

    customId:{
        type:String,
        required:[true,"customId is required"]
    }
    
},{
    timestamps:true
})

const productModel=mongoose.model.productModel||model("Product",productSchema)

export default productModel