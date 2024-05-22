import { faker } from "@faker-js/faker";
import {
  Report,
  ReportError,
  SubmissionDetails,
} from "src/utils/api/submissionDetails";
import { FileSubmission } from "src/utils/api/fileSubmissions";
import mockSubmissions from "src/mocks/data/fileSubmissions";

const generateError = (stage: string, action: string): ReportError => {
  return {
    type: "validation",
    stage: stage,
    action: action,
    level: "Error",
    message: "There was a problem. Here's an actionable message",
  };
};

const getErrors = (
  submission: FileSubmission,
  stage: string,
  action: string
): ReportError[] => {
  if (submission.status == "failed") {
    const numOfErrors = faker.number.int({ min: 1, max: 3 });
    const errors: ReportError[] = [];
    for (let i = 0; i < numOfErrors; i++) {
      errors.push(generateError(stage, action));
    }
    return errors;
  }
  return [];
};

const generateReport = (
  submission: FileSubmission,
  stage: string,
  action: string
): Report => {
  const getType = () => {
    switch (submission.status) {
      case "failed":
        return "failure";
      case "processing":
        return "pending";
      case "completed":
        return "success";
      default:
        return "success";
    }
  };
  const getMessage = () => {
    switch (submission.status) {
      case "failure":
        return "There was an issue with this report.";
      case "processing":
        return "The report is pending.";
      case "completed":
        return "Successfully completed this stage.";
      default:
        return "";
    }
  };

  return {
    stage: stage,
    action: action,
    schema_name: "0.0.1",
    version: "version 1",
    data_stream_id: submission.data_stream_id,
    data_stream_route: submission.data_stream_route,
    jurisdiction: faker.location.state({ abbreviated: true }),
    transport_id: submission.upload_id,
    parent_id: faker.string.uuid(),
    message_id: faker.string.uuid(),
    type: getType(),
    timestamp_complete: submission.timestamp,
    message: getMessage(),
    errors: getErrors(submission, stage, action),
  };
};

const getReports = (
  submission: FileSubmission,
  stage: string,
  action: string
): Report[] => {
  const numOfReports = faker.number.int({ min: 1, max: 3 });
  const reports: Report[] = [];
  for (let i = 0; i < numOfReports; i++) {
    reports.push(generateReport(submission, stage, action));
  }
  return reports;
};

const generateSubmissionDetails = (
  submission: FileSubmission
): SubmissionDetails => {
  const route = submission.data_stream_route;
  const stage = route == "hl7" ? "dex-hl7" : "dex-upload";
  const action = stage == "dex-hl7" ? "validation" : "metadata-validation";

  const details: SubmissionDetails = {
    status: submission.status,
    current_stage: stage,
    current_action: action,
    file_name: submission.filename,
    transport_id: submission.upload_id,
    timestamp: submission.timestamp,
    data_stream_id: submission.data_stream_id,
    data_stream_route: submission.data_stream_route,
    reports: getReports(submission, stage, action),
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
    (el: SubmissionDetails) => el.transport_id == upload_id
  );
};

export default getMockDetails;
