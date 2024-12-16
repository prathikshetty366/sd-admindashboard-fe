import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

const CustomBarChart = ({
  data,
  xDataKey,
  datasets,
  colors,
  chartTitle,
  xAxisLabel,
  yAxisLabel,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  // Ensuring the chart is only rendered after component has mounted on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If not mounted, render nothing to avoid SSR mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <div className="chart-container">
      {chartTitle && (
        <h3 className="text-left font-bold text-[24px] mb-4">{chartTitle}</h3>
      )}

      <div
        style={{
          width: "1000px", // Make sure it spans 100% width of its container
          overflowX: "auto", // Enable horizontal scrolling inside the container
          overflowY: "hidden", // Prevent vertical scrolling
          whiteSpace: "nowrap", // Prevent wrapping of bars
        }}
      >
        <BarChart
          data={data}
          width={data.length * 300} // Dynamically set the width based on the number of data points
          height={400}
          style={{
            display: "inline-block", // Display bars in a horizontal line for scrolling
            minWidth: "100%", // Prevent shrinking of the BarChart component
            maxWidth: "none", // Ensure the width can expand beyond 100%
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xDataKey}
            label={{
              value: xAxisLabel,
              position: "insideBottomRight",
              offset: 0,
            }}
            tickMargin={10}
            angle={-45} // Rotate X Axis labels for better visibility
          />
          <YAxis
            label={{ value: yAxisLabel, angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          {datasets.map((dataset, index) => (
            <Bar
              key={dataset.yDataKey}
              dataKey={dataset.yDataKey}
              fill={colors[index]}
              name={dataset.label}
            >
              <LabelList position="top" />
            </Bar>
          ))}
        </BarChart>
      </div>
    </div>
  );
};

export default CustomBarChart;
