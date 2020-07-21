import React from "react";
import {
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
  MarkSeries,
} from "react-vis";

export default function ScatterChart(props) {
  return (
    <XYPlot
      dontCheckIfEmpty
      width={200}
      height={200}
      xDomain={props.xDomain}
      yDomain={[0, 20]}
    >
      <XAxis />
      <YAxis />
      <HorizontalGridLines />
      <VerticalGridLines />
      <MarkSeries
        data={props.data}
        stroke="white"
        opacityType="category"
        opacity="0.2"
      />
    </XYPlot>
  );
}
