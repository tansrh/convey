import jwt from 'jsonwebtoken';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const generateToken = (userId: string) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY!, {
        expiresIn: "15d"
    })
    return {tokenName: "jwt",token, tokenParams: {
        maxAge: 15*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.ENV !== "development"
    } as Partial<ResponseCookie>}
}
export default generateToken;