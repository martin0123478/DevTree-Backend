import { Request, Response } from 'express'
import User from "../models/User"

export const createAccount = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body
    const emailExist = await User.findOne({ email })
    if (emailExist) {
        const error = new Error('El usuario ya está registrado')
        res.status(409).json({ error: error.message })
        return
    }

    await User.create(req.body)
    res.status(201).json({ msg: 'Usuario Registrado Corectamente' })
}