import express,{Router} from 'express'
import * as orderController from "./controller/order.controller.js"
import * as orderValidation from "./order.validation.js"
import * as orderEndPoints from "./order.endPoints.js"
import auth from '../../middleware/auth.js'
import validation from '../../middleware/validation.js'
const router=Router()


router
    .post(
        '/',
        auth(orderEndPoints.create),
        validation(orderValidation.createOrderSchema),
        orderController.createOrder 
    )
    .patch(
        '/:orderId/canceled',
        auth(orderEndPoints.cancel),
        validation(orderValidation.orderSchema),
        orderController.cancelOrder
    )
    .patch(
        '/:orderId/deliverd',
        auth(orderEndPoints.cancel),
        validation(orderValidation.orderSchema),
        orderController.deliverOrder
    )




router.post('/webhook', express.raw({type: 'application/json'}),orderController.webHook );



export default router