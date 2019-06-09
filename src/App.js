import React from 'react';
import { Link } from 'react-router-dom';
import Routes from "./Routes";
import './App.css';
import logo from './snake.svg';

// eslint-disable-next-line
const log = data => console.log(JSON.stringify(data, null, 2));
// eslint-disable-next-line
const lg = data => console.log(JSON.stringify(data));

class App extends React.Component {

  render () {
    return (
      <div>
        <nav className="navBar">
          <nav className="wrapper">
            <div className="logo">
              <Link to="/"><img src={logo} alt="Snake" /></Link>
            </div>
            <input type="checkbox" id="menu-toggle" />
              <label htmlFor="menu-toggle" className="label-toggle"></label>
            <ul>
              <li><Link to="/leaderboard">Leaderboard</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>
        </nav>
        <Routes />
      </div>
    )
  }
}

export default App;
