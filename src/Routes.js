import React from "react";
import { Route, Switch } from "react-router-dom";
import Game from "./containers/Game";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";

export default () =>
  <Switch>
    <Route path="/" exact component={Game} />
    <Route path="/login" exact component={Login} />
    <Route component={NotFound} />
  </Switch>;
