import React, { useEffect } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import NotesIcon from "@material-ui/icons/Notes";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import BarChartIcon from "@material-ui/icons/BarChart";
import "react-calendar/dist/Calendar.css";
import ReactPlayer from "react-player";
import HomeNavBar from "../nav/HomeNavBar";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { Hidden } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    h1: {
      color: "white",
    },
    h3: {
      color: "white",
    },
    h5: {
      color: "white",
    },
  },
  props: {
    MuiSvgIcon: {
      htmlColor: "white",
    },
  },
});

//Landing page
export default function Home() {
  return (
    <MuiThemeProvider theme={theme}>
      <HomeNavBar />
      <Box mx={"15%"} my={"5%"}>
        <Hero />
        <Feature />
      </Box>
    </MuiThemeProvider>
  );
}

function Hero() {
  return (
    <div>
      <Box p={"3%"} pb={"5%"} align={"center"}>
        <Box pb={3}>
          <Typography variant="h3">Your personal sleep diary.</Typography>
        </Box>
        <Box pb={3}>
          <Typography variant="h5">
            Understand yourself and regain control of your sleep, for what
            matters.
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/register"
        >
          Sign up for free!
        </Button>
      </Box>
    </div>
  );
}

function Feature() {
  return (
    <div>
      <Box p={"3%"} pb={"5%"} align={"center"}>
        <Typography variant={"h5"}>Features</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid container item md={6} sm={12}>
          <table width={"100%"}>
            <tr>
              <td width={"40%"} align={"center"}>
                <NotesIcon style={{ fontSize: 80 }} />
              </td>
              <td width={"60%"} align={"left"}>
                <Typography variant="h5">
                  Log your sleeps, naps, caffeine intake, and mood.{" "}
                </Typography>
              </td>
            </tr>
          </table>
        </Grid>
        <Grid container item md={6} sm={12}>
          <table width={"100%"}>
            <tr>
              <td width={"40%"} align={"center"}>
                <PhoneIphoneIcon style={{ fontSize: 80 }} />
              </td>
              <td width={"60%"} align={"left"}>
                <Typography variant="h5">Mobile app.</Typography>
              </td>
            </tr>
          </table>
        </Grid>
        <Grid container item md={6} sm={12}>
          <table width={"100%"}>
            <tr>
              <td width={"40%"} align={"center"}>
                <BarChartIcon style={{ fontSize: 80 }} />
              </td>
              <td width={"60%"} align={"left"}>
                <Typography variant="h5">Trends visualization.</Typography>
              </td>
            </tr>
          </table>
        </Grid>
        <Grid container item md={6} sm={12}>
          <table width={"100%"}>
            <tr>
              <td width={"40%"} align={"center"}>
                <TrackChangesIcon style={{ fontSize: 80 }} />
              </td>
              <td width={"60%"} align={"left"}>
                <Typography variant="h5">
                  Goal setting, integrated with calendar
                </Typography>
              </td>
            </tr>
          </table>
        </Grid>
        <Grid container item md={6} sm={12}>
          <table width={"100%"}>
            <tr>
              <td width={"40%"} align={"center"}>
                <DoneAllIcon style={{ fontSize: 80 }} />
              </td>
              <td width={"60%"} align={"left"}>
                <Typography variant="h5">Tips of the day.</Typography>
              </td>
            </tr>
          </table>
        </Grid>
      </Grid>
    </div>
  );
}
