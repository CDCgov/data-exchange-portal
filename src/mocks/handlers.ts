import { http, HttpResponse } from "msw";
import API_ENDPOINTS from "../config/api";
import { mockFileSubmissions } from "./data/fileStatus.ts";

export const handlers = [
  http.get(API_ENDPOINTS.fileSubmissions, () => {
    return HttpResponse.json(mockFileSubmissions);
  }),
];
