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
  label: "UNKNOWN",
};

const computedStatusValues: StatusDisplayValuesMap = {
  delivered: {
    pillColor: "success",
    pillIcon: <Icons.PillCircle />,
    color: "#84BC49",
    label: "DELIVERED",
  },
  failed: {
    pillColor: "error",
    pillIcon: <Icons.PillSquare />,
    color: "#E57373",
    label: "FAILED",
  },
  processing: {
    pillColor: "busy",
    pillIcon: <Icons.PillTriangle />,
    color: "#88C3EA",
    label: "PROCESSING",
  },
};

export function getStatusDisplayValuesById(id: string): StatusDisplayValues {
  switch (id) {
    case "delivered":
      return computedStatusValues.delivered;
    case "failed":
      return computedStatusValues.failed;
    case "processing":
      return computedStatusValues.processing;
    default:
      return defaultComputedValue;
  }
}

export function getStatusDisplayValuesByName(
  status: string
): StatusDisplayValues {
  switch (status) {
    case "DELIVERED":
      return computedStatusValues.delivered;
    case "FAILED":
      return computedStatusValues.failed;
    case "PROCESSING":
      return computedStatusValues.processing;
    default:
      return defaultComputedValue;
  }
}
