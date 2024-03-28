export interface StatusDisplayValues {
  pillColor: string;
  color: string;
  label: string;
}

type StatusDisplayValuesMap = {
  [key: string]: StatusDisplayValues;
};

const defaultComputedValue: StatusDisplayValues = {
  pillColor: "info",
  color: "#F5F5F5",
  label: "unknown",
};

const computedStatusValues: StatusDisplayValuesMap = {
  completed: {
    pillColor: "success",
    color: "#84BC49",
    label: "Completed",
  },
  failed: {
    pillColor: "error",
    color: "#E57373",
    label: "Failed",
  },
  processing: {
    pillColor: "busy",
    color: "#88C3EA",
    label: "Processing",
  },
};

export function getStatusDisplayValuesById(id: string): StatusDisplayValues {
  return computedStatusValues[id] || defaultComputedValue;
}

export default getStatusDisplayValuesById;
