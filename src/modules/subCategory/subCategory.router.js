import {Router} from 'express'
import * as subCategoryController from "./controller/subCategory.controller.js"
import * as subCategoryValidation from "./subCategory.validation.js"
import uploadFileCloud, { filevalidtion } from '../../utils/multer.js'
import auth from '../../middleware/auth.js'
import { subCategoryEndPoints } from './subCategory.endPoints.js'
import validation from '../../middleware/validation.js'
const router=Router({mergeParams:true})

//Create subCategory 
router
    .post(
    "/",
    validation(subCategoryValidation.tokenSchema,true),
    auth(subCategoryEndPoints.create),
    uploadFileCloud({customValidtion:filevalidtion.image}).single('image'),
    validation(subCategoryValidation.createSubCategorySchema),
    subCategoryController.createSubCategory
    )
    .get(
        "/",
        subCategoryController.getAllSubCategories
    )
    .get(
        "/:subCategoryId",
        validation(subCategoryValidation.getSubCategorySchema),
        subCategoryController.getSubCategory
    )
    .put(
        "/:subCategoryId",
        validation(subCategoryValidation.tokenSchema,true),
        auth(subCategoryEndPoints.update),
        uploadFileCloud({customValidtion:filevalidtion.image}).single('image'),
        // validation(subCategoryValidation.updateSubCategorySchema),
        subCategoryController.updateSubCategory
    )



export default router