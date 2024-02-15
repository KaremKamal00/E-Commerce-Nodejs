import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const signUpSchema=joi.object({
    userName:joi.string().min(2).max(20).required(),
    email:generalFields.email.required(),
    password:generalFields.password.required(),
    age:joi.number(),
    phone:joi.string(),
    cPassword:joi.string().valid(joi.ref('password')).required()

}).required()


export const loginSchema=joi.object({
    email:generalFields.email.required(),
    password:generalFields.password.required()

}).required()


export const sendCodeSchema=joi.object({
    email:generalFields.email.required()

}).required()


export const forgetPasswordSchema=joi.object({
    email:generalFields.email.required(),
    code:joi.string().pattern(new RegExp(/^[0-9]{5}$/)).required(),
    password:generalFields.password.required(),
    cPassword:joi.string().valid(joi.ref('password')).required()

}).required()