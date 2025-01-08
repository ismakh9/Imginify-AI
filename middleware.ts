// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// // Define public routes to be excluded from authentication protection
// const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/', '/api/webhooks/clerk', '/api/webhooks/stripe', '/api/webhooks/test']);

// export default clerkMiddleware(async (auth, request) => {
//   // Protect routes that are not public
//   if (!isPublicRoute(request)) {
//     await auth.protect();
//   }
// });

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };


// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// // Specify configuration options for Clerk middleware
// export const config = {
//   matcher: [
//     "/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)", // Match all routes except static files and _next
//     "/",                      // Match the home route
//     "/api/webhooks/clerk",    // Allow access to Clerk webhooks
//     "/api/webhooks/stripe",   // Allow access to Stripe webhooks
//   ],
// };

import { clerkMiddleware } from '@clerk/nextjs/server'

// Apply Clerk middleware to protected routes
export default clerkMiddleware()

export const config = {
  matcher: [
    '/((?!.*\\..*|_next|api/webhooks/clerk|api/webhooks/stripe|$).*)', // Exclude static files, _next, and the specified webhook routes
    '/(api|trpc)(.*)',
  ],
}