import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Auth from "../Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function LogIn(props) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          SleepLogger
        </Typography>
        <Button color="inherit" component={Link} to="/diary">
          Diary
        </Button>
        <Button color="inherit" component={Link} to="/summary">
          Summary
        </Button>
        <Button color="inherit" component={Link} to="/target">
          Target
        </Button>
        <Button color="inherit" component={Link} to="/tips">
          My tips
        </Button>
        <Button color="inherit" component={Link} to="/account">
          Account
        </Button>
        <Button
          onClick={() => {
            Auth.logout(() => {
              props.history.push("/");
            });
          }}
          variant="contained"
          color="primary"
          disableElevation
        >
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
}
