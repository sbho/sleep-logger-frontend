import React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

export default function SmileyGroup(props) {
  return (
    <ToggleButtonGroup
      value={props.toggling}
      exclusive
      onChange={props.onChange}
    >
      <ToggleButton value={0}>🙁</ToggleButton>
      <ToggleButton value={1}>😐</ToggleButton>
      <ToggleButton value={2}>😁</ToggleButton>
    </ToggleButtonGroup>
  );
}
