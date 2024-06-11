import { faker } from "@faker-js/faker";
import {
  FileSubmissions,
  FileSubmission,
  FileSubmissionsSummary,
} from "src/utils/api/fileSubmissions";

const weightedStatuses = [
  "UploadComplete",
  "UploadComplete",
  "UploadComplete",
  "UploadComplete",
  "FailedMetadata",
  "FailedMetadata",
  "Uploading",
];

const getIssues = (status: string, route: string): string[] => {
  if (status.toLowerCase().includes("failed")) {
    return route == "csv"
      ? [
          "Missing required metadata field, 'meta_field1'.",
          "Metadata field, 'meta_field2' is set to 'value3' and does not contain one of the allowed values: [ 'value1', value2' ]",
        ]
      : ["Hl7 Validation Error -- See validation report"];
  }

  return [];
};

const createSentBy = () => {
  const prefix = ["PH", "ST", "LB", "CO", "HO", "PR"];
  const randomPrefix = faker.helpers.arrayElement(prefix);

  return `${randomPrefix}-LA`;
};

const generateFileSubmission = (
  dataStream: string,
  route: string
): FileSubmission => {
  const status = faker.helpers.arrayElement(weightedStatuses);
  const submission: FileSubmission = {
    upload_id: faker.string.uuid(),
    filename: faker.system.commonFileName(route),
    status: status,
    timestamp: faker.date.recent({ days: 40 }).toISOString(),
    jurisdiction: `USA-${faker.location.state({ abbreviated: true })}`,
    sender: createSentBy(),
    metadata: {
      data_stream_id: dataStream,
      data_stream_route: route,
    },
    issues: getIssues(status, route),
  };
  return submission;
};

const generateSubmissions = (
  dataStream: string,
  route: string,
  amount: number = 10
): FileSubmission[] => {
  const items = [];
  for (let i = 0; i < amount; i++) {
    items.push(generateFileSubmission(dataStream, route));
  }
  return items;
};

const shuffleArray = (array: FileSubmission[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateSummary = (
  submissions: FileSubmission[],
  pageNumber: number,
  pageSize: number
) => {
  return {
    page_number: pageNumber,
    number_of_pages: Math.ceil(submissions.length / pageSize),
    page_size: pageSize,
    total_items: submissions.length,
  };
};

const dateFilter = (
  submissions: FileSubmission[],
  date: string
): FileSubmission[] => {
  const newSubmissions: FileSubmission[] = submissions.filter(
    (el: FileSubmission) => new Date(el.timestamp) > new Date(date)
  );
  return newSubmissions;
};

const sortSubmissions = (
  submissions: FileSubmission[],
  sortBy: string,
  sortOrder: string
): FileSubmission[] => {
  const itemCopies = JSON.parse(JSON.stringify(submissions));

  if (sortBy == "filename") {
    itemCopies.sort((a: FileSubmission, b: FileSubmission) => {
      const nameA = a.filename.toLowerCase();
      const nameB = b.filename.toLowerCase();

      if (nameA < nameB) {
        return sortOrder == "ascending" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrder == "ascending" ? 1 : -1;
      }
      return 0;
    });
  }
  if (sortBy == "jurisdiction") {
    itemCopies.sort((a: FileSubmission, b: FileSubmission) => {
      const nameA = a.jurisdiction.toLowerCase();
      const nameB = b.jurisdiction.toLowerCase();

      if (nameA < nameB) {
        return sortOrder == "ascending" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrder == "ascending" ? 1 : -1;
      }
      return 0;
    });
  }
  if (sortBy == "sender") {
    itemCopies.sort((a: FileSubmission, b: FileSubmission) => {
      const nameA = a.sender.toLowerCase();
      const nameB = b.sender.toLowerCase();

      if (nameA < nameB) {
        return sortOrder == "ascending" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrder == "ascending" ? 1 : -1;
      }
      return 0;
    });
  }
  if (sortBy == "status") {
    itemCopies.sort((a: FileSubmission, b: FileSubmission) => {
      const statusA = a.status.toLowerCase();
      const statusB = b.status.toLowerCase();

      if (statusA < statusB) {
        return sortOrder == "ascending" ? -1 : 1;
      }
      if (statusA > statusB) {
        return sortOrder == "ascending" ? 1 : -1;
      }
      return 0;
    });
  }
  if (sortBy == "timestamp") {
    itemCopies.sort((a: FileSubmission, b: FileSubmission) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);

      if (dateA < dateB) {
        return sortOrder == "ascending" ? -1 : 1;
      }
      if (dateA > dateB) {
        return sortOrder == "ascending" ? 1 : -1;
      }
      return 0;
    });
  }
  return itemCopies;
};

const submissionsItemsAimsCsv: FileSubmission[] = generateSubmissions(
  "aims-celr",
  "csv",
  105
);
const submissionsItemsAimsHl7: FileSubmission[] = generateSubmissions(
  "aims-celr",
  "hl7",
  86
);
const submissionsItemsDaartHl7: FileSubmission[] = generateSubmissions(
  "daart",
  "hl7",
  127
);
const submissionsItemsAimsAll: FileSubmission[] = shuffleArray([
  ...submissionsItemsAimsCsv,
  ...submissionsItemsAimsHl7,
]);

export const getSubmissions = (
  submissions: FileSubmission[],
  startDate: string,
  sortBy: string,
  sortOrder: string,
  pageNumber: number,
  pageSize: number,
  jurisdiction: string,
  senderId: string
): FileSubmissions => {
  const dateFilteredItems = dateFilter(submissions, startDate);

  const jurisdictionFilter = jurisdiction
    ? dateFilteredItems.filter(
        (el: FileSubmission) =>
          jurisdiction == "All" || el.jurisdiction == jurisdiction
      )
    : dateFilteredItems;

  const senderFilter = senderId
    ? jurisdictionFilter.filter(
        (el: FileSubmission) => senderId == "All" || el.sender == senderId
      )
    : jurisdictionFilter;

  const summary: FileSubmissionsSummary = generateSummary(
    senderFilter,
    pageNumber,
    pageSize
  );

  const sortedItems: FileSubmission[] = sortSubmissions(
    senderFilter,
    sortBy,
    sortOrder
  );

  const startItem: number = (pageNumber - 1) * pageSize;
  const endItem: number = pageNumber * pageSize;
  const pageData: FileSubmission[] = sortedItems.slice(startItem, endItem);

  return {
    summary,
    items: pageData,
  };
};

interface MockSubmissions {
  aimsCsv: FileSubmission[];
  aimsHl7: FileSubmission[];
  aimsAll: FileSubmission[];
  daartHl7: FileSubmission[];
}

const mockSubmissions: MockSubmissions = {
  aimsCsv: submissionsItemsAimsCsv,
  aimsHl7: submissionsItemsAimsHl7,
  aimsAll: submissionsItemsAimsAll,
  daartHl7: submissionsItemsDaartHl7,
};

export default mockSubmissions;
