import mongoose, { Schema,model } from "mongoose";
import { Types } from "mongoose";

export const categorySchema=new Schema({
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
        required:[true,"createdBy Is Required"]
        

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
    }
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

categorySchema.virtual('subCategory',{
    ref:"SubCategory",
    localField:'_id',
    foreignField:'categoryId'
})


const categoryModel=mongoose.model.categoryModel||model("Category",categorySchema)

export default categoryModel

