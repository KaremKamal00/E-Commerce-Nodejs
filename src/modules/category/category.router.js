import {Router} from 'express'
import uploadFileCloud, { filevalidtion } from '../../utils/multer.js'
import * as categoryController from "./controller/category.controller.js"
import * as categoryValidation from "./category.validation.js"
import subCategoryRouter from '../subCategory/subCategory.router.js'
import validation from '../../middleware/validation.js'
import auth from '../../middleware/auth.js'
import categoryEndPoints from './category.endPoints.js'
const router=Router()

//Create Category 
router
    .post(
    "/",
    validation(categoryValidation.tokenSchema,true),
    auth(categoryEndPoints.create),
    uploadFileCloud({customValidtion:filevalidtion.image}).single('image'),
    validation(categoryValidation.createCategorySchema),
    categoryController.createCategory
    )
    .get(
        "/",
        categoryController.getAllCategories
    )
    .get(
        "/:categoryId",
        validation(categoryValidation.getCategorySchema),
        categoryController.getOneCategory
    )
    .put(
        "/:categoryId",
        auth(categoryEndPoints.update),
        uploadFileCloud({customValidtion:filevalidtion.image}).single('image'),
        categoryController.updateCategory
    )
    .use("/:categoryId/subCategory",subCategoryRouter)



export default router