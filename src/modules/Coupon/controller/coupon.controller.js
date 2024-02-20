import couponModel from "../../../../DB/models/Coupon.model.js";
import cloudinary from "../../../utils/cloudinary.js";
import { asyncHandler } from "../../../utils/errorHandling.js";


//Create Coupon
export const createCoupon=asyncHandler(
    async (req,res,next)=>{
        const { name } = req.body;


    if (await couponModel.findOne({ name })) {
      return next(new Error("Name Already Exist",{cause:409}))
      
    }
  
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `${process.env.APP_NAME}/Coupon` }
    );
    if (!secure_url) {
      return next(new Error("Iamge Not Found", { cause: 400 }));
    }
    req.body.Image = { secure_url, public_id };

    req.body.createdBy=req.user._id

  
    const createCoupon = await couponModel.create(req.body);
    return res.status(201).json({ message: "Done", createCoupon });

    }
)



//Get All Coupons
export const getAllCoupons = asyncHandler(
  async (req, res, next) => {
    const allCoupons = await couponModel.find()
    return res.status(200).json({ message: "Done", allCoupons })
  }
)



//Get One Coupon
export const getOneCoupon = asyncHandler(
  async (req, res, next) => {
    const { couponId } = req.params;
    const coupon = await couponModel.findById({ _id: couponId })
    if (!coupon) {
      return next(new Error("coupon No Found",{cause:404}))
    }
    return res.status(200).json({ message: "Done", coupon });
  }
)



//Update Coupon
export const updateCoupon = asyncHandler(
  async (req, res, next) => {
    const { couponId } = req.params;
    const coupon = await couponModel.findById({ _id: couponId });
    if (!coupon) {
      return next(new Error("Coupon No Found",{cause:404}))
    }
  
    if (req.body.name) {
      if (await couponModel.findOne({ name: req.body.name })) {
        return next(new Error("Name Already Exist",{cause:409}))
      }
    }
  
    if (req.file) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        { folder: `${process.env.APP_NAME}/Cateory` }
      );
      if (!secure_url) {
        return next(new Error("Iamge Not Found", { cause: 400 }));
      }
      if(coupon.Image?.public_id){
        await cloudinary.uploader.destroy(coupon.Image.public_id);
      }
      req.body.Image = { secure_url, public_id };
      
    }

    req.body.updatedBy=req.user._id
    const updatedCOUPON = await couponModel.findOneAndUpdate(
      { _id: couponId },
      req.body,
      { new: true }
    );
    return res.status(200).json({ message: "Done", updatedCOUPON });
  }
)