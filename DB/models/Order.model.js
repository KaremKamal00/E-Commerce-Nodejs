import mongoose,{model,Schema, Types} from "mongoose";

export const orderSchema=new Schema({

        userId:{
            type:Types.ObjectId,
            require:true,
            ref:'User',
            
        },

        products:[
            {   name:{
                    type:String,
                    required:[true,"Phone Number Is required"],
                    min:3,
                    max:30
                },
                productId:{
                    type:Types.ObjectId,
                    required:true,
                    ref:'Product'
                },
                quantity:{
                    type:Number,
                  required:true
                },
                unitPrice:{
                    type:Number,
                    required:[true,"unitPrice Number Is required"],
                    min:1
                },
                totalPrice:{
                    type:Number,
                    required:[true,"totalPrice Number Is required"],
                    min:1
                },
            }
        ],

        address:{
            type:String,
            required:[true,"Address Number Is required"]
        },

        phone:{
            type:[String],
            required:[true,"Phone Number Is required"]
        },

        finalPrice:{
            type:Number,
            required:[true,"finalPrice Number Is required"],
            min:1
        },

        subPrice:{
            type:Number,
            required:[true,"subPrice Number Is required"],
            min:1
        },

        note:String,

        couponId:{
            type: Types.ObjectId,
            ref:"Coupon"
        },

        paymentTypes:{
            type:String,
            enum:['cash','card'],
            default:'cash'
        },

        status:{
            type:String,
            enum:['placed','onWay','cancel','rejected','deliverd','waitForPayment'],
            default:'placed'
        },

        updatedBy:{
            type:Types.ObjectId,
            ref:'User'
        },

        reason:String
},{
    timestamps:true
})
//mongoose.model.orderSchema||
const orderModel=model('Order',orderSchema)

export default orderModel


