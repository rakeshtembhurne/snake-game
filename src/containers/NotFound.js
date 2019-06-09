import React from "react";
import "./NotFound.css";
import logo from '../snake.svg';

export default () =>
  <div className="not-found">
    <h1>Coming soon!</h1>
    <img className="snake-logo" src={logo} alt="Snake" />
  </div>;
