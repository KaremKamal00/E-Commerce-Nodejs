import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const getCategorySchema=joi.object({
subCategoryId:generalFields.id,
categoryId:generalFields.id
}).required()


export const tokenSchema=joi.object({
    authorization:joi.string().required()
}).required()


export const createSubCategorySchema=joi.object({
    categoryId:generalFields.id,
    name:joi.string().required().max(20).min(3),
    // file:generalFields.file
}).required()


export const updateSubCategorySchema=joi.object({
    subCategoryId:generalFields.id,
    categoryId:generalFields.id,
    name:joi.string().required().max(20).min(3),
    image:generalFields.file
}).required()