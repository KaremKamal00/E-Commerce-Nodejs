import { Router } from "express";
import * as productController from './controller/product.controller.js'
import * as productValiation from './product.validation.js'
import uploadFileCloud, { filevalidtion } from "../../utils/multer.js";
import productEndPoints from "./product.endPoints.js";
import auth from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";


const router=Router()

router
    .post(
    '/',
    validation(productValiation.tokenSchema,true),   
    auth(productEndPoints.create),
    uploadFileCloud({customValidtion: filevalidtion.image}).fields([
        {name:'mainImage',maxCount:1},
        {name:'subImages',maxCount:6}
    ]),
    validation(productValiation.createProductSchema),
    productController.createProduct
    )
    .put(
        '/:productId',
        validation(productValiation.tokenSchema,true),
        auth(productEndPoints.update),
        uploadFileCloud({customValidtion:filevalidtion.image}).fields([
            {name:'mainImage',maxCount:1},
            {name:'subImages',maxCount:6}
        ]),
        validation(productValiation.updateProductSchema),
        productController.updateProduct

    )
    .get(
        '/',
        productController.getProducts
    )
    .get(
        '/:productId',
        productController.getOneProducts
    )
    





export default router