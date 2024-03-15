import { http, HttpResponse } from "msw";
import API_ENDPOINTS from "src/config/api";
import mockFileSubmissions from "src/mocks/data/fileStatus.json";

export const handlers = [
  http.get(API_ENDPOINTS.fileSubmissions, ({ request }) => {
    const url = new URL(request.url);
    const dataStreamId = url.searchParams.get("data_stream_id");

    if (!dataStreamId) {
      return new HttpResponse(null, { status: 400 });
    }

    return HttpResponse.json(mockFileSubmissions);
  }),
];
