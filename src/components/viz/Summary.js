import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import LoggedInNavBar from "../nav/LoggedInNavBar";
import Typography from "@material-ui/core/Typography";
import SmileyGroup from "../diary/SmileyGroup";
import SLLineChart from "./SLLineChart";
import SLBarChart from "./SLBarChart";
import SLPieChart from "./SLPieChart";

export default class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      morningFeeling: 0,
      hoursData: [],
      caffeineMorningData: [],
      caffeineAfternoon: [],
      caffeineEvening: [],
      napMorning: [],
      napAfternoon: [],
      napEvening: [],
    };
  }

  handleMorningFeelingChange = (e, newToggling) => {
    this.setState({ morningFeeling: newToggling });
  };

  toLoMedHiXYData = (data, fieldName) => {
    let XYData = [];
    data[fieldName].forEach((k) =>
      XYData.push({
        x:
          k[fieldName] === 0
            ? "None"
            : k[fieldName] === 1
            ? "Low"
            : k[fieldName] === 2
            ? "Medium"
            : "High",
        y: k.count,
      })
    );
    const loMedHi = ["None", "Low", "Medium", "High"];
    return XYData.sort((a, b) => loMedHi.indexOf(a.x) >= loMedHi.indexOf(b.x));
  };

  toXYData = (data, fieldName) => {
    let XYData = [];
    data[fieldName].forEach((k) =>
      XYData.push({
        x: k[fieldName],
        y: k.count,
      })
    );
    return XYData.sort((a, b) => a.x >= b.x);
  };

  toTrueFalsePieData = (data, fieldName) => {
    let XYData = [];
    data[fieldName].forEach((k) =>
      XYData.push({ x: k[fieldName] ? "Yes" : "No", y: k.count })
    );
    return XYData.sort((a, b) => (a.x === "Yes" ? -1 : 1));
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
          caffeineMorning: this.toLoMedHiXYData(data, "caffeine_morning"),
          caffeineAfternoon: this.toLoMedHiXYData(data, "caffeine_afternoon"),
          caffeineEvening: this.toLoMedHiXYData(data, "caffeine_evening"),
          napMorning: this.toTrueFalsePieData(data, "nap_morning"),
          napAfternoon: this.toTrueFalsePieData(data, "nap_afternoon"),
          napEvening: this.toTrueFalsePieData(data, "nap_evening"),
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
          caffeineMorning: this.toLoMedHiXYData(data, "caffeine_morning"),
          caffeineAfternoon: this.toLoMedHiXYData(data, "caffeine_afternoon"),
          caffeineEvening: this.toLoMedHiXYData(data, "caffeine_evening"),
          napMorning: this.toTrueFalsePieData(data, "nap_morning"),
          napAfternoon: this.toTrueFalsePieData(data, "nap_afternoon"),
          napEvening: this.toTrueFalsePieData(data, "nap_evening"),
        });
      });
  }

  render() {
    return (
      <div>
        <LoggedInNavBar history={this.props.history} />
        <Box px={"20%"} align={"center"}>
          <Card>
            <Box p={"5%"}>
              <Typography variant={"h6"}>
                View days when you wake up feeling
              </Typography>
            </Box>
            <Box p={"5%"}>
              <SmileyGroup
                toggling={this.state.morningFeeling}
                onChange={this.handleMorningFeelingChange}
              />
            </Box>
            <Grid container item md={4} sm={6} xs={12}>
              <Typography variant={"h6"} display="inline">
                Hours of sleep
              </Typography>
              <SLLineChart
                data={this.state.hoursData.sort((a, b) => a.x - b.x)}
                XLabel={"Hours of sleep"}
              />
            </Grid>
            <Grid container item md={4} sm={6} xs={12}>
              <Typography variant={"h6"}>Caffeine morning</Typography>
              <SLBarChart
                data={this.state.caffeineMorning}
                XLabel={"Morning caffeine"}
              />
            </Grid>
            <Grid container item md={4} sm={6} xs={12}>
              <Typography variant={"h6"}>Caffeine afternoon</Typography>
              <SLBarChart
                data={this.state.caffeineAfternoon}
                XLabel={"Afternoon caffeine"}
              />
            </Grid>
            <Grid container item md={4} sm={6} xs={12}>
              <Typography variant={"h6"} display="inline">
                Caffeine evening the day before
              </Typography>
              <SLBarChart
                data={this.state.caffeineEvening}
                XLabel={"Evening caffeine"}
              />
            </Grid>
            <Grid container item md={4} sm={6} xs={12}>
              <Typography variant={"h6"} display="inline">
                Morning nap the day before
              </Typography>
              <SLPieChart data={this.state.napMorning} />
            </Grid>
            <Grid container item md={4} sm={6} xs={12}>
              <Typography variant={"h6"} display="inline">
                Afternoon nap the day before
              </Typography>
              <SLPieChart data={this.state.napAfternoon} />
            </Grid>
            <Grid container item md={4} sm={6} xs={12}>
              <Typography variant={"h6"} display="inline">
                Evening nap the day before
              </Typography>
              <SLPieChart data={this.state.napEvening} />
            </Grid>
          </Card>
        </Box>
      </div>
    );
  }
}
