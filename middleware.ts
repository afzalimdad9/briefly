import { authMiddleware } from "@clerk/nextjs/server";
import { NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY } from "./config";

export default authMiddleware({
  publishableKey: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  publicRoutes: ["/", "/premium"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
