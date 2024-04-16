import { http, HttpResponse } from "msw";
import API_ENDPOINTS from "src/config/api";
import mockFileSubmissions from "src/mocks/data/fileStatus.json";
import mockReportCounts from "src/mocks/data/reportCounts.json";
import mockSubmissionDetails from "src/mocks/data/submissionDetails.json";

export const handlers = [
  http.get(API_ENDPOINTS.fileSubmissions, ({ request }) => {
    const url = new URL(request.url);
    const dataStreamId = url.searchParams.get("data_stream_id");

    if (!dataStreamId) {
      return new HttpResponse(null, { status: 400 });
    }

    return HttpResponse.json(mockFileSubmissions);
  }),

  http.get(API_ENDPOINTS.reportCounts, ({ request }) => {
    const url = new URL(request.url);
    const dataStreamId = url.searchParams.get("data_stream_id");
    const dataStreamRoute = url.searchParams.get("data_stream_route");

    if (!dataStreamId) {
      return new HttpResponse(null, { status: 400 });
    }
    if (!dataStreamRoute) {
      return new HttpResponse(null, { status: 400 });
    }

    return HttpResponse.json(mockReportCounts);
  }),

  http.get(API_ENDPOINTS.submissionDetails, ({ request }) => {
    const url = new URL(request.url);
    const upload_id = url.searchParams.get("upload_id");

    if (!upload_id) {
      return new HttpResponse(null, { status: 400 });
    }

    return HttpResponse.json(mockSubmissionDetails);
  }),
];
