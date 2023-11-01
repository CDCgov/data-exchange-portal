import config from "../local.settings.json";

export default () => {
  // Init environment variables in local.settings.json.
  process.env = Object.assign(process.env, { ...config.Values });
};
