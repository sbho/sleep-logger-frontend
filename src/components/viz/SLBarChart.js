import React from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";

export default function SLBarChart(props) {
  return (
    <BarChart width={300} height={250} data={props.data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" />
      <YAxis
        label={{
          value: "Number of Days",
          angle: -90,
          position: "insideLeft",
        }}
      />
      <Tooltip />
      <Bar dataKey="y" fill="#002984" />
    </BarChart>
  );
}
