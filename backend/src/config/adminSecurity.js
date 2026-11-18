export const ADMIN_SESSION_COOKIE_NAME = "wcmrp_admin_session";

const DEFAULT_FRONTEND_ORIGINS = [
  "https://wcmrp.confworld.org",
];

export const getFrontendOrigins = () => {
  const configuredOrigins = process.env.FRONTEND_ORIGINS
    ?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return configuredOrigins?.length ? configuredOrigins : DEFAULT_FRONTEND_ORIGINS;
};

export const getAdminCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
});
