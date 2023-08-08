type EnvType =
  | "VITE_SAMS_AUTHORITY_URL"
  | "VITE_SAMS_CLIENT_ID"
  | "VITE_SAMS_AUTH_ENDPOINT"
  | "VITE_SAMS_USER_INFO_ENDPOINT"
  | "VITE_OAUTH_CALLBACK_URL";

export function getEnv(name: EnvType): string {
  return import.meta.env[name] || "";
}
