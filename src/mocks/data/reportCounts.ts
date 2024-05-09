import { ReportCounts } from "src/utils/api/reportCounts";

const countsAimsCsv: ReportCounts = {
  total_counts: 57,
  status_counts: {
    completed: {
      counts: 40,
    },
    failed: {
      counts: 10,
      reasons: {},
    },
    processing: {
      counts: 7,
    },
  },
};

const countsAimsHl7: ReportCounts = {
  total_counts: 30,
  status_counts: {
    completed: {
      counts: 14,
    },
    failed: {
      counts: 8,
      reasons: {},
    },
    processing: {
      counts: 8,
    },
  },
};

const countsAimsAll: ReportCounts = {
  total_counts: 87,
  status_counts: {
    completed: {
      counts: 54,
    },
    failed: {
      counts: 18,
      reasons: {},
    },
    processing: {
      counts: 15,
    },
  },
};

const countsDaartHl7: ReportCounts = {
  total_counts: 75,
  status_counts: {
    completed: {
      counts: 55,
    },
    failed: {
      counts: 12,
      reasons: {},
    },
    processing: {
      counts: 8,
    },
  },
};

export const getDaysInThePast = (date: string) => {
  const today = new Date();
  const startDate = new Date(date);

  const diff = Math.abs(today.getTime() - startDate.getTime());

  const days = diff / (1000 * 60 * 60 * 24);

  return Math.floor(days);
};

export const reduceCounts = (counts: ReportCounts, daysInPast: number) => {
  let factor: number;

  if (daysInPast <= 1) {
    factor = 0.1;
  } else if (daysInPast <= 7) {
    factor = 0.25;
  } else if (daysInPast <= 15) {
    factor = 0.5;
  } else if (daysInPast <= 30) {
    factor = 0.75;
  } else {
    factor = 1;
  }

  const applyFactor = (count: number) => Math.floor(count * factor);

  const newCounts: ReportCounts = {
    total_counts: applyFactor(counts.total_counts),
    status_counts: {
      completed: { counts: applyFactor(counts.status_counts.completed.counts) },
      failed: {
        counts: applyFactor(counts.status_counts.failed.counts),
        reasons: {},
      },
      processing: {
        counts: applyFactor(counts.status_counts.processing.counts),
      },
    },
  };

  return newCounts;
};

interface MockCounts {
  aimsCsv: ReportCounts;
  aimsHl7: ReportCounts;
  aimsAll: ReportCounts;
  daartHl7: ReportCounts;
}

const reportCounts: MockCounts = {
  aimsCsv: countsAimsCsv,
  aimsHl7: countsAimsHl7,
  aimsAll: countsAimsAll,
  daartHl7: countsDaartHl7,
};

export default reportCounts;
