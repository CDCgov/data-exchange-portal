i mport { ReportCounts } from "src/utils/api/reportCounts";
r
import mockSubmissions from "src/mocks/data/fileSubmissions";
import { FileSubmissions, FileSubmission } from "src/utils/api/fileSubmissions";

export const generateCounts = (submissions: FileSubmissions): ReportCounts => {
  const total = submissions.summary.total_items;
  const completed = submissions.items.filter((el: FileSubmission) =>
    el.status.toLowerCase().includes("complete")
  );
  const failed = submissions.items.filter((el: FileSubmission) =>
    el.status.toLowerCase().includes("failed")
  );
  const processing = submissions.items.filter((el: FileSubmission) =>
    el.status.toLowerCase().includes("uploading")
  );

  return {
    total_counts: total,
    status_counts: {
      uploaded: {
        counts: completed.length,
      },
      failed: {
        counts: failed.length,
        reasons: {},
      },
      uploading: {
        counts: processing.length,
      },
    },
  };
};

interface MockCounts {
  aimsCsv: ReportCounts;
  aimsHl7: ReportCounts;
  aimsAll: ReportCounts;
  daartHl7: ReportCounts;
}

const reportCounts: MockCounts = {
  aimsCsv: generateCounts(mockSubmissions.aimsCsv),
  aimsHl7: generateCounts(mockSubmissions.aimsHl7),
  aimsAll: generateCounts(mockSubmissions.aimsAll),
  daartHl7: generateCounts(mockSubmissions.daartHl7),
};

export default reportCounts;
