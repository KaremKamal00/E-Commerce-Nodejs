import joi from 'joi'
import generalFields from '../../utils/generalFields.js'

export const userSchema=joi.object({
    productId:generalFields.id
}).required()


export const tokenSchema=joi.object({
    authorization:joi.string().required()
}).required()
