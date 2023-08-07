type EnvType =
  | "REACT_APP_SAMS_AUTHORITY_URL"
  | "REACT_APP_SAMS_CLIENT_ID"
  | "REACT_APP_SAMS_AUTH_ENDPOINT"
  | "REACT_APP_SAMS_USER_INFO_ENDPOINT"
  | "REACT_APP_OAUTH_CALLBACK_URL";

export function getEnv(name: EnvType): string {
  return process.env[name] || "";
}
