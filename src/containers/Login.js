import React, { Component } from 'react';
import './Login.css';

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    }
  }

  // TODO: make it more strong
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <div className="form flex-container">
        <form id="loginForm" onSubmit={this.handleSubmit}>
          <div className="flex-item">
            <h1>Login</h1>
          </div>
          <div className="flex-item">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="flex-item">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button className="flex-item" disabled={this.validateForm()}>Login</button>
        </form>
      </div>
    )
  }

}
