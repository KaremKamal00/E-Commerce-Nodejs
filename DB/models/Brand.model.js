import mongoose, { Schema,model } from "mongoose";
import { Types } from "mongoose";

export const brandSchema=new Schema({
    name:{
        type:String,
        required:[true,"Name Is Required"],
        unique:[true,"Name Must Be Unique Value"],
        trim:true
    },
    Image:{
        type:Object,
        required:[true,"Image Is Required"]
    },
    createdBy:{
        type:Types.ObjectId,
        ref:"User",
        required:[true,"UserId Is Required"]


    },
    updatedBy:{
        type:Types.ObjectId,
        ref:"User"

    },
    slug:{
        type:String,
        required:[true,"Slug Is Required"],
        unique:[true,'Slug Must Be Unique Value'],
        trim:true
    }

},{
    timestamps:true
})


const brandModel=mongoose.model.brandModel||model("Brand",brandSchema)

export default brandModel

