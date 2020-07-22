import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LoggedInNavBar from "../nav/LoggedInNavBar";
import MuiAlert from "@material-ui/lab/Alert";

//Account page
export default function Account(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [
    passwordConfirmationNotMachingSnackbarOpen,
    setPasswordConfirmationNotMachingSnackbarOpen,
  ] = useState(false);
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

  useEffect(() => {
    const BASE_URL = "https://sleep-logger-dev.herokuapp.com";
    const headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    let url = new URL(BASE_URL + "/profile");

    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
      });
  }, []);

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
    e.preventDefault();

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
      setPasswordConfirmationNotMachingSnackbarOpen(true);
      return;
    }

    if (!/^[A-Za-z]+$/.test(name)) {
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

    //The current user is determined from the token, so any id used in the path will update the current logged in user.

    const BASE_URL = "https://sleep-logger-dev.herokuapp.com";
    const headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const body = {
      name: name,
      email: email,
      password: password,
    };

    fetch(BASE_URL + "/users/0", {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(body),
    }).then(setUserCreatedSnackbarOpen);
  };
  return (
    <div>
      <LoggedInNavBar history={props.history} />
      <Box p={10} pt={10}>
        <Paper>
          <Box p={5}>
            <Box p={2}>
              <Typography variant={"h5"}>Account</Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <Box p={2} align={"center"}>
                <TextField
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  label="Name"
                  fullWidth
                  autoFocus
                />
              </Box>
              <Box p={2} align={"center"}>
                <TextField
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  label="Email"
                  fullWidth
                />
              </Box>
              <Box p={2} align={"center"}>
                <TextField
                  id="password"
                  onChange={handlePasswordChange}
                  label=" New password"
                  type="password"
                  fullWidth
                  helperText={
                    "Use between 6 and 23 characters inclusive, with at least one uppercase character, one lowercase character, and one number."
                  }
                />
              </Box>
              <Box p={2} align={"center"}>
                <TextField
                  id="password_confirmation"
                  onChange={handlePasswordConfirmationChange}
                  label="New password confirmation"
                  type="password"
                  fullWidth
                />
              </Box>
              <Box p={2} align={"center"}>
                <Button type="submit" variant="outlined" color="primary">
                  Update account
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={passwordConfirmationNotMachingSnackbarOpen}
        autoHideDuration={3000}
      >
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
