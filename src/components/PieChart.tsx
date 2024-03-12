import React from "react";

import styles from "src/styles/PieChart.module.css";

import { Pie } from "@nivo/pie";

import { Card, Pill } from "@us-gov-cdc/cdc-react";

function PieChart({ data }) {
  const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
    let total = 0;
    dataWithArc.forEach((datum) => {
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
            width={460}
            margin={{ top: 40, right: 80, bottom: 80, left: 100 }}
            innerRadius={0.75}
            padAngle={0.7}
            cornerRadius={0}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            layers={[
              "arcs",
              "arcLabels",
              "arcLinkLabels",
              "legends",
              CenteredMetric,
            ]}
            enableArcLinkLabels={true}
            isInteractive={true}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsComponent={({ datum, label, style }) => (
              <div style={{ pointerEvents: "none" }}>
                <circle fill={style.textColor} cy={6} r={15} />
                <circle
                  fill="#ffffff"
                  stroke={datum.color}
                  strokeWidth={2}
                  r={16}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={style.textColor}
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                  }}>
                  Hey
                </text>
              </div>
            )}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
            }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: "ruby",
                },
                id: "dots",
              },
              {
                match: {
                  id: "c",
                },
                id: "dots",
              },
              {
                match: {
                  id: "go",
                },
                id: "dots",
              },
              {
                match: {
                  id: "python",
                },
                id: "dots",
              },
              {
                match: {
                  id: "scala",
                },
                id: "lines",
              },
              {
                match: {
                  id: "lisp",
                },
                id: "lines",
              },
              {
                match: {
                  id: "elixir",
                },
                id: "lines",
              },
              {
                match: {
                  id: "javascript",
                },
                id: "lines",
              },
            ]}
          />
          <div className={styles["pie-chart-legend"]}>
            <table className="Table">
              {/* Todo: Need to figure out Accessibility of tables without table heads */}
              {/* <thead>
                <tr>
                  <th>Color</th>
                  <th>ID</th>
                  <th>Value</th>
                  <th>Formatted Value</th>
                  <th>Label</th>
                </tr>
              </thead> */}
              <tbody>
                <tr key={123}>
                  <td>
                    <Pill label="Uploaded" />
                  </td>
                  <td>
                    <em>41</em>
                  </td>
                  <td>
                    <em>71.9%</em>
                  </td>
                  <td>...</td>
                </tr>
                <tr key={123}>
                  <td>
                    <Pill label="Uploaded" />
                  </td>
                  <td>
                    <em>41</em>
                  </td>
                  <td>
                    <em>71.9%</em>
                  </td>
                  <td>...</td>
                </tr>
                <tr key={123}>
                  <td>
                    <Pill label="Uploaded" />
                  </td>
                  <td>
                    <em>41</em>
                  </td>
                  <td>
                    <em>71.9%</em>
                  </td>
                  <td>...</td>
                </tr>
                <tr key={123}>
                  <td>
                    <Pill label="Uploaded" />
                  </td>
                  <td>
                    <em>41</em>
                  </td>
                  <td>
                    <em>71.9%</em>
                  </td>
                  <td>...</td>
                </tr>
                <tr key={123}>
                  <td>
                    <Pill label="Uploaded" />
                  </td>
                  <td>
                    <em>41</em>
                  </td>
                  <td>
                    <em>71.9%</em>
                  </td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PieChart;
