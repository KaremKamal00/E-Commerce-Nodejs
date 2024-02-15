import mongoose, { Schema,model } from "mongoose";
import { Types } from "mongoose";

export const couponSchema=new Schema({
    name:{
        type:String,
        required:[true,"Name Is Required"],
        unique:[true,"Name Must Be Unique Value"],
        trim:true
    },
    amount:{
        type:Number,
        required:[true,"Amount Is Required"],
    },
    Image:{
        type:Object,
        required:[true,"Image Is Required"],
    },
    createdBy:{
        type:Types.ObjectId,
        required:[true,"UserId Is Required"], //change to true after create user
        ref:"User"

    },
    updatedBy:{
        type:Types.ObjectId,
        ref:"User"

    },
    expireIn:{
        type:Date,
        required:true
    },
    usedBy:[
        {
        type:Types.ObjectId,
        ref:"User"
        }
    ]
},{
    timestamps:true
})

//mongoose.model.couponModel||
const couponModel=model("Coupon",couponSchema)

export default couponModel

