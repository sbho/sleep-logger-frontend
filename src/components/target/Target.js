import React, { useState } from "react";
import AddToCalendar from "react-add-to-calendar";
import LoggedInNavBar from "../nav/LoggedInNavBar";
import Typography from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TimePicker from "../diary/TimePicker";

export default function Target(props) {
  const [sleepTime, setSleepTime] = useState("07:30");

  const textFieldTimeToDate = (textFieldTime) => {
    if (textFieldTime === "") return;
    const timeArray = textFieldTime.split(":");
    const hr = parseInt(timeArray[0]);
    const mm = parseInt(timeArray[1]);
    const now = new Date();
    const date = new Date(
      now.getFullYear(),
      now.getMonth(),
      hr < 12 ? now.getDate() + 1 : now.getDate(), //If it is in the morning, should be the next day.
      hr,
      mm,
      0,
      0
    );
    return date.toISOString();
  };

  const handleSleepTimeChange = (e) => {
    setSleepTime(textFieldTimeToDate(e.target.value));
  };

  let event = {
    title: "Go to sleep.",
    description: "Go to sleep.",
    startTime: sleepTime,
    endTime: sleepTime,
  };

  return (
    <div>
      <LoggedInNavBar history={props.history} />
      <Box mx={"38%"} my={"5%"}>
        <Box p={"5%"}>
          <Typography variant="h2">Today I want to sleep at:</Typography>
          <TimePicker onChange={handleSleepTimeChange} />
        </Box>
        <Button variant="contained">
          <AddToCalendar event={event} />
        </Button>
      </Box>
    </div>
  );
}
