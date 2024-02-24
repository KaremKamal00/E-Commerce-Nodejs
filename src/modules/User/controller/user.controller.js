import productModel from "../../../../DB/models/Product.model.js";
import userModel from "../../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";


//addToWishList
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

//removeFromWishList
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


//delete user
export const deleteUser=asyncHandler(
    async (req,res,next)=>{
        
        const {userId}=req.params
        const user=await userModel.findOne({_id:userId})
        if(!user){
            return next(new Error("user Not Found",{cause:404}));
        }
  
  
        const deleteUser = await userModel.findOneAndDelete({_id:userId})
        return res.status(200).json({message:"Done"})
  
    }
  )