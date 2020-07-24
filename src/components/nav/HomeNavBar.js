import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import HomeMenuList from "./HomeMenuList";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import LoggedInMenuList from "./LoggedInMenuList";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function HomeNavBar(props) {
  const history = useHistory();

  //Clear the previous token, knocking the current user out when page refresh.
  useEffect(() => {
    if (localStorage.getItem("token")) {
      localStorage.clear();
    }
  });

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          SleepLogger
        </Typography>
        <Hidden smDown>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Log In
          </Button>
        </Hidden>
        <Hidden mdUp>
          <HomeMenuList className={classes.title} />
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
