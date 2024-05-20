import { http, HttpResponse } from "msw";
import API_ENDPOINTS from "src/config/api";

import { FileSubmissions } from "src/utils/api/fileSubmissions";

import { generateCounts } from "src/mocks/data/reportCounts";
import mockSubmissions, { dateFilter } from "src/mocks/data/fileSubmissions";
import getMockDetails from "src/mocks/data/submissionDetails";

const earliestDate: string = new Date("2021-01-01T05:00:00Z").toISOString();

export const psApiHandlers = [
  http.get(API_ENDPOINTS.fileSubmissions, ({ request }) => {
    const url = new URL(request.url);
    const dataStreamId = url.searchParams.get("data_stream_id");
    const dataRoute = url.searchParams.get("data_stream_route");
    const startDate = url.searchParams.get("date_start") || earliestDate;

    const submissionsResponse = (submissions: FileSubmissions) => {
      return HttpResponse.json(dateFilter(submissions, startDate));
    };

    if (!dataStreamId) {
      return new HttpResponse(null, { status: 400 });
    }

    if (dataStreamId == "aims-celr") {
      if (dataRoute == "csv")
        return submissionsResponse(mockSubmissions.aimsCsv);
      if (dataRoute == "hl7")
        return submissionsResponse(mockSubmissions.aimsHl7);
      return submissionsResponse(mockSubmissions.aimsAll);
    }

    return submissionsResponse(mockSubmissions.daartHl7);
  }),

  http.get(API_ENDPOINTS.reportCounts, ({ request }) => {
    const url = new URL(request.url);
    const dataStreamId = url.searchParams.get("data_stream_id");
    const dataRoute = url.searchParams.get("data_stream_route");
    const startDate = url.searchParams.get("date_start") || earliestDate;

    const countsResponse = (submissions: FileSubmissions) => {
      return HttpResponse.json(
        generateCounts(dateFilter(submissions, startDate))
      );
    };

    if (!dataStreamId) {
      return new HttpResponse(null, { status: 400 });
    }

    if (dataStreamId == "aims-celr") {
      if (dataRoute == "csv") return countsResponse(mockSubmissions.aimsCsv);
      if (dataRoute == "hl7") return countsResponse(mockSubmissions.aimsHl7);
      return countsResponse(mockSubmissions.aimsAll);
    }

    return countsResponse(mockSubmissions.daartHl7);
  }),

  http.get(API_ENDPOINTS.submissionDetails, ({ request }) => {
    const url = new URL(request.url);
    const upload_id = url.searchParams.get("upload_id");

    if (!upload_id) {
      return new HttpResponse(null, { status: 400 });
    }

    const details = getMockDetails(upload_id);

    return HttpResponse.json(details);
  }),
];
