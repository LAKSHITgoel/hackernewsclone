import React, { Component } from "react";
import { AUTH_TOKEN } from "../constants";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "./queries";
import { compose, graphql } from "react-apollo";
import { withRouter } from "react-router-dom";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true, //switch beetween login and signup
      email: "",
      password: "",
      name: ""
    };
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
    if (localStorage.getItem(AUTH_TOKEN)) {
      this.props.history.push("/");
    }
  };

  login = () => {
    this.props
      .login({
        variables: {
          email: this.state.email,
          password: this.state.password
        }
      })
      .then(res => this._saveUserData(res.data.login.token))
      .catch(err => console.log("error", err));
  };

  signup = () => {
    this.props
      .signup({
        variables: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        }
      })
      .then(
        res =>
          res ? this.setState({ login: true }) : this.setState({ login: false })
      )
      .catch(err => console.log("error", err));
  };

  clear = () => {
    this.setState({
      email: "",
      password: "",
      name: ""
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { login, email, password, name } = this.state;

    return (
      <div>
        <h4 className="mv3">{login ? "Log In" : "Sign Up"}</h4>
        <div className="flex flex-column">
          {!login && (
            <input
              value={name}
              onChange={this.onChange}
              name="name"
              type="text"
              placeholder="Your Name"
            />
          )}
          <input
            value={email}
            onChange={this.onChange}
            name="email"
            type="email"
            placeholder="Your Email"
          />
          <input
            value={password}
            onChange={this.onChange}
            type="password"
            name="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt3">
          {login ? (
            <div className="pointer mr2 button" onClick={this.login}>
              LogIn
            </div>
          ) : (
            <div className="pointer mr2 button" onClick={this.signup}>
              SignUp
            </div>
          )}
          <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login ? "need to create an account?" : "already have an account?"}
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(LOGIN_MUTATION, { name: "login" }),
  graphql(SIGNUP_MUTATION, { name: "signup" })
)(withRouter(LogIn));
