import prisma from "@/db/prisma";
import generateToken from "@/utils/generateToken";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server"

export const  GET = async (req: Request)=>{
return new NextResponse("Logged in Successfully", {
status: 200
})
}

export const POST = async (req:  Request) => {
try {
    const body = await req.json();
    const {username, password} = body;
    const user = await prisma.user.findUnique({where: {username}});
    if(!user){
        return new NextResponse(`Error: Invalid credentials`, {status: 400});
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user?.password);
    if(!isPasswordCorrect){
        return new NextResponse(`Error: Invalid credentials`, {status: 400});
    }
    const {tokenName, token, tokenParams} = generateToken(user.id);
    const { id, fullName, profilePic } = user;
    const response =  new NextResponse(JSON.stringify({ id, fullName, username, profilePic }), { status: 200 });
    response.cookies.set(tokenName,token, tokenParams);
    return response;
} catch (error) {
    return new NextResponse(`Error Logging In: ${error}`, {status: 400});
}
}