import prisma from '@/db/prisma';
import { jwtVerify } from 'jose';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
interface DecodedToken extends JwtPayload {
    userId: string;
}
const protectRoute = async (request: NextRequest) => {
    try {
        const token = request.cookies.get('jwt')?.value;
        if (!token) {
            return new NextResponse("Unauthorized : No token provided", { status: 401 });
        }
        const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
        const decodedToken: DecodedToken = (await jwtVerify(token, secret)).payload as DecodedToken;
        if (!decodedToken) {
            return new NextResponse("Unauthorized : No token provided", { status: 401 });
        }
        return new NextResponse(
            JSON.stringify({ message: "Success fetching token", decodedToken }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ error: "Internal Server Error", errorMesage: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
export default protectRoute;