import { faker } from "@faker-js/faker";
import { Report, SubmissionDetails } from "src/utils/api/submissionDetails";
import { FileSubmission } from "src/utils/api/fileSubmissions";
import mockSubmissions from "src/mocks/data/fileSubmissions";

const generateIssue = () => ({
  level: faker.helpers.arrayElement(["error", "warning", "info"]),
  message: faker.lorem.sentence(),
});

const generateReference = () => ({
  type: "data",
  key: "blob_url",
  value: `/path/to/file?${faker.string.uuid()}`,
});

const generateReport = (submission: FileSubmission): Report => {
  return {
    stage: faker.helpers.arrayElement([
      "DEX Upload",
      "DEX Routing",
      "DEX HL7 v2",
    ]),
    action: faker.helpers.arrayElement([
      "verify",
      "debatch",
      "process",
      "validate",
    ]),
    schemaName: faker.helpers.arrayElement(["hl7", "fhir"]),
    schemaVersion: faker.system.semver(),
    dataStreamId: faker.helpers.arrayElement([
      "aims-celr",
      "aims-hl7",
      "aims-fhir",
    ]),
    dataStreamRoute: faker.helpers.arrayElement(["csv", "json", "xml"]),
    jurisdiction: faker.location.state({ abbreviated: true }),
    status: faker.helpers.arrayElement(["completed", "failed", "processing"]),
    timestamp: submission.timestamp,
    messageMetadata: {
      messageUUID: faker.string.uuid(),
      messageHash: faker.string.hexadecimal(),
      singleOrBatch: faker.helpers.arrayElement(["single", "batch"]),
      messageIndex: faker.number.int({ min: 1, max: 10 }),
    },
    issues: Array.from(
      { length: faker.number.int({ min: 0, max: 5 }) },
      generateIssue
    ),
    references: Array.from(
      { length: faker.number.int({ min: 0, max: 3 }) },
      generateReference
    ),
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
