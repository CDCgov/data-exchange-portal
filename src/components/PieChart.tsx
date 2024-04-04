import styles from "src/styles/PieChart.module.css";

import { Pie } from "@nivo/pie";

import { Pill } from "@us-gov-cdc/cdc-react";
import { Icons } from "@us-gov-cdc/cdc-react-icons";
import { ReportCounts } from "src/utils/api/reportCounts";
import getStatusDisplayValuesById from "src/utils/helperFunctions/statusDisplayValues";

interface PieData {
  id: string;
  pillColor: string;
  pillIcon: JSX.Element;
  color: string;
  label: string;
  percent: string;
  value: number;
}

interface PropTypes {
  data: ReportCounts;
}

interface CenteredMetricProps {
  centerX: number;
  centerY: number;
}

function PieChart({ data }: PropTypes) {
  const { total_counts, status_counts } = data;

  const statusCountsArray = Object.entries(status_counts).map(
    ([id, { counts, reasons }]) => ({
      id,
      count: counts,
      reasons, // include reasons for later use
    })
  );

  statusCountsArray.sort((a, b) => b.count - a.count);

  const piechartData: PieData[] = statusCountsArray.map((item) => {
    const { pillColor, pillIcon, color, label } = getStatusDisplayValuesById(
      item.id
    );
    return {
      id: item.id,
      pillColor,
      pillIcon,
      color,
      label,
      percent: ((item.count / total_counts || 0) * 100).toFixed(1),
      value: item.count,
    };
  });

  // Todo: Determine types for dataWithArc, centerX, centerY, datum
  const CenteredMetric = ({ centerX, centerY }: CenteredMetricProps) => {
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
          {`${total_counts || 0}`}
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
                stagger: false,
                background: "inherit",
                color: "#6692af",
              },
            ]}
            fill={[
              {
                match: {
                  id: "uploaded",
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
                  id: "failed",
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
                        <Pill
                          variation="info"
                          altText={item.label}
                          label={item.label}
                          color={item.pillColor}
                          icon={item.pillIcon}
                        />
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
