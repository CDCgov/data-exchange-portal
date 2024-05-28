import { Icons } from "@us-gov-cdc/cdc-react-icons";

export interface StatusDisplayValues {
  pillColor: string;
  pillIcon: JSX.Element;
  color: string;
  label: string;
}

type StatusDisplayValuesMap = {
  [key: string]: StatusDisplayValues;
};

const defaultComputedValue: StatusDisplayValues = {
  pillColor: "info",
  pillIcon: <></>,
  color: "#F5F5F5",
  label: "unknown",
};

const computedStatusValues: StatusDisplayValuesMap = {
  completed: {
    pillColor: "success",
    pillIcon: <Icons.PillCircle />,
    color: "#84BC49",
    label: "Completed",
  },
  failed: {
    pillColor: "error",
    pillIcon: <Icons.PillSquare />,
    color: "#E57373",
    label: "Failed",
  },
  processing: {
    pillColor: "busy",
    pillIcon: <Icons.PillTriangle />,
    color: "#88C3EA",
    label: "Processing",
  },
};

export function getStatusDisplayValuesById(id: string): StatusDisplayValues {
  switch (id) {
    case "uploading":
      return computedStatusValues.processing;
    case "failed":
      return computedStatusValues.failed;
    case "uploaded":
      return computedStatusValues.completed;
    default:
      return defaultComputedValue;
  }
}

export function getStatusDisplayValuesByName(
  status: string
): StatusDisplayValues {
  switch (status) {
    case "Uploading":
      return computedStatusValues.processing;
    case "FailedMetadata":
      return computedStatusValues.failed;
    case "UploadComplete":
      return computedStatusValues.completed;
    default:
      return defaultComputedValue;
  }
}
