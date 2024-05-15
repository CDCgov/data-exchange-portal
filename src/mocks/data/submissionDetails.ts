import { faker } from "@faker-js/faker";
import {
  SubmissionDetails,
  ValidationReport,
} from "src/utils/api/submissionDetails";
import { FileSubmission } from "src/utils/api/fileSubmissions";
import mockSubmissions from "src/mocks/data/fileSubmissions";

const getIssues = (submission: FileSubmission): string[] => {
  if (submission.status != "failed") return [];

  return submission.data_stream_route == "csv"
    ? [
        "Missing required metadata field, 'meta_field1'.",
        "Metadata field, 'meta_field2' is set to 'value3' and does not contain one of the allowed values: [ 'value1', value2' ]",
      ]
    : ["Hl7 Validation Error -- See validation report"];
};

const getValidationReport = (): ValidationReport => {
  return {
    line: faker.number.int({ min: 1, max: 5 }),
    column: faker.number.int({ min: 1, max: 100 }),
    path: "OBX[1]-5[1]",
    description:
      "The primitive Field OBX-5 (Observation Value) contains at least one unescaped delimiter",
    category: "Unescaped Separator",
    classification: "Error",
  };
};

const getReports = (submission: FileSubmission): ValidationReport[] => {
  if (submission.status == "failed" && submission.data_stream_route == "hl7") {
    const numOfReports = faker.number.int({ min: 1, max: 3 });
    const reports: ValidationReport[] = [];
    for (let i = 0; i < numOfReports; i++) {
      reports.push(getValidationReport());
    }
    return reports;
  }
  return [];
};

const generateSubmissionDetails = (
  submission: FileSubmission
): SubmissionDetails => {
  const fileSize = faker.number.int({ min: 1000000, max: 200000000 });
  const details: SubmissionDetails = {
    info: {
      status: submission.status,
      stage_name:
        submission.data_stream_route == "hl7"
          ? "dex-hl7-validation"
          : "dex-uploading",
      file_name: submission.filename,
      file_size_bytes: fileSize,
      bytes_uploaded: faker.number.int({ min: 0, max: fileSize }),
      upload_id: submission.upload_id,
      uploaded_by: faker.internet.userName(),
      timestamp: submission.timestamp,
      data_stream_id: submission.data_stream_id,
      data_stream_route: submission.data_stream_route,
    },
    issues: getIssues(submission),
    reports: getReports(submission),
  };
  return details;
};

const buildMockDetails = (): SubmissionDetails[] => {
  const detailsAims: SubmissionDetails[] = mockSubmissions.aimsAll.items.map(
    (el: FileSubmission) => generateSubmissionDetails(el)
  );
  const detailsDaart: SubmissionDetails[] = mockSubmissions.daartHl7.items.map(
    (el: FileSubmission) => generateSubmissionDetails(el)
  );
  return [...detailsAims, ...detailsDaart];
};

export const mockDetails = buildMockDetails();

const getMockDetails = (upload_id: string): SubmissionDetails | undefined => {
  return mockDetails.find(
    (el: SubmissionDetails) => el.info.upload_id == upload_id
  );
};

export default getMockDetails;
