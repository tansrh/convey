
import protectRoute from "./middleware/protectRoute";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const protectedApis: string[] = ["/api/me", "/api/messages", "/api/messages/conversations", "/api/messages/users"]
export async function middleware(request: NextRequest) {
    const pathName: string = request.nextUrl.pathname;
    if (request.method === 'GET' && !pathName.startsWith('/api') && !(pathName === "/" || pathName === '/signin' || pathName === '/signup')) {
        // TODO in redux
        const userCookie = request.cookies.get("user")?.value;
        try {
            const user = JSON.parse(userCookie!);
            if(!user){
                NextResponse.redirect("/signin");
            }
        } catch (e) {
            console.error("Failed to parse user cookie", e);
        }
    }
    if (protectedApis.some((api) => pathName.includes(api))) {
        const response = await protectRoute(request);
        if (response.status !== 200) {
            return response;
        }
        const res = await response.json();
        const nextResponse = NextResponse.next();
        nextResponse.headers.set("x-user-id", res.decodedToken.userId);
        return nextResponse;
    }
    return NextResponse.next();
}