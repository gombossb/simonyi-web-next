import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "hu"],

  // Used when no locale matches
  defaultLocale: "hu",
  localePrefix: "always",
});

export const config = {
  matcher: ["/", "/(hu|en)/:path*"],
};
