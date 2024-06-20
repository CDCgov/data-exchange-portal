import { UserManager, UserManagerSettingsStore, User } from "oidc-client-ts";
import { RecoilRoot } from "recoil";
import { AuthContextProps, useAuth } from "react-oidc-context";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";
import ProtectedRoute from "src/components/ProtectedRoute";

interface TestRouterOptions {
  protected: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  expiresIn?: number;
}

export function withMockedAuthProvider(
  children: React.ReactElement,
  userContext: AuthContextProps
): React.ReactElement {
  vi.mocked(useAuth).mockReturnValue(userContext);
  return children;
}

export function createMockedAuthContext({
  isAuthenticated,
  isLoading,
  expiresIn = 3600,
}: AuthState): AuthContextProps {
  const mockedSettings = {
    authority: "mocked authority",
    client_id: "mocked client ID",
    redirect_uri: "mocked redirect URI",
  };

  const settings = new UserManagerSettingsStore(mockedSettings);
  const userManager = new UserManager(settings);

  const user: User | null = isAuthenticated
    ? {
        access_token: "mockAccessToken",
        expires_in: expiresIn,
        profile: {
          sub: "mockUserId",
          iss: "mockIssuer",
          aud: "mockAudience",
          exp: Math.floor(Date.now() / 1000) + expiresIn,
          iat: Math.floor(Date.now() / 1000),
        },
        token_type: "Bearer",
        scope: "openid profile",
        session_state: "mockSessionState",
        id_token: "mockIdToken",
        refresh_token: "mockRefreshToken",
        expired: false,
        expires_at: Math.floor(Date.now() / 1000) + expiresIn,
        scopes: ["openid", "profile"],
        state: {},
        toStorageString: () => JSON.stringify({}),
      }
    : null;

  return {
    isLoading,
    isAuthenticated,
    user,
    settings: mockedSettings,
    events: userManager.events,
    clearStaleState: vi.fn(),
    removeUser: vi.fn(),
    signinPopup: vi.fn(),
    signinSilent: vi.fn(),
    signinRedirect: vi.fn(),
    signoutRedirect: vi.fn(),
    signoutPopup: vi.fn(),
    signoutSilent: vi.fn(),
    querySessionStatus: vi.fn(),
    revokeTokens: vi.fn(),
    startSilentRenew: vi.fn(),
    stopSilentRenew: vi.fn(),
  };
}

export function withMemoryRouter(
  children: React.ReactElement,
  path: string,
  opts: TestRouterOptions
): React.ReactElement {
  return (
    <MemoryRouter initialEntries={[path]}>
      <RecoilRoot>
        <Routes>
          <Route
            path={path}
            element={
              opts.protected ? (
                <ProtectedRoute>{children}</ProtectedRoute>
              ) : (
                children
              )
            }
          />
        </Routes>
      </RecoilRoot>
    </MemoryRouter>
  );
}
