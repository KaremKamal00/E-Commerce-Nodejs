import joi from "joi"
import generalFields from "../../utils/generalFields.js"

export const tokenSchema=joi.object({
    authorization:joi.string().required()
}).required()


export const createOrderSchema=joi.object({
    
    address:joi.string().required(),
    phone:joi.array().items(joi.string().required()).required(),
    paymentTypes:joi.string().valid('cash','card'),
    note:joi.string(),
    reason:joi.string(),
    couponName:joi.string().trim().min(1).max(20),
    products:joi.array().items(joi.object({
        productId:generalFields.id,
        quantity:joi.number().positive().integer().required()
    }).required())
}).required()


export const orderSchema=joi.object({
    orderId:generalFields.id
}).required()
