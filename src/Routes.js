import React from "react";
import { Switch } from "react-router-dom";
import Game from "./containers/Game";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Game} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute component={NotFound} />
  </Switch>
