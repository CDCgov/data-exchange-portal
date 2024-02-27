import { http, HttpResponse } from "msw";
import API_ENDPOINTS from "../config/api";

export const handlers = [
  http.get(API_ENDPOINTS.fileSubmissions, () => {
    return HttpResponse.json({ name: "John Maverick" });
  }),
];
