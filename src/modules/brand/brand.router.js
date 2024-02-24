import {Router} from 'express'
import uploadFileCloud, { filevalidtion } from '../../utils/multer.js'
import * as brandController from "./controller/brand.controller.js"
import * as brandValidation from "./brand.validation.js"
import auth from '../../middleware/auth.js'
import { brandEndPoints } from './brand.endPoint.js'
import validation from '../../middleware/validation.js'

const router=Router()

//Create brand 
router
    .post(
    "/",
    validation(brandValidation.tokenSchema,true),
    auth(brandEndPoints.create),
    uploadFileCloud({customValidtion:filevalidtion.image}).single('image'),
    validation(brandValidation.createBrandSchema),
    brandController.createBrand
    )
    .get(
        "/",
        brandController.getAllBrands
    )
    .get(
        "/:brandId",
        validation(brandValidation.getBrandSchema),
        brandController.getOneBrand
    )
    .put(
        "/:brandId",
        validation(brandValidation.tokenSchema,true),
        auth(brandEndPoints.update),
        uploadFileCloud({customValidtion:filevalidtion.image}).single('image'),
        validation(brandValidation.updateBrandSchema),
        brandController.updateBrand
    )
    .delete(
        "/:brandId",
        validation(brandValidation.tokenSchema,true),
        auth(brandEndPoints.delete),
        brandController.deleteBrand
        )



export default router