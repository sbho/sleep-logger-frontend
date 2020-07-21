import React from "react";
import { Grid, Typography } from "@material-ui/core/";
import SmileyGroup from "./SmileyGroup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TimePicker from "./TimePicker";
import Snackbar from "@material-ui/core/Snackbar";

export default class DiaryMorningPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bed_time: this.textFieldTimeToISOString("07:30"),
      wake_up_time: this.textFieldTimeToISOString("07:30"),
      ease_of_sleep: 0,
      hour_of_sleep: 0,
      morning_feeling: 0,
      saveEntrySnackbarOpen: false,
    };
  }

  textFieldTimeToISOString(textFieldTime) {
    const date = this.textFieldTimeToDate(textFieldTime);
    if (date === undefined) {
      return "";
    } else {
      return date.toISOString();
    }
  }

  textFieldTimeToDate(textFieldTime) {
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
  }

  handleBedTimeChange = (e) => {
    this.setState({ bed_time: this.textFieldTimeToISOString(e.target.value) });
  };

  handleWakeUpTimeChange = (e) => {
    this.setState({
      wake_up_time: this.textFieldTimeToISOString(e.target.value),
    });
  };

  handleEaseOfSleepChange = (e, newToggling) => {
    this.setState({ ease_of_sleep: newToggling });
  };

  handleMorningFeelingChange = (e, newToggling) => {
    this.setState({ morning_feeling: newToggling });
  };

  handleSubmit = (e) => {
    const st = this.state;
    const MS_PER_HR = 60 * 60 * 1000;
    const hoursOfSleep =
      (new Date(st.wake_up_time) - new Date(st.bed_time)) / MS_PER_HR;

    const BASE_URL = "https://sleep-logger-dev.herokuapp.com";
    const body = {
      morning_entry: {
        bed_time: st.bed_time,
        wake_up_time: st.wake_up_time,
        ease_of_sleep: st.ease_of_sleep,
        hours_of_sleep: hoursOfSleep,
        morning_feeling: st.morning_feeling,
      },
    };

    const headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    fetch(BASE_URL + "/v1/morning_entries", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    }).then(this.setState({ saveEntrySnackbarOpen: true }));
  };

  render() {
    return (
      <div>
        <Grid container spacing={10}>
          <Grid container item xs={"6"}>
            <Typography variant={"h5"}>
              When did you sleep last night?
            </Typography>
          </Grid>
          <Grid container item xs={"6"}>
            <TimePicker onChange={this.handleBedTimeChange} />
          </Grid>
        </Grid>

        <Grid container spacing={10}>
          <Grid container item xs={"6"}>
            <Typography variant={"h5"}>When did you wake up?</Typography>
          </Grid>
          <Grid container item xs={"6"}>
            <TimePicker onChange={this.handleWakeUpTimeChange} />
          </Grid>
        </Grid>

        <Grid container spacing={10}>
          <Grid container item xs={"6"}>
            <Typography variant={"h5"}>
              Was it easy for you to sleep?
            </Typography>
          </Grid>
          <Grid container item xs={"6"}>
            <SmileyGroup
              toggling={this.state.ease_of_sleep}
              onChange={this.handleEaseOfSleepChange}
            />
          </Grid>
        </Grid>

        <Grid container spacing={10}>
          <Grid container item xs={"6"}>
            <Typography variant={"h5"}>
              How do you feel when you wake up?
            </Typography>
          </Grid>
          <Grid container item xs={"6"}>
            <SmileyGroup
              toggling={this.state.morning_feeling}
              onChange={this.handleMorningFeelingChange}
            />
          </Grid>
        </Grid>

        <Box p={3} align={"center"}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
            onClick={this.handleSubmit}
          >
            Save
          </Button>
        </Box>
        <Snackbar
          open={this.state.saveEntrySnackbarOpen}
          autoHideDuration={3000}
          message={"Entry saved."}
        />
      </div>
    );
  }
}
