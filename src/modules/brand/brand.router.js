import {Router} from 'express'
import uploadFileCloud, { filevalidtion } from '../../utils/multer.js'
import * as brandController from "./controller/brand.controller.js"
import auth from '../../middleware/auth.js'
import { brandEndPoints } from './brand.endPoint.js'

const router=Router()

//Create brand 
router
    .post(
    "/",
    auth(brandEndPoints.create),
    uploadFileCloud({customValidtion:filevalidtion.image}).single('image'),
    brandController.createBrand
    )
    .get(
        "/",
        brandController.getAllBrands
    )
    .get(
        "/:brandId",
        brandController.getOneBrand
    )
    .put(
        "/:brandId",
        auth(brandEndPoints.update),
        uploadFileCloud({customValidtion:filevalidtion.image}).single('image'),
        brandController.updateBrand
    )



export default router