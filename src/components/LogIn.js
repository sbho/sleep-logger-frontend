import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Auth from "./Auth";
import HomeNavBar from "./nav/HomeNavBar";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default function LogIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [
    invalidCredentialsSnackbarOpen,
    setInvalidCredentialsSnackbarOpen,
  ] = React.useState(false);

  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <HomeNavBar />
      <Box p={10}>
        <Paper>
          <Box p={5}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                Auth.login(
                  { email: email, password: password },
                  () => {
                    history.push("/diary");
                  },
                  () => setInvalidCredentialsSnackbarOpen(true)
                );
              }}
            >
              <Box p={2}>
                <Typography variant={"h5"}>Sign in</Typography>
              </Box>
              <Box p={2} align={"center"}>
                <TextField
                  onChange={handleEmailChange}
                  id="email"
                  label="Email"
                  fullWidth
                  autoFocus
                />
              </Box>
              <Box p={2} align={"center"}>
                <TextField
                  onChange={handlePasswordChange}
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                />
              </Box>
              <Box p={2} align={"center"}>
                <Button type="submit" variant="outlined" color="primary">
                  Sign In
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Box>
      <Snackbar open={invalidCredentialsSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert severity="error">Wrong email or password.</MuiAlert>
      </Snackbar>
    </div>
  );
}
