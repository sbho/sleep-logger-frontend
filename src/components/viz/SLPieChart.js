import React from "react";
import { PieChart, Pie, Legend } from "recharts";

export default function SLPieChart(props) {
  return (
    <PieChart width={300} height={250}>
      <Pie
        data={props.data}
        dataKey="y"
        nameKey="x"
        cx="50%"
        cy="50%"
        outerRadius={110}
        fill="#666"
        label
      />
      <Legend />
    </PieChart>
  );
}
