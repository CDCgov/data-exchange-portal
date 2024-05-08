import { http, HttpResponse } from "msw";
import API_ENDPOINTS from "src/config/api";

import { ReportCounts } from "src/utils/api/reportCounts";

import mockCounts, {
  getDaysInThePast,
  reduceCounts,
} from "src/mocks/data/reportCounts";
import mockDataStreams from "src/mocks/data/dataStreams.json";
import mockFileSubmissions from "src/mocks/data/fileSubmissions.json";
import mockSubmissionDetails from "src/mocks/data/submissionDetails.json";

export const handlers = [
  http.get(API_ENDPOINTS.dataStreams, () => {
    return HttpResponse.json(mockDataStreams);
  }),

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
    const dataRoute = url.searchParams.get("data_stream_route");
    const startDate =
      url.searchParams.get("date_start") ||
      new Date("2021-01-01T05:00:00Z").toISOString();

    const countsResponse = (counts: ReportCounts) => {
      return HttpResponse.json(
        reduceCounts(counts, getDaysInThePast(startDate))
      );
    };

    if (!dataStreamId) {
      return new HttpResponse(null, { status: 400 });
    }

    if (dataStreamId == "aims-celr") {
      if (dataRoute == "csv") return countsResponse(mockCounts.aimsCsv);
      if (dataRoute == "hl7") return countsResponse(mockCounts.aimsHl7);
      return countsResponse(mockCounts.aimsAll);
    }

    return countsResponse(mockCounts.daartHl7);
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
