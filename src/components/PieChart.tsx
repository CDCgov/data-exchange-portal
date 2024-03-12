import { useState } from "react";

import styles from "src/styles/PieChart.module.css";

import { Pie } from "@nivo/pie";

import { Pill } from "@us-gov-cdc/cdc-react";
import { Icons } from "@us-gov-cdc/cdc-react-icons";

interface PieData {
  id: string;
  label: string;
  value: number;
}

interface PropTypes {
  data: PieData[];
}

function PieChart({ data }: PropTypes) {
  // Todo: Determine types for dataWithArc, centerX, centerY, datum
  const CenteredMetric = ({ dataWithArc, centerX, centerY }: any) => {
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
            fontSize: "0.8rem",
            color: "#555",
          }}>
          Total Attempts
        </text>
        <text
          x={centerX}
          y={centerY + 10}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: "1.6rem",
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
            data={data}
            height={400}
            width={500}
            margin={{ top: 65, right: 80, bottom: 65, left: 80 }}
            innerRadius={0.75}
            padAngle={0.75}
            layers={["arcs", "arcLinkLabels", "legends", CenteredMetric]}
            startAngle={360}
            endAngle={0}
            enableArcLinkLabels={true}
            isInteractive={true}
            colors={{ scheme: "purples" }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "black",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "black",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: "upload_complete",
                },
                id: "lines",
              },
              {
                match: {
                  id: "uploading",
                },
                id: "dots",
              },
              {
                match: {
                  id: "failed_metadata",
                },
                id: "lines",
              },
              {
                match: {
                  id: "structural_validation",
                },
                id: "dots",
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
                {data.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <Pill label="Uploaded" />
                      </td>
                      <td>{item.value}</td>
                      <td>{item.label}</td>
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
