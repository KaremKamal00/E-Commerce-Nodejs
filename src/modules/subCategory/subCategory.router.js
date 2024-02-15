import {Router} from 'express'
import * as subCategoryController from "./controller/subCategory.controller.js"
import uploadFileCloud, { filevalidtion } from '../../utils/multer.js'
import auth from '../../middleware/auth.js'
import { subCategoryEndPoints } from './subCategory.endPoints.js'
const router=Router({mergeParams:true})

//Create subCategory 
router
    .post(
    "/",
    auth(subCategoryEndPoints.create),
    uploadFileCloud({customValidtion:filevalidtion.image}).single('image'),
    subCategoryController.createSubCategory
    )
    .get(
        "/",
        subCategoryController.getAllSubCategories
    )
    .get(
        "/:subCategoryId",
        subCategoryController.getSubCategory
    )
    .put(
        "/:subCategoryId",
        auth(subCategoryEndPoints.update),
        uploadFileCloud({customValidtion:filevalidtion.image}).single('image'),
        subCategoryController.updateSubCategory
    )



export default router