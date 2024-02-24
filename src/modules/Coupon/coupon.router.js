import {Router} from 'express'
import * as couponController from "./controller/coupon.controller.js"
import * as couponValidation from "./coupon.validation.js"
import uploadFileCloud, { filevalidtion } from '../../utils/multer.js'
import { couponEndPoints } from './coupon.endPoints.js'
import auth from '../../middleware/auth.js'
import validation from '../../middleware/validation.js'
const router=Router()

//Create coupon 
router
    .post(
    "/",
    validation(couponValidation.tokenSchema,true),
    auth(couponEndPoints.create),
    uploadFileCloud({customValidtion:filevalidtion.image}).single('image'),
    validation(couponValidation.createCouponSchema),
    couponController.createCoupon
    )
    .get(
        "/",
        couponController.getAllCoupons
    )
    .get(
        "/:couponId",
        validation(couponValidation.getCouponSchema),
        couponController.getOneCoupon
    )
    .put(
        "/:couponId",
        validation(couponValidation.tokenSchema,true),
        auth(couponEndPoints.update),
        uploadFileCloud({customValidtion:filevalidtion.image}).single('image'),
        validation(couponValidation.updateCouponSchema),
        couponController.updateCoupon
    )
    .delete(
        "/:couponId",
        validation(couponValidation.tokenSchema,true),
        auth(couponEndPoints.delete),
        couponController.deleteCoupon
        )



export default router