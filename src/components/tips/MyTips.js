import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import DeletableTipBox from "./DeletableTipBox";
import LoggedInNavBar from "../nav/LoggedInNavBar";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function MyTips(props) {
  const [tips, setTips] = useState([]);
  const [hasNoTip, setHasNoTip] = useState(false);

  useEffect(() => {
    const BASE_URL = "https://sleep-logger-dev.herokuapp.com";
    const headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    fetch(BASE_URL + "/v1/tips", {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setTips(data);
        if (data.length === 0) {
          setHasNoTip(true);
        }
      });
  });

  const tipBoxes = [];
  tips.forEach((t) =>
    tipBoxes.push(
      <Grid item xs={4}>
        <DeletableTipBox content={t.content} id={t.id} />
      </Grid>
    )
  );

  return (
    <div>
      <LoggedInNavBar history={props.history} />
      {hasNoTip && (
        <Grid container spacing={2}>
          <Grid container item xs={4}>
            {/*empty*/}
          </Grid>
          <Grid container item xs={4}>
            <Box p={"5%"}>
              <Typography variant={"h5"}>
                You have not saved any tip. Time to save some!
              </Typography>
              <Box p={"2%"}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/diary"
                >
                  Take me to my diary
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid container item xs={4}>
            {/*empty*/}
          </Grid>
        </Grid>
      )}
      <Grid container spacing={2}>
        <Box p={"5%"}>{tipBoxes}</Box>
      </Grid>
    </div>
  );
}
