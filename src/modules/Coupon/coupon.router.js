import {Router} from 'express'
import * as couponController from "./controller/coupon.controller.js"
import uploadFileCloud, { filevalidtion } from '../../utils/multer.js'
import { couponEndPoints } from './coupon.endPoints.js'
import auth from '../../middleware/auth.js'
const router=Router()

//Create coupon 
router
    .post(
    "/",
    auth(couponEndPoints.create),
    uploadFileCloud({customValidtion:filevalidtion.image}).single('image'),
    couponController.createCoupon
    )
    .get(
        "/",
        couponController.getAllCoupons
    )
    .get(
        "/:couponId",
        couponController.getOneCoupon
    )
    .put(
        "/:couponId",
        auth(couponEndPoints.update),
        uploadFileCloud({customValidtion:filevalidtion.image}).single('image'),
        couponController.updateCoupon
    )



export default router