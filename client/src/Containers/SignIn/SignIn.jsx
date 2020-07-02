import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './SignIn.css'

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: false,
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      error: "",
    });
  };

  signIn = (event, email, password) => {
    event.preventDefault();
    axios
      .post("api/user/signin", { email, password })
      .then((res) => {
        if (res.data.error) {
          console.log(res.data);
          return this.setState({ error: res.data.error });
        }
        sessionStorage.setItem("jwt", res.data.accessToken);
        this.props.getUserObject();
        this.props.setIsLoggedIn(true);
        this.props.history.push("/dashboard");
      })
      .catch((er) => {
        console.log(er);
      });
  };

  render() {
    return (
      <div className="container">
        <h1>Sign In</h1>
        {this.state.error && <p className="error">{this.state.error}</p>}
        <form
          onSubmit={(event) =>
            this.signIn(event, this.state.email, this.state.password)
          }
        >
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              name="email"
              onChange={this.handleInputChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={this.handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>
        <br />
        <Link to="/create-account">
          <button className="btn btn-secondary">Create Account</button>
        </Link>
      </div>
    );
  }
}

export default SignIn;
