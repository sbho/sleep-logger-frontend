import React from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Label,
} from "recharts";

export default function SLLineChart(props) {
  return (
    <LineChart
      width={300}
      height={250}
      data={props.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x">
        <Label value="Hours" position={"bottom"} />
      </XAxis>
      <YAxis
        label={{
          value: "Number of Days",
          angle: -90,
          position: "insideLeft",
        }}
      ></YAxis>
      <Tooltip />
      <Line type="monotone" dataKey="y" stroke="#002984" />
    </LineChart>
  );
}
