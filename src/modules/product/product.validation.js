import joi from 'joi'
import generalFields from '../../utils/generalFields.js'

export const tokenSchema=joi.object({
    authorization:joi.string().required()
}).required()


export const createProductSchema=joi.object({
    name:joi.string().min(3).max(30).required(),
    description:joi.string().min(3).max(70),
    price:joi.number().positive().required(),
    stock:joi.number().positive().integer().required(),
    discount:joi.number().positive(),
    colors:joi.array(),
    size:joi.array(),
    file:joi.object({
        mainImage:joi.array().items(generalFields.file.required()).length(1).required(),
        subImages:joi.array().items(generalFields.file.required()).min(0).max(6)
    }).required(),
    categoryId:generalFields.id,
    subCategoryId:generalFields.id,
    brandId:generalFields.id
    
}).required()


export const updateProductSchema=joi.object({
    name:joi.string().min(3).max(30),
    description:joi.string().min(3).max(70),
    price:joi.number().positive(),
    stock:joi.number().positive().integer(),
    discount:joi.number().positive(),
    colors:joi.array(),
    size:joi.array(),
    files:joi.object({
        mainImage:joi.array().items(generalFields.file.required()).length(1),
        subImages:joi.array().items(generalFields.file.required()).min(0).max(6)
    }),
    productId:generalFields.id,
    // categoryId:generalFields._id,
    subCategoryId:generalFields._id,
    brandId:generalFields._id
    
}).required()