import React, { useEffect } from "react";
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
import { Link, useHistory } from "react-router-dom";
import { Hidden } from "@material-ui/core";

//Landing page
export default function Home() {
  return (
    <div>
      <HomeNavBar />
      <Box mx={"15%"} my={"5%"}>
        <Hero />
        <Video />
        <Divider />
        <Feature />
      </Box>
    </div>
  );
}

function Hero() {
  return (
    <Box my={"10%"}>
      <table>
        <tr>
          <td colSpan="2">
            <Box pb={3}>
              <Typography variant="h3">Your personal sleep diary.</Typography>
            </Box>
          </td>
        </tr>
        <tr>
          <td width={"66%"} align={"left"}>
            <Typography variant="h6">
              Understand yourself and regain control of your sleep, for what
              matters.{" "}
            </Typography>
          </td>
          <Hidden smDown>
            <td align={"right"}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/register"
              >
                Sign up for free!
              </Button>
            </td>
          </Hidden>
        </tr>
      </table>
    </Box>
  );
}

function Video() {
  return (
    <Box my={"5%"} align={"center"}>
      <ReactPlayer
        width="90%"
        url="https://youtu.be/LWceRNBvJb0"
        playing={true}
      />
    </Box>
  );
}

function Feature() {
  return (
    <div>
      <Box p={"3%"} pb={"5%"} align={"center"}>
        <Typography variant={"h4"}>Features</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid container item md={6} sm={12}>
          <table width={"100%"}>
            <tr>
              <td width={"40%"} align={"center"}>
                <NotesIcon style={{ fontSize: 80 }} />
              </td>
              <td width={"60%"} align={"left"}>
                <Typography variant="h6">
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
                <Typography variant="h6">Mobile app.</Typography>
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
                <Typography variant="h6">Trends visualization.</Typography>
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
                <Typography variant="h6">
                  Goal setting, integrated with calendar and notification.
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
                <Typography variant="h6">Tips of the day.</Typography>
              </td>
            </tr>
          </table>
        </Grid>
      </Grid>
    </div>
  );
}
