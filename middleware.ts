import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes to be excluded from authentication protection
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/', '/api/webhooks/clerk', '/api/webhooks/stripe']);

export default clerkMiddleware(async (auth, request) => {
  // Protect routes that are not public
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
