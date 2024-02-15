type EnvType =
  | "VITE_SAMS_AUTHORITY_URL"
  | "VITE_SAMS_CLIENT_ID"
  | "VITE_SAMS_AUTH_URL"
  | "VITE_SAMS_USER_INFO_URL"
  | "VITE_OAUTH_CALLBACK_URL"
  | "VITE_OAUTH_TOKEN_URL"
  | "VITE_APP_BUILD_NUMBER"
  | "VITE_UPLOAD_API_ENDPOINT";

export function getEnv(name: EnvType): string {
  return import.meta.env[name] || "";
}
