import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const getCouponSchema=joi.object({
couponId:generalFields.id
}).required()


export const tokenSchema=joi.object({
    authorization:joi.string().required()
}).required()


export const createCouponSchema=joi.object({
    name:joi.string().required().max(20).min(3),
    amount:joi.number().positive().integer().required(),
    expireIn:joi.date().required(),
    file:generalFields.file
}).required()


export const updateCouponSchema=joi.object({
    couponId:generalFields.id,
    name:joi.string().max(20).min(3),
    amount:joi.number().positive().integer(),
    expireIn:joi.date(),
    file:generalFields.file
}).required()