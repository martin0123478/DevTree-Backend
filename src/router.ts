import { Router } from 'express'
import User from './models/User'

const router = Router()

//Atenticación y registro
router.post('/auth/register', async (req, res) => {

    await User.create(req.body)
    res.json({ msg: 'Usuario Registrado Corectamente' })
})

export default router