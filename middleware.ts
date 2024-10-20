import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
    authorizedParties: ["/", "/premium"],
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};