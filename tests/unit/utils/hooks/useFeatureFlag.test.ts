import { renderHook } from "@testing-library/react-hooks";
import { AppConfigurationClient } from "@azure/app-configuration";
import {
  useFeatureFlag,
  useConfiguration,
} from "src/utils/hooks/useFeatureFlag";

jest.mock("@azure/app-configuration", () => {
  return {
    AppConfigurationClient: jest.fn().mockImplementation(() => {
      return {
        getConfigurationSetting: jest.fn((config) => {
          if (config.key.startsWith(".appconfig.featureflag/")) {
            return Promise.resolve({
              value: JSON.stringify({
                id: config.key.split("/")[1],
                enabled: true,
              }),
            });
          } else {
            return Promise.resolve({
              value: "Some Configuration Value",
            });
          }
        }),
      };
    }),
  };
});

describe("App Configuration Hooks", () => {
  it("useFeatureFlag should return enabled state for a feature flag", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFeatureFlag("TestFeatureFlag")
    );

    await waitForNextUpdate();

    expect(result.current.enabled).toBe(true);
    expect(
      AppConfigurationClient.prototype.getConfigurationSetting
    ).toHaveBeenCalledWith({
      key: ".appconfig.featureflag/TestFeatureFlag",
    });
  });

  it("useConfiguration should return configuration value for a config key", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useConfiguration("TestConfigKey")
    );

    await waitForNextUpdate();

    expect(result.current.config).toBe("Some Configuration Value");
    expect(
      AppConfigurationClient.prototype.getConfigurationSetting
    ).toHaveBeenCalledWith({
      key: "TestConfigKey",
    });
  });
});
