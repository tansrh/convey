import protectRoute from "./middleware/protectRoute";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const protectedApis: string[] = ["/api/me", "/api/messages", "/api/messages/conversations", "/api/messages/users"]
export async function middleware(request: NextRequest) {
    const pathName: string  = request.nextUrl.pathname;
    if (protectedApis.some((api)=> pathName.includes(api))) {
        const response = await protectRoute(request);
        if (response.status !== 200) {
            return response;
        }
        const res = await response.json();
        // Set userId in a custom header for downstream API route
        const nextResponse = NextResponse.next();
        nextResponse.headers.set("x-user-id", res.decodedToken.userId);
        return nextResponse;
    }
    return NextResponse.next();
}