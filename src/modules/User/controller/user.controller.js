import productModel from "../../../../DB/models/Product.model.js";
import userModel from "../../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";



export const addToWishList=asyncHandler(
    async (req,res,next)=>{
        const {productId}=req.params

        const product=await productModel.findById({_id:productId})
        if(!product){
            return next(new Error("Product Not Found",{cause:404}))
        }

        const user=await userModel.findByIdAndUpdate({_id:req.user._id},{$addToSet:{wishList:product._id}},{new:true})
            .select('userName email status wishList').populate([
                {
                    path:'wishList'
                }
            ])
            return res.status(200).json({message:"Added to Wishlist",user })
    }
)


export const removeFromWishList=asyncHandler(
    async (req,res,next)=>{
        const {productId}=req.params

        const product=await productModel.findById({_id:productId})
        if(!product){
            return next(new Error("Product Not Found",{cause:404}))
        }

        const user=await userModel.findByIdAndUpdate({_id:req.user._id},{$pull:{wishList:product._id}},{new:true})
            .select('userName email status wishList').populate([
                {
                    path:'wishList'
                }
            ])
            return res.status(200).json({message:"Added to Wishlist",user })
    }
)