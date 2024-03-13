import { useState } from "react";

import styles from "src/styles/PieChart.module.css";

import { Pie } from "@nivo/pie";
import { patternSquaresDef } from "@nivo/core";

import { Pill } from "@us-gov-cdc/cdc-react";
import { Icons } from "@us-gov-cdc/cdc-react-icons";

interface PieData {
  id: string;
  label: string;
  value: number;
  color?: string;
  type?: string;
}

interface PropTypes {
  data: PieData[];
}

interface Map {
  [key: string]: {
    color: string | undefined;
    type: string | undefined;
  };
}

const computedStatusValues: Map = {
  upload_complete: { color: "#84BC49", type: "success" },
  uploading: { color: "#88C3EA", type: "busy" },
  failed_metadata: { color: "#E57373", type: "error" },
  structural_validation: { color: "#E57373", type: "error" },
};

function PieChart({ data }: PropTypes) {
  // Todo: Need to determine a way to get total so we can compute percents correctly
  const totalAttempts = 98;

  const dataWithComputedValues = data.map((item) => {
    return {
      ...item,
      color: computedStatusValues[item.id].color,
      type: computedStatusValues[item.id].type,
      percent: ((item.value / totalAttempts) * 100).toFixed(1),
    };
  });

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
            data={dataWithComputedValues}
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
            colors={{ datum: "data.color" }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "white",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "white",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
              patternSquaresDef("squares", {
                background: "inherit",
                color: "white",
                size: 3,
                padding: 1,
                stagger: true,
              }),
            ]}
            fill={[
              {
                match: {
                  id: "upload_complete",
                },
                id: "solid",
              },
              {
                match: {
                  id: "uploading",
                },
                id: "solid",
              },
              {
                match: {
                  id: "failed_metadata",
                },
                id: "solid",
              },
              {
                match: {
                  id: "structural_validation",
                },
                id: "solid",
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
                {dataWithComputedValues.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <Pill label={item.label} color={item.type} />
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
