import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount, login } from './handlers'
import { handleInputErrors } from './middleware/validation'

const router = Router()

//Atenticación y registro
router.post('/auth/register',

    body('handle').notEmpty().withMessage('El handle es obligatorio'),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Email no valido'),
    body('password').isLength({ min: 8 }).withMessage('Password muy corto, el minimo es de 8 '),
    handleInputErrors
    , createAccount)

router.post('/auth/login',
    body('email').isEmail().withMessage('Email no valido'),
    body('password').notEmpty().withMessage('El password es obligatorio '),
    handleInputErrors



    , login)

export default router