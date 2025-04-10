import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount } from './handlers'

const router = Router()

//Atenticación y registro
router.post('/auth/register',

    body('handle').notEmpty().withMessage('El handle es obligatorio'),
    body('email').isEmail().withMessage('Email no valido'),
    body('password').isLength({ min: 8 }).withMessage('Password muy corto, el minimo es de 8 ')
    , createAccount)

export default router