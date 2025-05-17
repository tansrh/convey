import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const { message, receiverId } = body;
        const senderId = request.headers.get("x-user-id");
        if (!message || !senderId || !receiverId) {
            return new NextResponse(JSON.stringify({message: "Please fill all details."}), { status: 400 });
        }
        let conversation =  await prisma.conversation.findFirst({where: {
            participantId: {
                hasEvery: [senderId, receiverId]
            }
        }})
        if(!conversation){
            conversation = await prisma.conversation.create({
                data: {
                    participantId: {
                        set: [senderId, receiverId]
                    }
                }
            })
        }
        const newMessage = await prisma.message.create({
            data: {
                body: message,
                senderId,
                conversationId: conversation.id
            }
        })
        if(newMessage){
            conversation = await prisma.conversation.update({
                where: {
                    id: conversation.id
                },
                data: {
                    messages: {
                        connect: {
                            id: newMessage.id
                        }
                    }
                }
            })
        }
        return new NextResponse(JSON.stringify(newMessage), { status: 200 });
    } catch (error) {
        return new NextResponse(`Error Sending Message: ${error}`, { status: 400 });
    }
}

export const GET = async (request: NextRequest) => {
    try {
        const receiverID = request.headers.get("receiverID");
        const userId = request.headers.get("x-user-id");
        const conversation = await prisma.conversation.findFirst({
            where: {
                participantId: {
                    hasEvery: [userId!, receiverID!]
                }
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc"
                    }
                }
            }
        })
        if (!conversation) {
            return new NextResponse(
                JSON.stringify({ error: "Conversation not found." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }
        return new NextResponse(JSON.stringify(conversation), { status: 200 });
    } catch (error) {
        return new NextResponse(`Error Getting Message: ${error}`, { status: 400 });
    }
}