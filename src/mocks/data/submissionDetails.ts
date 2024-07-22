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
    service: faker.helpers.arrayElement([
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

const getReports = (submission: FileSubmission): Report[] => {
  const numOfReports = faker.number.int({ min: 1, max: 3 });
  const reports: Report[] = [];
  for (let i = 0; i < numOfReports; i++) {
    reports.push(generateReport(submission));
  }
  return reports;
};

const generateSubmissionDetails = (
  submission: FileSubmission
): SubmissionDetails => {
  const reports = getReports(submission);

  const details: SubmissionDetails = {
    status: submission.status,
    lastService: reports[0].service,
    lastAction: reports[0].action,
    filename: submission.filename,
    uploadId: submission.upload_id,
    dexIngestTimestamp: submission.timestamp,
    dataStreamId: submission.metadata?.data_stream_id,
    dataStreamRoute: submission.metadata?.data_stream_route,
    jurisdiction: submission.jurisdiction,
    senderId: submission.sender,
    reports: reports,
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
  return mockDetails.find((el: SubmissionDetails) => el.uploadId == upload_id);
};

export default getMockDetails;
