import jwt, { JwtPayload } from 'jsonwebtoken'
export const generateJWt = (payload: JwtPayload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '180d'
    })
    return token
}