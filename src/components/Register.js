import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import HomeNavBar from "./nav/HomeNavBar";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

//Registration page
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [passwordSnackbarOpen, setPasswordSnackbarOpen] = useState(false);
  const [emptyFieldSnackbarOpen, setEmptyFieldSnackbarOpen] = useState(false);
  const [userCreatedSnackbarOpen, setUserCreatedSnackbarOpen] = useState(false);
  const [invalidEmailSnackbarOpen, setInvalidEmailSnackbarOpen] = useState(
    false
  );

  const [
    passwordTooShortSnackbarOpen,
    setPasswordTooShortSnackbarOpen,
  ] = useState(false);

  const [
    passwordTooLongSnackbarOpen,
    setPasswordTooLongSnackbarOpen,
  ] = useState(false);

  const [
    passwordMustContainUppercaseSnackbarOpen,
    setPasswordMustContainUppercaseOpen,
  ] = useState(false);

  const [
    passwordMustContainLowercaseSnackbarOpen,
    setPasswordMustContainLowercaseSnackbarOpen,
  ] = useState(false);

  const [
    passwordMustContainNumberOpen,
    setPasswordMustContainNumberOpen,
  ] = useState(false);

  const [invalidNameSnackbarOpen, setInvalidNameSnackbarOpen] = useState(false);

  const history = useHistory();

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

  const handleSubmit = (e) => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      passwordConfirmation === ""
    ) {
      setEmptyFieldSnackbarOpen(true);
      return;
    }

    if (password !== passwordConfirmation) {
      setPasswordSnackbarOpen(true);
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      setInvalidNameSnackbarOpen(true);
      return;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email)) {
      setInvalidEmailSnackbarOpen(true);
      return;
    }

    if (password.length < 6) {
      setPasswordTooShortSnackbarOpen(true);
      return;
    }

    if (password.length > 23) {
      setPasswordTooLongSnackbarOpen(true);
      return;
    }

    if (!/[a-z]/.test(password)) {
      setPasswordMustContainLowercaseSnackbarOpen(true);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setPasswordMustContainUppercaseOpen(true);
      return;
    }

    if (!/[0-9]/.test(password)) {
      setPasswordMustContainNumberOpen(true);
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
    })
      .then(setUserCreatedSnackbarOpen)
      .then(setTimeout(() => history.push("/login"), 3000));
  };

  return (
    <div>
      <HomeNavBar />
      <Box p={"10%"}>
        <Paper>
          <Box p={"5%"}>
            <Box p={"2%"}>
              <Typography variant={"h5"}>Register</Typography>
            </Box>
            <Box p={"2%"} align={"center"}>
              <TextField
                id="name"
                onChange={handleNameChange}
                label="Name"
                fullWidth
                autoFocus
              />
            </Box>
            <Box p={"2%"} align={"center"}>
              <TextField
                id="email"
                onChange={handleEmailChange}
                label="Email"
                fullWidth
              />
            </Box>
            <Box p={"2%"} align={"center"}>
              <TextField
                id="password"
                onChange={handlePasswordChange}
                label="Password"
                type="password"
                helperText={
                  "Use between 6 and 23 characters inclusive, with at least one uppercase character, one lowercase character, and one number."
                }
                fullWidth
              />
            </Box>
            <Box p={"2%"} align={"center"}>
              <TextField
                id="password_confirmation"
                onChange={handlePasswordConfirmationChange}
                label="Password confirmation"
                type="password"
                fullWidth
              />
            </Box>
            <Box p={"2%"} align={"center"}>
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

      <Snackbar open={invalidNameSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert severity={"error"}>
          We only accept names between 2 and 30 characters inclusive, with only
          lowercase letters, uppercase letters and whitespaces. Sorry if we
          missed you!
        </MuiAlert>
      </Snackbar>

      <Snackbar open={emptyFieldSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert severity={"error"}>One or more field is empty.</MuiAlert>
      </Snackbar>

      <Snackbar open={invalidEmailSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert severity={"error"}>Invalid email.</MuiAlert>
      </Snackbar>

      <Snackbar open={passwordTooShortSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert severity={"error"}>Password is too short.</MuiAlert>
      </Snackbar>

      <Snackbar open={passwordTooLongSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert severity={"error"}>Password is too long.</MuiAlert>
      </Snackbar>

      <Snackbar
        open={passwordMustContainUppercaseSnackbarOpen}
        autoHideDuration={3000}
      >
        <MuiAlert severity={"error"}>
          Password must have at least one uppercase character.
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={passwordMustContainLowercaseSnackbarOpen}
        autoHideDuration={3000}
      >
        <MuiAlert severity={"error"}>
          Password must have at least one lowercase character.
        </MuiAlert>
      </Snackbar>

      <Snackbar open={passwordMustContainNumberOpen} autoHideDuration={3000}>
        <MuiAlert severity={"error"}>
          Password must have at least one number.
        </MuiAlert>
      </Snackbar>

      <Snackbar open={userCreatedSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert severity={"success"}>
          User created. Please proceed to login. Redirecting...
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
