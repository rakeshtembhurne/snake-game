import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Routes from "./Routes";
import { Auth } from 'aws-amplify';
import './App.css';
import logo from './snake.svg';

// eslint-disable-next-line
const log = data => console.log(JSON.stringify(data, null, 2));
// eslint-disable-next-line
const lg = data => console.log(JSON.stringify(data));

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    await Auth.signOut();

    this.userHasAuthenticated(false);

    this.props.history.push("/login");
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({
      isAuthenticating: false
    });
  }



  render () {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
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
              {this.state.isAuthenticated
                ? <li><Link onClick={this.handleLogout} to="/logout">Logout</Link></li>
                : <Fragment>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                  </Fragment>
              }

            </ul>
          </nav>
        </nav>
        <Routes childProps={childProps} />
      </div>
    )
  }
}

export default withRouter(App);
