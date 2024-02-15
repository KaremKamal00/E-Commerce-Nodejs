import { Router } from 'express'
import * as authController from './controller/auth.controller.js'
import * as authValidation from './auth.validation.js'
import validation from '../../middleware/validation.js'
const router=Router()

router
    .post(
        '/signUp',
        validation(authValidation.signUpSchema),
        authController.signUp

        )
    .post(
        '/logIn',
        validation(authValidation.loginSchema),
        authController.logIn
    )    
    .get(
        "/confirmEmail/:token",
        authController.confirmEmail
    )
    .get(
        "/refreshEmail/:token",
        authController.refreshEmail
    )
    .patch(
        '/sendCode',
        validation(authValidation.sendCodeSchema),
        authController.sendCode
    )
    .put(
        '/forgetPassword/:email',
        validation(authValidation.forgetPasswordSchema),
        authController.forgetPassword
    )    







export default router
