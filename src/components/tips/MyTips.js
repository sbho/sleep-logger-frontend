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
      <Grid item md={4} sm={6} xs={12}>
        <DeletableTipBox content={t.content} id={t.id} />
      </Grid>
    )
  );

  return (
    <div>
      <LoggedInNavBar history={props.history} />
      {hasNoTip && (
        <Grid container spacing={2}>
          <Grid container item md={4} sm={6} xs={12}>
            {/*empty*/}
          </Grid>
          <Grid container item md={4} sm={6} xs={12}>
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
          <Grid container item md={4} sm={6} xs={12}>
            {/*empty*/}
          </Grid>
        </Grid>
      )}
      <Box p={"5%"}>
        <Grid container spacing={2}>
          {tipBoxes}
        </Grid>
      </Box>
    </div>
  );
}
