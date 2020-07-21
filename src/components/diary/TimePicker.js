import React from "react";
import TextField from "@material-ui/core/TextField";

export default function TimePicker(props) {
  return (
    <TextField
      id="time"
      type="time"
      defaultValue="07:30"
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 300, // 5 min
      }}
      onChange={props.onChange}
    />
  );
}
