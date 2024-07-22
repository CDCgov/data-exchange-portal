import { faker } from "@faker-js/faker";
import {
  FileSubmissions,
  FileSubmission,
  FileSubmissionsSummary,
} from "src/utils/api/fileSubmissions";

const weightedStatuses = [
  "DELIVERED",
  "DELIVERED",
  "DELIVERED",
  "DELIVERED",
  "FAILED",
  "FAILED",
  "PROCESSING",
];

const jurisdictions = [
  "USA-AL",
  "USA-AL",
  "USA-AL",
  "USA-IN",
  "USA-MD",
  "USA-MD",
  "USA-MD",
  "USA-MD",
  "USA-MD",
  "USA-MD",
  "USA-MD",
  "USA-NE",
  "USA-SC",
  "USA-SC",
  "USA-SC",
  "USA-SC",
  "USA-WV",
  "USA-WY",
];

const createSentBy = () => {
  const prefix = [
    "PH",
    "ST",
    "ST",
    "ST",
    "LB",
    "CO",
    "CO",
    "CO",
    "CO",
    "CO",
    "CO",
    "CO",
    "HO",
    "PR",
  ];
  const randomPrefix = faker.helpers.arrayElement(prefix);

  return `${randomPrefix}-LA`;
};

const generateFileSubmission = (
  dataStream: string,
  route: string
): FileSubmission => {
  const status = faker.helpers.arrayElement(weightedStatuses);
  const jurisdiction = faker.helpers.arrayElement(jurisdictions);
  const submission: FileSubmission = {
    upload_id: faker.string.uuid(),
    filename: faker.system.commonFileName(route),
    status: status,
    timestamp: faker.date.recent({ days: 40 }).toISOString(),
    jurisdiction: jurisdiction,
    sender: createSentBy(),
    file_size_bytes: faker.number.int(),
    metadata: {
      data_stream_id: dataStream,
      data_stream_route: route,
    },
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
  pageSize: number,
  js: string[],
  senders: string[]
): FileSubmissionsSummary => {
  return {
    pageNumber: pageNumber,
    numberOfPages: Math.ceil(submissions.length / pageSize),
    pageSize: pageSize,
    totalItems: submissions.length,
    jurisdictions: js,
    senderIds: senders,
  };
};

const dateFilter = (
  submissions: FileSubmission[],
  startDate: string,
  endDate: string
): FileSubmission[] => {
  const newSubmissions: FileSubmission[] = submissions.filter(
    (el: FileSubmission) => {
      const date = new Date(el.timestamp);
      const startingDate = new Date(startDate);
      const endingDate = new Date(endDate);
      return date >= startingDate && date <= endingDate;
    }
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
  endDate: string,
  sortBy: string,
  sortOrder: string,
  pageNumber: number,
  pageSize: number,
  jurisdiction: string,
  senderId: string
): FileSubmissions => {
  const uniqueJurisdictions = Array.from(
    new Set(submissions.map((sub: FileSubmission) => sub.jurisdiction))
  );
  const uniqueSenders = Array.from(
    new Set(submissions.map((sub: FileSubmission) => sub.sender))
  );

  const dateFilteredItems = dateFilter(submissions, startDate, endDate);

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
    pageSize,
    uniqueJurisdictions,
    uniqueSenders
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
