import { getEnv } from "src/utils/helperFunctions/env";

export const getOIDCTokenDetails = () => {
  const oidcStorage = window.localStorage.getItem(
    `oidc.user:${getEnv("VITE_SAMS_AUTHORITY_URL")}:${getEnv(
      "VITE_SAMS_CLIENT_ID"
    )}`
  );

  if (!oidcStorage) {
    return null;
  }

  try {
    const oidcDetails = JSON.parse(oidcStorage as string);
    const expireTime = oidcDetails.expires_at * 1000;

    if (!oidcDetails.expires_at || isNaN(expireTime)) {
      throw new Error("Invalid token details");
    }

    return { oidcDetails, expireTime };
  } catch (error) {
    console.error("Error parsing OIDC storage or invalid token details", error);
    return null;
  }
};
