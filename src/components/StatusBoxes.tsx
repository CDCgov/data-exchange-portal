import styles from "src/styles/StatusBoxes.module.css";

import { Pill } from "@us-gov-cdc/cdc-react";

import { ReportCounts } from "src/utils/api/reportCounts";

import getStatusDisplayValuesById from "src/utils/helperFunctions/statusDisplayValues";

interface StatusBoxData {
  id: string;
  pillColor: string;
  label: string;
  value: number;
}

interface PropTypes {
  data: ReportCounts;
}

function PieChart({ data }: PropTypes) {
  const { status_counts } = data;

  const statusCountsArray = Object.entries(status_counts).map(
    ([id, { counts }]) => ({
      id,
      count: counts || 0,
    })
  );

  statusCountsArray.sort((a, b) => b.count - a.count);

  const statusBoxData: StatusBoxData[] = statusCountsArray.map((item) => {
    const { pillColor, label } = getStatusDisplayValuesById(item.id);
    return {
      id: item.id,
      pillColor,
      label,
      value: item.count,
    };
  });

  return (
    <div className={styles["status-boxes-container"]}>
      {statusBoxData.map((item) => {
        return (
          <div key={item.id} className={styles["status-boxes-box"]}>
            <Pill label={item.label} color={item.pillColor} />
            {/* Todo: need to figure out the a11y/semantics of the value. */}
            <div className={styles["status-boxes-box-value"]}>{item.value}</div>
          </div>
        );
      })}
    </div>
  );
}

export default PieChart;
