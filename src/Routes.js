import React from "react";
import { Route, Switch } from "react-router-dom";
import Game from "./containers/Game";
import NotFound from "./containers/NotFound";

export default () =>
  <Switch>
    <Route path="/" exact component={Game} />
    <Route component={NotFound} />
  </Switch>;
