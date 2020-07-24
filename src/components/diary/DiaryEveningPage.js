import React, { useState, useEffect } from "react";
import LoMedHiGroup from "./LoMedHiGroup";
import { Grid, Typography, Checkbox } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";

export default function DiaryEveningPage(props) {
  const [caffeineMorning, setCaffeineMorning] = useState(0);
  const [caffeineAfternoon, setCaffeineAfternoon] = useState(0);
  const [caffeineEvening, setCaffeineEvening] = useState(0);
  const [napMorning, setNapMorning] = useState(false);
  const [napAfternoon, setNapAfternoon] = useState(false);
  const [napEvening, setNapEvening] = useState(false);
  const [saveEntrySnackbarOpen, setSaveEntrySnackbarOpen] = useState(false);

  const handleCaffeineMorningChange = (e, newToggling) => {
    setCaffeineMorning(newToggling);
  };

  const handleCaffeineAfternoonChange = (e, newToggling) => {
    setCaffeineAfternoon(newToggling);
  };

  const handleCaffeineEveningChange = (e, newToggling) => {
    setCaffeineEvening(newToggling);
  };

  const handleNapMorningChange = (e) => {
    setNapMorning(e.target.checked);
  };

  const handleNapAfternoonChange = (e) => {
    setNapAfternoon(e.target.checked);
  };

  const handleNapEveningChange = (e) => {
    setNapEvening(e.target.checked);
  };

  const handleSubmit = (e) => {
    const BASE_URL = "https://sleep-logger-dev.herokuapp.com";
    const body = {
      evening_entry: {
        caffeine_morning: caffeineMorning,
        caffeine_afternoon: caffeineAfternoon,
        caffeine_evening: caffeineEvening,
        nap_morning: napMorning,
        nap_afternoon: napAfternoon,
        nap_evening: napEvening,
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
            toggling={caffeineMorning}
            onChange={handleCaffeineMorningChange}
          />
        </Grid>
        <Grid container item xs={"3"}>
          <Typography variant={"h6"}>Afternoon:</Typography>
        </Grid>
        <Grid container item xs={"9"}>
          <LoMedHiGroup
            toggling={caffeineAfternoon}
            onChange={handleCaffeineAfternoonChange}
          />
        </Grid>
        <Grid container item xs={"3"}>
          <Typography variant={"h6"}>Evening:</Typography>
        </Grid>
        <Grid container item xs={"9"}>
          <LoMedHiGroup
            toggling={caffeineEvening}
            onChange={handleCaffeineEveningChange}
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
            checked={napMorning}
            onChange={handleNapMorningChange}
            color="secondary"
          />
        </Grid>
        <Grid container item xs={"3"}>
          <Typography variant={"h6"}>Afternoon?</Typography>
        </Grid>
        <Grid container item xs={"9"}>
          <Checkbox
            checked={napAfternoon}
            onChange={handleNapAfternoonChange}
            color="secondary"
          />
        </Grid>
        <Grid container item xs={"3"}>
          <Typography variant={"h6"}>Evening?</Typography>
        </Grid>
        <Grid container item xs={"9"}>
          <Checkbox
            checked={napEvening}
            onChange={handleNapEveningChange}
            color="secondary"
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
    </div>
  );
}
