import { renderHook } from "@testing-library/react-hooks";
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  useFeatureFlag,
  useConfiguration,
} from "src/utils/hooks/useFeatureFlag";

vi.mock("@azure/app-configuration", () => {
  return {
    AppConfigurationClient: vi.fn().mockImplementation(() => {
      return {
        getConfigurationSetting: vi.fn((config) => {
          if (config.key.startsWith(".appconfig.featureflag/")) {
            return Promise.resolve({
              value: JSON.stringify({
                id: config.key.split("/")[1],
                enabled: true,
              }),
            });
          } else {
            return Promise.resolve({
              value: "Test Configuration Value",
            });
          }
        }),
      };
    }),
  };
});

describe("App Configuration Hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("useFeatureFlag should return enabled state for a feature flag", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFeatureFlag("TestFeatureFlag")
    );

    await waitForNextUpdate();

    expect(result.current.enabled).toBeTruthy();
    expect(result.current.enabled).toEqual(true);
  });

  it("useConfiguration should return configuration value for a config key", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useConfiguration("TestConfigKey")
    );

    await waitForNextUpdate();

    expect(result.current.config).toBe("Test Configuration Value");
  });
});
