import { Request, Response } from 'express'
import User from "../models/User"
import { hashPasword } from '../utils/auth'

export const createAccount = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body
    const emailExist = await User.findOne({ email })
    if (emailExist) {
        const error = new Error('El usuario ya está registrado')
        res.status(409).json({ error: error.message })
        return
    }
    const user = new User(req.body)
    user.password = await hashPasword(password)
    await user.save()
    res.status(201).json({ msg: 'Usuario Registrado Corectamente' })
}