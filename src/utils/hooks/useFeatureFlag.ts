import { AppConfigurationClient } from "@azure/app-configuration";
import { useMemo, useState } from "react";
import { getEnv } from "src/utils/helperFunctions/env";

const client = new AppConfigurationClient(
  getEnv("VITE_APP_CONFIG_CONNECTION_STRING")
);

/**
 * Retrieves the specified feature flag from Azure App Configuration.
 * This is used to toggle full features.
 */
const useFeatureFlag = (flagKey: string = "") => {
  const [enabled, setEnabled] = useState(false);

  useMemo(async () => {
    if (!flagKey || !flagKey.toString().trim().length) {
      console.error("A feature flag key must be supplied.");
    } else {
      try {
        const result = await client.getConfigurationSetting({
          key: `.appconfig.featureflag/${flagKey.toString().trim()}`,
        });
        if (result && typeof result.value === "string") {
          console.debug(
            "Feature: " + JSON.parse(result.value).id,
            JSON.parse(result.value).enabled
          );
          setEnabled(JSON.parse(result.value).enabled);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [flagKey]);

  return { enabled };
};

/**
 * Retrieves the specified configuration from Azure App Configuration.
 * This is used to get specific configurations of particular feature flags.
 */
const useConfiguration = (configKey: string = "") => {
  const [config, setConfig] = useState("");

  useMemo(async () => {
    if (!configKey || !configKey.toString().trim().length) {
      console.error("A config key must be supplied.");
    } else {
      try {
        const result = await client.getConfigurationSetting({
          key: configKey.toString().trim(),
        });
        if (result && typeof result.value === "string") {
          console.debug("Config: " + result.key, result.value);
          setConfig(result.value);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [configKey]);

  return { config };
};

export { useFeatureFlag, useConfiguration };
