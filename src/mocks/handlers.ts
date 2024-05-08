import { http, HttpResponse } from "msw";
import API_ENDPOINTS from "src/config/api";

import mockDataStreams from "src/mocks/data/dataStreams.json";
import mockFileSubmissions from "src/mocks/data/fileSubmissions.json";

import mockReportCountsAimsAll from "src/mocks/data/reportCounts/reportCountsAimsAll.json";
import mockReportCountsAimsCsv from "src/mocks/data/reportCounts/reportCountsAimsCsv.json";
import mockReportCountsAimsHl7 from "src/mocks/data/reportCounts/reportCountsAimsHl7.json";
import mockReportCountsDaartHl7 from "src/mocks/data/reportCounts/reportCountsDaartHl7.json";

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

    if (!dataStreamId) {
      return new HttpResponse(null, { status: 400 });
    }

    if (dataStreamId == "aims-celr") {
      if (dataRoute == "csv") return HttpResponse.json(mockReportCountsAimsCsv);
      if (dataRoute == "hl7") return HttpResponse.json(mockReportCountsAimsHl7);
      return HttpResponse.json(mockReportCountsAimsAll);
    }

    return HttpResponse.json(mockReportCountsDaartHl7);
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
