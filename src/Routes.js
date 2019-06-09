import React from "react";
import { Route, Switch } from "react-router-dom";
import Game from "./containers/Game";

export default () =>
  <Switch>
    <Route path="/" exact component={Game} />
  </Switch>;
