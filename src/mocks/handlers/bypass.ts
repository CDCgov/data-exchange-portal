import { http, passthrough } from "msw";
import API_ENDPOINTS from "src/config/api";

export const bypassedHandlers = [
  http.all(API_ENDPOINTS.upload, () => {
    return passthrough();
  }),
];
