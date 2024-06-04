import { faker } from "@faker-js/faker";
import { Report, SubmissionDetails } from "src/utils/api/submissionDetails";
import { FileSubmission } from "src/utils/api/fileSubmissions";
import mockSubmissions from "src/mocks/data/fileSubmissions";

const generateReport = (submission: FileSubmission, stage: string): Report => {
  return {
    report_id: faker.string.uuid(),
    stage_name: stage,
    timestamp: submission.timestamp,
    content: {
      schema_name: "mock_schema",
      schema_version: "0.0.1",
    },
  };
};

const getReports = (submission: FileSubmission, stage: string): Report[] => {
  const numOfReports = faker.number.int({ min: 1, max: 3 });
  const reports: Report[] = [];
  for (let i = 0; i < numOfReports; i++) {
    reports.push(generateReport(submission, stage));
  }
  return reports;
};

const generateSubmissionDetails = (
  submission: FileSubmission
): SubmissionDetails => {
  const route = submission.metadata?.data_stream_route;
  const stage = route == "hl7" ? "dex-hl7" : "dex-upload";

  const details: SubmissionDetails = {
    upload_id: submission.upload_id,
    data_stream_id: submission.metadata?.data_stream_id,
    data_stream_route: submission.metadata?.data_stream_route,
    reports: getReports(submission, stage),
  };
  return details;
};

const buildMockDetails = (): SubmissionDetails[] => {
  const detailsAims: SubmissionDetails[] = mockSubmissions.aimsAll.map(
    (el: FileSubmission) => generateSubmissionDetails(el)
  );
  const detailsDaart: SubmissionDetails[] = mockSubmissions.daartHl7.map(
    (el: FileSubmission) => generateSubmissionDetails(el)
  );
  return [...detailsAims, ...detailsDaart];
};

export const mockDetails = buildMockDetails();

const getMockDetails = (upload_id: string): SubmissionDetails | undefined => {
  return mockDetails.find((el: SubmissionDetails) => el.upload_id == upload_id);
};

export default getMockDetails;
