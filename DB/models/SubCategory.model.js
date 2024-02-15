import mongoose, { Schema,model } from "mongoose";
import { Types } from "mongoose";

export const subCategorySchema=new Schema({
    name:{
        type:String,
        required:[true,"Name Is Required"],
        unique:[true,"Name Must Be Unique Value"],
        trim:true,
        lowerCase:true
    },
    Image:{
        type:Object,
        required:[true,"Image Is Required"]
    },
    createdBy:{
        type:Types.ObjectId,
        ref:"User",
        required:[true,"UserId Is Required"] //change to true after create user
        

    },
    updatedBy:{
        type:Types.ObjectId,
        ref:"User"

    },
    slug:{
        type:String,
        required:[true,"Slug Is Required"],
        unique:[true,'Slug Must Be Unique Value'],
        trim:true,
        lowerCase:true
    },
    categoryId:{
        type:Types.ObjectId,
        ref:"Category",
        required:[true,"category Id is required"]
    }

},{
    timestamps:true
})


const subCategoryModel=mongoose.model.subCategoryModel||model("SubCategory",subCategorySchema)

export default subCategoryModel

