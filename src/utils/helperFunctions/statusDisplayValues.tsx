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
  return computedStatusValues[id] || defaultComputedValue;
}

export default getStatusDisplayValuesById;
