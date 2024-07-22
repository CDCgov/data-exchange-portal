import { ReportCounts } from "src/utils/api/reportCounts";

import { FileSubmissions, FileSubmission } from "src/utils/api/fileSubmissions";

export const generateCounts = (submissions: FileSubmissions): ReportCounts => {
  const total = submissions.summary.totalItems;
  const completed = submissions.items.filter(
    (el: FileSubmission) => el.status == "DELIVERED"
  );
  const failed = submissions.items.filter(
    (el: FileSubmission) => el.status == "FAILED"
  );
  const processing = submissions.items.filter(
    (el: FileSubmission) => el.status == "PROCESSING"
  );

  return {
    total_counts: total,
    status_counts: {
      delivered: {
        counts: completed.length,
      },
      failed: {
        counts: failed.length,
        reasons: {},
      },
      processing: {
        counts: processing.length,
      },
    },
  };
};
