type EnvType = "DEX_URL" | "SAMS_USERNAME" | "SAMS_PASSWORD";

export function getEnv(name: EnvType): string {
  return process.env[name] || "";
}
