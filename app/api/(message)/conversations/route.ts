import { NextResponse } from "next/server"

export const  GET = async (req: Request, res: Response)=>{
return new NextResponse("Conversations", {
status: 200
})
}