import { UserManager, UserManagerSettingsStore } from "oidc-client-ts";
import {
  AuthContextProps,
  AuthProvider,
  AuthState,
  useAuth,
} from "react-oidc-context";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";
import { ProtectedRoute } from "src/components/ProtectedRoute";

interface TestRouterOptions {
  protected: boolean;
}

export function withMockedAuthProvider(
  children: React.ReactElement,
  userContext: AuthContextProps
): React.ReactElement {
  vi.mocked(useAuth).mockReturnValue(userContext);

  return <AuthProvider>{children}</AuthProvider>;
}

export function createMockedAuthContext(
  authState: AuthState
): AuthContextProps {
  const mockedSettings = {
    authority: "mocked authority",
    client_id: "mocked client ID",
    redirect_uri: "mocked redirect URI",
  };

  const settings = new UserManagerSettingsStore(mockedSettings);
  const userManager = new UserManager(settings);

  return {
    ...authState,
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
    </MemoryRouter>
  );
}
