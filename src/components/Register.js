import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import HomeNavBar from "./nav/HomeNavBar";
import MuiAlert from "@material-ui/lab/Alert";

//Registration page
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  const [passwordSnackbarOpen, setPasswordSnackbarOpen] = React.useState(false);
  const [emptyFieldSnackbarOpen, setEmptyFieldSnackbarOpen] = React.useState(
    false
  );
  const [userCreatedSnackbarOpen, setUserCreatedSnackbarOpen] = React.useState(
    false
  );

  const handleSubmit = (e) => {
    if (password !== password_confirmation) {
      setPasswordSnackbarOpen(true);
      return;
    }

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      password_confirmation === ""
    ) {
      setEmptyFieldSnackbarOpen(true);
      return;
    }

    const BASE_URL = "https://sleep-logger-dev.herokuapp.com";
    const headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    const body = {
      user: {
        name: name,
        email: email,
        password: password,
      },
    };

    fetch(BASE_URL + "/users", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    }).then(setUserCreatedSnackbarOpen);
  };
  return (
    <div>
      <HomeNavBar />
      <Box p={10} pt={10}>
        <Paper>
          <Box p={5}>
            <Box p={2}>
              <Typography variant={"h5"}>Register</Typography>
            </Box>
            <Box p={2} align={"center"}>
              <TextField
                id="name"
                onChange={handleNameChange}
                label="Name"
                fullWidth
                autoFocus
              />
            </Box>
            <Box p={2} align={"center"}>
              <TextField
                id="email"
                onChange={handleEmailChange}
                label="Email"
                fullWidth
              />
            </Box>
            <Box p={2} align={"center"}>
              <TextField
                id="password"
                onChange={handlePasswordChange}
                label="Password"
                type="password"
                fullWidth
              />
            </Box>
            <Box p={2} align={"center"}>
              <TextField
                id="password_confirmation"
                onChange={handlePasswordConfirmationChange}
                label="Password confirmation"
                type="password"
                fullWidth
              />
            </Box>
            <Box p={2} align={"center"}>
              <Button onClick={handleSubmit} variant="outlined" color="primary">
                Register
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Snackbar open={passwordSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert severity={"error"}>
          Password and password confirmation do not match.
        </MuiAlert>
      </Snackbar>

      <Snackbar open={emptyFieldSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert severity={"error"}>One or more field is empty.</MuiAlert>
      </Snackbar>

      <Snackbar open={userCreatedSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert severity={"success"}>
          User created. Please proceed to log in.
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
