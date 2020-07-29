import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

export default function SLPieChart(props) {
  const colors = ["#002984", "#757de8"];
  return (
    <PieChart width={300} height={250}>
      <Pie
        data={props.data}
        dataKey="y"
        nameKey="x"
        cx="50%"
        cy="50%"
        outerRadius={110}
        label
      >
        {props.data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index]} />
        ))}
      </Pie>
      <Legend />
    </PieChart>
  );
}
