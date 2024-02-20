import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const getBrandSchema=joi.object({
brandId:generalFields.id
}).required()


export const tokenSchema=joi.object({
    authorization:joi.string().required()
}).required()


export const createBrandSchema=joi.object({
    name:joi.string().required().max(20).min(3),
    file:generalFields.file
}).required()


export const updateBrandSchema=joi.object({
    brandId:generalFields.id,
    name:joi.string().required().max(20).min(3),
    file:generalFields.file
}).required()