import { ReportCounts } from "src/utils/api/reportCounts";

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
