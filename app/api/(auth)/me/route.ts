import prisma from "@/db/prisma"
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const userId = request.headers.get("x-user-id");
        if (!userId) {
            return new Response(
                JSON.stringify({ error: "User ID not provided" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }
        const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, username: true, fullName: true, profilePic: true } });
        const response =  new NextResponse(JSON.stringify({ user }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
        // TODO in redux
        response.cookies.set(
            "user",
            JSON.stringify(user),
            { maxAge: 2000*1000, path: "/" }
        );
        return response;
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}