import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const getCategorySchema=joi.object({
categoryId:generalFields.id
}).required()


export const tokenSchema=joi.object({
    authorization:joi.string().required()
}).required()


export const createCategorySchema=joi.object({
    name:joi.string().required().max(20).min(3),
    file:generalFields.file
}).required()


export const updateCategorySchema=joi.object({
    categoryId:generalFields.id,
    name:joi.string().required().max(20).min(3),
    file:generalFields.file
}).required()