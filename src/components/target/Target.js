import React, { useState } from "react";
import AddToCalendar from "react-add-to-calendar";
import LoggedInNavBar from "../nav/LoggedInNavBar";
import Typography from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TimePicker from "../diary/TimePicker";
import Card from "@material-ui/core/Card";

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

      <table width={"100%"}>
        <tr>
          <td align={"center"}>
            <Box width={300} p={"5%"}>
              <Card>
                <Box p={"5%"}>
                  <Typography variant={"h5"}>
                    Today I want to sleep at:
                  </Typography>
                </Box>
                <Box p={"5%"}>
                  <TimePicker onChange={handleSleepTimeChange} />
                </Box>
                <Box p={"5%"}>
                  <Button variant="contained">
                    <AddToCalendar event={event} />
                  </Button>
                </Box>
              </Card>
            </Box>
          </td>
        </tr>
      </table>
    </div>
  );
}
