import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core/";
import SmileyGroup from "./SmileyGroup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TimePicker from "./TimePicker";
import Snackbar from "@material-ui/core/Snackbar";

export default function DiaryMorningPage(props) {
  const textFieldTimeToISOString = (textFieldTime) => {
    const date = textFieldTimeToDate(textFieldTime);
    if (date === undefined) {
      return "";
    } else {
      return date.toISOString();
    }
  };

  const textFieldTimeToDate = (textFieldTime) => {
    if (textFieldTime === "") return;
    const timeArray = textFieldTime.split(":");
    const hr = parseInt(timeArray[0]);
    const mm = parseInt(timeArray[1]);
    const now = new Date();
    //If the hour is PM, use previous day's date.
    const date = new Date(
      now.getFullYear(),
      now.getMonth(),
      hr >= 12 ? now.getDate() - 1 : now.getDate(),
      hr,
      mm,
      0,
      0
    );
    return date;
  };

  const [bedTime, setBedTime] = useState(textFieldTimeToISOString("07:30"));
  const [wakeUpTime, setWakeUpTime] = useState(
    textFieldTimeToISOString("07:30")
  );
  const [easeOfSleep, setEaseOfSleep] = useState(0);
  const [morningFeeling, setMorningFeeling] = useState(0);
  const [wrongHoursSnackbarOpen, setWrongHoursSnackbarOpen] = useState(false);
  const [saveEntrySnackbarOpen, setSaveEntrySnackbarOpen] = useState(false);

  const handleBedTimeChange = (e) => {
    setBedTime(textFieldTimeToISOString(e.target.value));
  };

  const handleWakeUpTimeChange = (e) => {
    setWakeUpTime(textFieldTimeToISOString(e.target.value));
  };

  const handleEaseOfSleepChange = (e, newToggling) => {
    setEaseOfSleep(newToggling);
  };

  const handleMorningFeelingChange = (e, newToggling) => {
    setMorningFeeling(newToggling);
  };

  const handleSubmit = (e) => {
    const MS_PER_HR = 60 * 60 * 1000;
    const hoursOfSleep = (new Date(wakeUpTime) - new Date(bedTime)) / MS_PER_HR;

    const BASE_URL = "https://sleep-logger-dev.herokuapp.com";
    const body = {
      morning_entry: {
        bed_time: bedTime,
        wake_up_time: wakeUpTime,
        ease_of_sleep: easeOfSleep,
        hours_of_sleep: hoursOfSleep,
        morning_feeling: morningFeeling,
      },
    };

    const headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    if (hoursOfSleep > 0) {
      fetch(BASE_URL + "/v1/morning_entries", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }).then(setSaveEntrySnackbarOpen(true));
    } else {
      setWrongHoursSnackbarOpen(true);
    }
  };

  return (
    <div>
      <Grid container spacing={10}>
        <Grid container item xs={"6"}>
          <Typography variant={"h6"}>When did you sleep last night?</Typography>
        </Grid>
        <Grid container item xs={"6"}>
          <TimePicker onChange={handleBedTimeChange} />
        </Grid>
      </Grid>

      <Grid container spacing={10}>
        <Grid container item xs={"6"}>
          <Typography variant={"h6"}>When did you wake up?</Typography>
        </Grid>
        <Grid container item xs={"6"}>
          <TimePicker onChange={handleWakeUpTimeChange} />
        </Grid>
      </Grid>

      <Grid container spacing={10}>
        <Grid container item xs={"6"}>
          <Typography variant={"h6"}>Was it easy for you to sleep?</Typography>
        </Grid>
        <Grid container item xs={"6"}>
          <SmileyGroup
            toggling={easeOfSleep}
            onChange={handleEaseOfSleepChange}
          />
        </Grid>
      </Grid>

      <Grid container spacing={10}>
        <Grid container item xs={"6"}>
          <Typography variant={"h6"}>
            How do you feel when you wake up?
          </Typography>
        </Grid>
        <Grid container item xs={"6"}>
          <SmileyGroup
            toggling={morningFeeling}
            onChange={handleMorningFeelingChange}
          />
        </Grid>
      </Grid>

      <Box p={3} align={"center"}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Box>
      <Snackbar
        open={saveEntrySnackbarOpen}
        autoHideDuration={3000}
        message={"Entry saved."}
      />
      <Snackbar
        open={wrongHoursSnackbarOpen}
        autoHideDuration={3000}
        message={"Wrong sleeping hours."}
      />
    </div>
  );
}
