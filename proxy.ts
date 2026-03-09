import { NextRequest, NextResponse } from "next/server";

const locales = ["he", "en"];
const defaultLocale = "he";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a locale
  const hasLocale = locales.some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  );
  if (hasLocale) return;

  // Skip static files and api routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return;
  }

  // Detect locale from Accept-Language header, default to Hebrew
  const acceptLang = request.headers.get("accept-language") || "";
  const preferred = acceptLang.includes("en") ? "en" : defaultLocale;

  // Check cookie override
  const cookieLocale = request.cookies.get("locale")?.value;
  const locale = locales.includes(cookieLocale || "") ? cookieLocale! : preferred;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|images|.*\\..*).*)"],
};
