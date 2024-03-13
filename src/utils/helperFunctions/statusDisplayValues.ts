interface StatusDisplayValues {
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
  upload_complete: {
    pillColor: "success",
    color: "#84BC49",
    label: "Upload Complete",
  },
  uploading: {
    pillColor: "busy",
    color: "#88C3EA",
    label: "Uploading",
  },
  failed_metadata: {
    pillColor: "error",
    color: "#E57373",
    label: "Failed Metadata",
  },
  structural_validation: {
    pillColor: "error",
    color: "#E57373",
    label: "Structural Validation",
  },
};

export function getStatusDisplayValuesById(id: string): StatusDisplayValues {
  return computedStatusValues[id] || defaultComputedValue;
}

export default getStatusDisplayValuesById;
