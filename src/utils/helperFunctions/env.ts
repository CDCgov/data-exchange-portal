type EnvType =
  | "VITE_SAMS_AUTHORITY_URL"
  | "VITE_SAMS_CLIENT_ID"
  | "VITE_SAMS_AUTH_URL"
  | "VITE_SAMS_USER_INFO_URL"
  | "VITE_OAUTH_CALLBACK_URL"
  | "VITE_OAUTH_TOKEN_URL"
  | "VITE_APP_BUILD_NUMBER"
  | "VITE_UPLOAD_API_ENDPOINT"
  | "VITE_DEV_MOCKING_ENABLED"
  | "VITE_APP_CONFIG_CONNECTION_STRING";

export function getEnv(name: EnvType): string {
  const envVar = import.meta.env[name] || "";

  try {
    return JSON.parse(envVar);
  } catch (_) {
    return envVar;
  }
}
