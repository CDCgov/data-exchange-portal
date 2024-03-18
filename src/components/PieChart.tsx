import styles from "src/styles/PieChart.module.css";

import { Pie } from "@nivo/pie";

import { Pill } from "@us-gov-cdc/cdc-react";
import { Icons } from "@us-gov-cdc/cdc-react-icons";
import { ReportCounts } from "src/utils/api/reportCounts";
import getStatusDisplayValuesById from "src/utils/helperFunctions/statusDisplayValues";

interface PieData {
  id: string;
  pillColor: string;
  color: string;
  label: string;
  percent: string;
  value: number;
}

interface PropTypes {
  data: ReportCounts;
}

function PieChart({ data }: PropTypes) {
  const { totalCounts, reportCounts } = data;

  reportCounts.sort((a, b) => b.count - a.count);

  const piechartData: PieData[] = reportCounts.map((item) => {
    const { pillColor, color, label } = getStatusDisplayValuesById(item.id);
    return {
      id: item.id,
      pillColor,
      color,
      label,
      percent: ((item.count / totalCounts) * 100).toFixed(1),
      value: item.count,
    };
  });

  // Todo: Determine types for dataWithArc, centerX, centerY, datum
  const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
    let total = 0;
    dataWithArc.forEach((datum: any) => {
      total += datum.value;
    });

    return (
      <>
        <text
          x={centerX}
          y={centerY - 20}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: "1rem",
            color: "#555",
          }}>
          Total Attempts
        </text>
        <text
          x={centerX}
          y={centerY + 15}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: "2rem",
            fontWeight: 600,
          }}>
          {`${total}`}
        </text>
      </>
    );
  };

  return (
    <div className={styles["pie-chart-container"]}>
      <div className={styles["pie-chart-body"]}>
        <h2 className={styles["pie-chart-header"]}>Submission Statuses</h2>
        <div className={styles["pie-chart-content"]}>
          <Pie
            data={piechartData}
            height={400}
            width={500}
            margin={{ top: 65, right: 80, bottom: 65, left: 80 }}
            innerRadius={0.75}
            padAngle={0.75}
            layers={["arcs", "legends", CenteredMetric]}
            startAngle={360}
            endAngle={0}
            enableArcLinkLabels={true}
            isInteractive={true}
            colors={{ datum: "data.color" }}
            defs={[
              {
                id: "dots-red",
                type: "patternDots",
                size: 5,
                padding: 10,
                stagger: false,
                background: "inherit",
                color: "#ac5755",
              },
              {
                id: "lines-green",
                type: "patternLines",
                spacing: 11,
                rotation: -145,
                lineWidth: 2,
                background: "inherit",
                color: "#638d37",
              },
              {
                id: "squares-blue",
                type: "patternSquares",
                size: 3,
                padding: 5,
                background: "inherit",
                color: "#6692af",
              },
            ]}
            fill={[
              {
                match: {
                  id: "upload_complete",
                },
                id: "lines-green",
              },
              {
                match: {
                  id: "uploading",
                },
                id: "squares-blue",
              },
              {
                match: {
                  id: "failed_metadata",
                },
                id: "dots-red",
              },
              {
                match: {
                  id: "structural_validation",
                },
                id: "dots-red",
              },
            ]}
          />
          <div className={styles["pie-chart-legend"]}>
            <table>
              {/* Todo: Need to figure out Accessibility of tables without table heads */}
              {/* <thead>
                <tr>
                  <th>Status</th>
                  <th>Count</th>
                  <th>Percent</th>
                  <th>Details</th>
                </tr>
              </thead> */}
              <tbody>
                {piechartData.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <Pill label={item.label} color={item.pillColor} />
                      </td>
                      <td>{item.value}</td>
                      <td>{item.percent}%</td>
                      <td>
                        <Icons.Dots />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PieChart;
