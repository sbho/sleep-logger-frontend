import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Diary from "./components/diary/Diary";
import Home from "./components/landing/Home";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import Summary from "./components/viz/Summary";
import Account from "./components/account/Account";
import MyTips from "./components/tips/MyTips";
import Target from "./components/target/Target";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={LogIn} />
          <PrivateRoute exact path="/account" component={Account} />
          <PrivateRoute exact path="/diary" component={Diary} />
          <PrivateRoute exact path="/summary" component={Summary} />
          <PrivateRoute exact path="/tips" component={MyTips} />
          <PrivateRoute exact path="/target" component={Target} />
          <Route exact path="/" component={Home} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </div>
    </Router>
  );
}
