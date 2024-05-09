import { faker } from "@faker-js/faker";
import {
  FileSubmissions,
  FileSubmission,
  FileSubmissionsSummary,
} from "src/utils/api/fileSubmissions";

const weightedStatuses = [
  "completed",
  "completed",
  "completed",
  "completed",
  "failed",
  "failed",
  "processing",
];

const defaultSummary: FileSubmissionsSummary = {
  number_of_pages: 1,
  page_number: 1,
  page_size: 10,
  total_items: 10,
};

const generateFileSubmission = (
  dataStream: string,
  route: string
): FileSubmission => {
  const submission: FileSubmission = {
    upload_id: faker.string.uuid(),
    filename: faker.system.commonFileName(route),
    status: faker.helpers.arrayElement(weightedStatuses),
    timestamp: faker.date.recent({ days: 40 }).toISOString(),
    metadata: [
      { key: "data_stream_id", value: dataStream },
      { key: "data_stream_route", value: route },
    ],
  };
  return submission;
};

const generateSubmissions = (
  dataStream: string,
  route: string,
  amount: number = 10
): FileSubmissions => {
  const items = [];
  for (let i = 0; i < amount; i++) {
    items.push(generateFileSubmission(dataStream, route));
  }

  return {
    summary: defaultSummary,
    items,
  };
};

function shuffleArray(array: FileSubmission[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const submissionsAimsCsv: FileSubmissions = generateSubmissions(
  "aims-celr",
  "csv"
);
export const submissionsAimsHl7: FileSubmissions = generateSubmissions(
  "aims-celr",
  "hl7"
);
export const submissionsDaartHl7: FileSubmissions = generateSubmissions(
  "daart",
  "hl7"
);
export const submissionsAimsAll: FileSubmissions = {
  summary: {
    number_of_pages: 2,
    page_number: 1,
    page_size: 10,
    total_items: 20,
  },
  items: shuffleArray([
    ...submissionsAimsCsv.items,
    ...submissionsAimsHl7.items,
  ]),
};

export const dateFilter = (
  submissions: FileSubmissions,
  date: string
): FileSubmissions => {
  const newSubmissions: FileSubmissions = JSON.parse(
    JSON.stringify(submissions)
  );

  newSubmissions.items = submissions.items.filter(
    (el: FileSubmission) => new Date(el.timestamp) > new Date(date)
  );

  return newSubmissions;
};

interface MockSubmissions {
  aimsCsv: FileSubmissions;
  aimsHl7: FileSubmissions;
  aimsAll: FileSubmissions;
  daartHl7: FileSubmissions;
}

const mockSubmissions: MockSubmissions = {
  aimsCsv: submissionsAimsCsv,
  aimsHl7: submissionsAimsHl7,
  aimsAll: submissionsAimsAll,
  daartHl7: submissionsDaartHl7,
};

export default mockSubmissions;
