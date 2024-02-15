import joi from "joi"

export const tokenSchema=joi.object({
    authorization:joi.string().required()
}).required()