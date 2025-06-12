import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { EnumTokens } from "@/6-shared/api";
import { PLATFORM_PAGES } from "@/6-shared/config/pages-url.config";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

  const isAuthPage = pathname.startsWith("/auth");
  const protectedRoutes = [
    "/profile",
    "/new",
    "/messages",
    "/favorites",
    "/dashboard",
  ];

  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL(PLATFORM_PAGES.HOME, request.url));
  }

  const isProtected = protectedRoutes.some((route) => pathname.includes(route));
  if (isProtected && !refreshToken) {
    return NextResponse.redirect(new URL(PLATFORM_PAGES.LOGIN, request.url));
  }

  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
