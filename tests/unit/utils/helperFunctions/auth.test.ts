import { getOIDCTokenDetails } from "src/utils/helperFunctions/auth";
import { vi } from "vitest";
import { getEnv } from "src/utils/helperFunctions/env";

describe("getOIDCTokenDetails", () => {
  const mockAuthorityUrl = "https://mock-authority-url.com";
  const mockClientId = "mock-client-id";
  const oidcKey = `oidc.user:${mockAuthorityUrl}:${mockClientId}`;

  beforeEach(() => {
    vi.resetAllMocks();

    localStorage.clear();

    vi.mock("src/utils/helperFunctions/env", () => ({
      getEnv: vi.fn(),
    }));

    vi.mocked(getEnv).mockImplementation((key: string) => {
      if (key === "VITE_SAMS_AUTHORITY_URL") {
        return mockAuthorityUrl;
      }
      if (key === "VITE_SAMS_CLIENT_ID") {
        return mockClientId;
      }
      return "";
    });
  });

  it("should return null if there is no token in local storage", () => {
    expect(getOIDCTokenDetails()).toBeNull();
  });

  it("should return null if the token is not valid JSON", () => {
    localStorage.setItem(oidcKey, "invalid-json");
    expect(getOIDCTokenDetails()).toBeNull();
  });

  it("should return null if the token does not have expires_at", () => {
    localStorage.setItem(oidcKey, JSON.stringify({}));
    expect(getOIDCTokenDetails()).toBeNull();
  });

  it("should return null if the expires_at is not a valid number", () => {
    localStorage.setItem(
      oidcKey,
      JSON.stringify({ expires_at: "invalid-number" })
    );
    expect(getOIDCTokenDetails()).toBeNull();
  });

  it("should return token details and expireTime if the token is valid", () => {
    const expires_at = Math.floor(Date.now() / 1000) + 3600;
    const oidcDetails = { expires_at };
    localStorage.setItem(oidcKey, JSON.stringify(oidcDetails));
    const result = getOIDCTokenDetails();
    expect(result).toEqual({
      oidcDetails,
      expireTime: expires_at * 1000,
    });
  });
});
