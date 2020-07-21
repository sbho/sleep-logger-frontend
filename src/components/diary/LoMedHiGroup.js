import React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

export default function LoMedHiGroup(props) {
  return (
    <ToggleButtonGroup
      value={props.toggling}
      exclusive
      onChange={props.onChange}
    >
      <ToggleButton value={0}>None</ToggleButton>
      <ToggleButton value={1}>Low</ToggleButton>
      <ToggleButton value={2}>Medium</ToggleButton>
      <ToggleButton value={3}>High</ToggleButton>
    </ToggleButtonGroup>
  );
}
