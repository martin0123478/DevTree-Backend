import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import slug from 'slug'

import User from "../models/User"
import { checkPassword, hashPasword } from '../utils/auth'
import { generateJWt } from '../utils/jwt'

export const createAccount = async (req: Request, res: Response): Promise<void> => {



    const { email, password } = req.body
    const emailExist = await User.findOne({ email })
    if (emailExist) {
        const error = new Error('El usuario ya está registrado con ese email')
        res.status(409).json({ error: error.message })
        return
    }
    const handle = slug(req.body.handle, '')
    const handleExist = await User.findOne({ handle })
    if (handleExist) {
        const error = new Error('Nombre de usuario no disponible')
        res.status(409).json({ error: error.message })
        return
    }
    const user = new User(req.body)
    user.password = await hashPasword(password)
    user.handle = handle

    await user.save()
    res.status(201).send('Usuario Registrado Corectamente')
}

export const login = async (req: Request, res: Response) => {
    //Manejar Errores
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }

    const { email, password } = req.body
    const emailExist = await User.findOne({ email })
    if (!emailExist) {
        const error = new Error('El usuario no existe')
        res.status(404).json({ error: error.message })
        return
    }
    //usuario existe
    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error('El usuario no existe')
        res.status(404).json({ error: error.message })
        return
    }
    const isPasswordCorrect = await checkPassword(password, emailExist.password)
    if (!isPasswordCorrect) {
        const error = new Error('Password Incorrecto')
        res.status(401).json({ error: error.message })
        return
    }
    const token = generateJWt({ id: user._id })
    res.send(token)
}

export const getUser = async (req: Request, res: Response) => {
    res.json(req.user)
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
    } catch (e) {
        const error = new Error('hubo un error')
        return res.status(500).json({ error: error.message })
    }
}