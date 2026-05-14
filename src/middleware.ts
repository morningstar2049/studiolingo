import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// /chat itself is intentionally NOT protected here — we want the inline
// sign-in card to render on the page for logged-out visitors. The API route
// IS protected so a signed-out user cannot bypass the gate and call /api/chat
// directly. Per-user rate limiting is enforced inside the route handler using
// the auth() userId.
const isPrivateRoute = createRouteMatcher(["/buy", "/api/chat(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isPrivateRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
