import prisma from "@/db/prisma";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        // Fetch all users, select only necessary fields
        const userId = request.headers.get("x-user-id");
        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: userId!
                }
            },
            select: {
                id: true,
                fullName: true,
                profilePic: true
            }
        });
        return new Response(JSON.stringify({ users }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}