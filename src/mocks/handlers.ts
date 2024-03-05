import { http, HttpResponse } from "msw";
import API_ENDPOINTS from "src/config/api";
import mockFileSubmissions from "src/mocks/data/fileStatus.json";

export const handlers = [
  http.get(API_ENDPOINTS.fileSubmissions, () => {
    return HttpResponse.json(mockFileSubmissions);
  }),
];
