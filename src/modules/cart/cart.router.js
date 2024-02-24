import { Router } from "express";
import * as cartController from './controller/cart.controller.js'
import * as cartValidation from './cart.validation.js'
import auth from "../../middleware/auth.js";
import cartEndPoints from "./cart.endPoints.js";
import validation from "../../middleware/validation.js";
const router=Router()



router
    .post(
        '/',
        validation(cartValidation.tokenSchema,true),
        auth(cartEndPoints.addToCart),
        validation(cartValidation.addToCartSchema),
        cartController.addToCart,
    )
    .patch(
        '/:productId',
        validation(cartValidation.tokenSchema,true),
        auth(cartEndPoints.addToCart),
        cartController.deleteFromCart,
    )
    .patch(
        '/',
        validation(cartValidation.tokenSchema,true),
        auth(cartEndPoints.addToCart),
        cartController.clearCart,
    )









export default router