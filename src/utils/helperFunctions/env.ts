type EnvType =
  | "VITE_SAMS_AUTHORITY_URL"
  | "VITE_SAMS_CLIENT_ID"
  | "VITE_SAMS_AUTH_URL"
  | "VITE_SAMS_USER_INFO_URL"
  | "VITE_OAUTH_CALLBACK_URL"
  | "VITE_OAUTH_TOKEN_URL"
  | "VITE_APP_BUILD_NUMBER"
  | "VITE_UPLOAD_API_ENDPOINT"
  | "VITE_API_BASE_URL"
  | "VITE_DEV_MOCKING_ENABLED";

export function getEnv(name: EnvType): string {
  return import.meta.env[name] || "";
}