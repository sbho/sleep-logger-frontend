import React, { useState } from "react";
import ScatterChart from "./ScatterChart";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LoggedInNavBar from "../nav/LoggedInNavBar";
import Typography from "@material-ui/core/Typography";
import SmileyGroup from "../diary/SmileyGroup";

export default class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      morningFeeling: 0,
      hoursData: [],
      caffeineMorningData: [],
      caffeineAfternoon: [],
      caffeineEvening: [],
    };
  }

  handleMorningFeelingChange = (e, newToggling) => {
    this.setState({ morningFeeling: newToggling });
  };

  toXYData = (data, fieldName) => {
    let XYData = [];
    data[fieldName].forEach((k) =>
      XYData.push({ x: k[fieldName], y: k.count })
    );
    return XYData;
  };

  componentDidMount() {
    const BASE_URL = "https://sleep-logger-dev.herokuapp.com";
    const headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    let url = new URL(BASE_URL + "/v1/graphing");

    const params = {
      morning_feeling: this.state.morningFeeling,
    };

    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          hoursData: this.toXYData(data, "hours"),
          caffeineMorning: this.toXYData(data, "caffeine_morning"),
          caffeineAfternoon: this.toXYData(data, "caffeine_morning"),
          caffeineEvening: this.toXYData(data, "caffeine_evening"),
        });
      });
  }

  componentDidUpdate() {
    const BASE_URL = "https://sleep-logger-dev.herokuapp.com";
    const headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    let url = new URL(BASE_URL + "/v1/graphing");

    const params = {
      morning_feeling: this.state.morningFeeling,
    };

    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          hoursData: this.toXYData(data, "hours"),
          caffeineMorning: this.toXYData(data, "caffeine_morning"),
          caffeineAfternoon: this.toXYData(data, "caffeine_morning"),
          caffeineEvening: this.toXYData(data, "caffeine_evening"),
        });
      });
  }

  render() {
    const myData = [{ angle: 1 }, { angle: 5 }, { angle: 2 }];

    return (
      <div>
        <LoggedInNavBar history={this.props.history} />
        <Box p={"5%"}>
          <Grid container spacing={5}>
            <Grid item xs={4}>
              {/*empty*/}
            </Grid>
            <Grid container item xs={4} justify="center">
              <Typography variant={"h5"}>
                View days when you wake up feeling
              </Typography>
              <SmileyGroup
                toggling={this.state.morningFeeling}
                onChange={this.handleMorningFeelingChange}
              />
            </Grid>
            <Grid container item xs={4}>
              {/*empty*/}
            </Grid>
            <Grid container item sm={3}>
              <Box p={"5%"}>
                <ScatterChart data={this.state.hoursData} xDomain={[0, 9]} />
              </Box>
              <Typography variant={"h5"} display="inline">
                Hours of sleep
              </Typography>
            </Grid>
            <Grid container item sm={3}>
              <Box p={"5%"}>
                <ScatterChart
                  data={this.state.caffeineMorningData}
                  xDomain={[0, 4]}
                />
              </Box>
              <Typography variant={"h5"}>Caffeine morning</Typography>
            </Grid>
            <Grid container item sm={3}>
              <Box p={"5%"}>
                <ScatterChart
                  data={this.state.caffeineAfternoonData}
                  xDomain={[0, 4]}
                />
              </Box>
              <Typography variant={"h5"}>Caffeine afternoon</Typography>
            </Grid>
            <Grid container item sm={3}>
              <Box p={"5%"}>
                <ScatterChart
                  data={this.state.caffeineEveningData}
                  xDomain={[0, 4]}
                />
              </Box>
              <Typography variant={"h5"} display="inline">
                Caffeine evening
              </Typography>
            </Grid>
            {/*<PieChart data={myData} />*/}
          </Grid>
        </Box>
      </div>
    );
  }
}
