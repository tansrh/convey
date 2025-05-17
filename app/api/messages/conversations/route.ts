import prisma from "@/db/prisma";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const userId = request.headers.get("x-user-id");
        if (!userId) {
            return new Response(
                JSON.stringify({ error: "User ID not provided" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }
        const conversations = await prisma.conversation.findMany({
            where: {
                participantId: {
                    has: userId
                }
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc"
                    }
                }
            }
        });
        return new Response(JSON.stringify({ conversations }), {
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