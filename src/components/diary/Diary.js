import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { Hidden } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import DiaryEveningPage from "./DiaryEveningPage";
import DiaryMorningPage from "./DiaryMorningPage";
import TipBox from "./TipBox";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import LoggedInNavBar from "../nav/LoggedInNavBar";
import Snackbar from "@material-ui/core/Snackbar";

export default function Diary(props) {
  const [tabValue, setTabValue] = useState(0);
  const [tip, setTip] = useState({ id: 0, content: "" });
  const [date, setDate] = useState(new Date());
  const [saveTipSnackbarOpen, setSaveTipSnackbarOpen] = useState(false);

  useEffect(() => {
    const headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    fetch("https://sleep-logger-dev.herokuapp.com/v1/get_tips", {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => setTip(data));
  }, []);

  const handleTabsChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  const handleSave = () => {
    const BASE_URL = "https://sleep-logger-dev.herokuapp.com";
    const headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const path = "/v1/save_tip";
    const body = { id: tip.id };

    fetch(BASE_URL + path, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    }).then(setSaveTipSnackbarOpen);
  };

  return (
    <div>
      <LoggedInNavBar history={props.history} />
      <Paper square>
        <Tabs value={tabValue} onChange={handleTabsChange} centered>
          <Tab icon={<WbSunnyIcon />} label="Morning entry" {...a11yProps(0)} />
          <Tab
            icon={<NightsStayIcon />}
            label="Evening entry"
            {...a11yProps(1)}
          />
        </Tabs>
      </Paper>

      <Grid container spacing={8}>
        {/*Hide calendar and box on tablet and phone*/}
        <Hidden smDown>
          <Grid item xs={5} justify={{ "flex-start": "center" }}>
            <Box mx={"10%"} my={"5%"} width={"350px"}>
              <TipBox content={tip.content} onSave={handleSave} />
            </Box>
            <Box mx={"10%"} my={"5%"}>
              <Calendar onChange={(date) => setDate(date)} value={date} />
            </Box>
          </Grid>
        </Hidden>
        <Grid item sm={7}>
          <TimeOfDayTabPanel value={tabValue} index={0}>
            <Card>
              <Box p={"5%"}>
                <DiaryMorningPage />
              </Box>
            </Card>
          </TimeOfDayTabPanel>
          <TimeOfDayTabPanel value={tabValue} index={1}>
            <Card>
              <Box p={"5%"}>
                <DiaryEveningPage />
              </Box>
            </Card>
          </TimeOfDayTabPanel>
        </Grid>
      </Grid>
      <Snackbar
        open={saveTipSnackbarOpen}
        autoHideDuration={3000}
        message={"Tip saved."}
      />
    </div>
  );
}

//Cryptic dependency for tabs
function TimeOfDayTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
