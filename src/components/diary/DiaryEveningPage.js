import React from "react";
import LoMedHiGroup from "./LoMedHiGroup";
import { Grid, Typography, Checkbox } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";

export default class DiaryEveningPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caffeineMorning: 0,
      caffeineAfternoon: 0,
      caffeineEvening: 0,
      napMorning: false,
      napAfternnon: false,
      napEvening: false,
      saveEntrySnackbarOpen: false,
    };
  }

  handleCaffeineMorningChange = (e, newToggling) => {
    this.setState({ caffeineMorning: newToggling });
  };

  handleCaffeineAfternoonChange = (e, newToggling) => {
    this.setState({ caffeineAfternoon: newToggling });
  };

  handleCaffeineEveningChange = (e, newToggling) => {
    this.setState({ caffeineEvening: newToggling });
  };

  handleNapMorningChange = (e) => {
    this.setState({ napMorning: e.target.checked });
  };

  handleNapAfternoonChange = (e) => {
    this.setState({ napAfternoon: e.target.checked });
  };

  handleNapEveningChange = (e) => {
    this.setState({ napEvening: e.target.checked });
  };

  handleSubmit = (e) => {
    const st = this.state;
    const BASE_URL = "https://sleep-logger-dev.herokuapp.com";
    const body = {
      evening_entry: {
        caffeine_morning: st.caffeine_morning,
        caffeine_afternoon: st.caffeine_afternoon,
        caffeine_evening: st.caffeine_evening,
        nap_morning: st.nap_morning,
        nap_afternoon: st.nap_afternoon,
        nap_evening: st.nap_evening,
      },
    };

    const headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    fetch(BASE_URL + "/v1/evening_entries", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    }).then(this.setState({ saveEntrySnackbarOpen: true }));
  };

  render() {
    return (
      <div>
        <Grid container spacing={10}>
          <Grid container item>
            <Typography variant={"h5"}>
              How much caffeine did you take?
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={5}>
          <Grid container item xs={"3"}>
            <Typography variant={"h6"}>Morning:</Typography>
          </Grid>
          <Grid container item xs={"9"}>
            <LoMedHiGroup
              toggling={this.state.caffeineMorning}
              onChange={this.handleCaffeineMorningChange}
            />
          </Grid>
          <Grid container item xs={"3"}>
            <Typography variant={"h6"}>Afternoon:</Typography>
          </Grid>
          <Grid container item xs={"9"}>
            <LoMedHiGroup
              toggling={this.state.caffeineAfternoon}
              onChange={this.handleCaffeineAfternoonChange}
            />
          </Grid>
          <Grid container item xs={"3"}>
            <Typography variant={"h6"}>Evening:</Typography>
          </Grid>
          <Grid container item xs={"9"}>
            <LoMedHiGroup
              toggling={this.state.caffeineEvening}
              onChange={this.handleCaffeineEveningChange}
            />
          </Grid>
        </Grid>

        <Grid container spacing={10}>
          <Grid container item>
            <Typography variant={"h5"}>Did you nap in the </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={5}>
          <Grid container item xs={"3"}>
            <Typography variant={"h6"}>Morning?</Typography>
          </Grid>
          <Grid container item xs={"9"}>
            <Checkbox
              checked={this.state.napMorning}
              onChange={this.handleNapMorningChange}
            />
          </Grid>
          <Grid container item xs={"3"}>
            <Typography variant={"h6"}>Afternoon?</Typography>
          </Grid>
          <Grid container item xs={"9"}>
            <Checkbox
              checked={this.state.napAfternoon}
              onChange={this.handleNapAfternoonChange}
            />
          </Grid>
          <Grid container item xs={"3"}>
            <Typography variant={"h6"}>Evening?</Typography>
          </Grid>
          <Grid container item xs={"9"}>
            <Checkbox
              checked={this.state.napEvening}
              onChange={this.handleNapEveningChange}
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
