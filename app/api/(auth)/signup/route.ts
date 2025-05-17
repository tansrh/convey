

import prisma from "@/db/prisma"
import generateToken from "@/utils/generateToken"
import bcryptjs from "bcryptjs"
import { NextResponse } from "next/server"

interface requestBody {
    fullName: string,
    username: string,
    password: string,
    confirmPassword: string,
    gender: string
}
export const GET = async (req: Request) => {
    return new NextResponse("Signed up Successfully", {
        status: 200
    })
}


export const POST = async (req: Request) => {

    try {
        const body = await req.json();
        const { fullName, username, password, confirmPassword, gender } = body;
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return new NextResponse(`Please fill all details.${JSON.stringify(req)}`, { status: 400 });
        }
        if (password !== confirmPassword) {
            return new NextResponse("Passwords don't match.", { status: 400 });
        }
        const user = await prisma.user.findUnique({where: {username}});
        if(user){
            return new NextResponse("Username already exists.", { status: 400 });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const maleProfilePic = `https://avatar.iran.liara.run/public/boy?${username}`
        const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?${username}`
        const newUser = await prisma.user.create({
            data: {
                fullName,
                username,
                password: hashedPassword,
                gender,
                profilePic: gender === "male" ? `https://avatar.iran.liara.run/public/boy?${username}` : `https://avatar.iran.liara.run/public/girl?${username}`
            }
        })

        if(newUser){
            const {tokenName, token, tokenParams} = generateToken(newUser.id);
            const {id, fullName, username, profilePic}=newUser;
            const response = new NextResponse(JSON.stringify({ id, fullName, username, profilePic }), { status: 200 });
            response.cookies.set(tokenName, token, tokenParams);
            return response;
        }
        else {
            return new NextResponse("Invalid User Credentials", {status: 400})
        }
    } catch (error) {
        return new NextResponse(`Error signin up: ${error}`, {status: 400})
    }
}