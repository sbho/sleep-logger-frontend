import React from "react";
import { RadialChart } from "react-vis";

export default function PieChart(props) {
  return <RadialChart data={props.data} width={200} height={200} />;
}
