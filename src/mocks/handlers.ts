import { http, HttpResponse } from "msw";
import API_ENDPOINTS from "../config/api";
import * as fileStatus from "./data/fileStatus.json";

export const handlers = [
  http.get(API_ENDPOINTS.fileSubmissions, () => {
    return HttpResponse.json(fileStatus);
  }),
];
