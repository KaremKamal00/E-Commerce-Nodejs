import mongoose,{model,Schema, Types} from "mongoose";

export const cartSchema=new Schema({

        userId:{
            type:Types.ObjectId,
            required:true,
            ref:'User',
            unique:true
        },

        products:[
            {
                productId:{
                    type:Types.ObjectId,
                    required:true,
                    ref:'Product'
                },
                quantity:{
                    type:Number,
                  required:true
                }
            }
        ]
},{
    timestamps:true
})

const cartModel=mongoose.model.cartSchema||model('Cart',cartSchema)

export default cartModel


