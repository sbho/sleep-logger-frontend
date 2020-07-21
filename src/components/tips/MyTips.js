import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import DeletableTipBox from "./DeletableTipBox";
import LoggedInNavBar from "../nav/LoggedInNavBar";

export default function MyTips(props) {
  const [tips, setTips] = useState([]);

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
      <Box p={"5%"}>
        <Grid container spacing={2}>
          {tipBoxes}
        </Grid>
      </Box>
    </div>
  );
}
