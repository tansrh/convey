import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    return new NextResponse("Logged out Successfully", {
        status: 200
    })
}

export const POST = async (req: Request) => {
    try {
        const response = new NextResponse(
            JSON.stringify({ message: "Logged out successfully" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
        response.cookies.set("jwt", "", { maxAge: 0 });
        return response;
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}