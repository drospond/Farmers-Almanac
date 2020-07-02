import React, { Component } from "react";
import axios from "axios";
import './CreateAccount.css';

class CreateAccount extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    passwordRepeat: "",
    error: "",
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      error: false,
    });
  };

  createAccount = (event, email, username, password) => {
    event.preventDefault();
    axios
      .post("/api/user", { email, username, password })
      .then((res) => {
        if(res.data.error){
          return this.setState({error: res.data.error});
        }
        this.props.signIn(event, email, password);
        this.props.history.push("/dashboard");
      })
      .catch((er) => {
        console.log(er);
      });
  };

  render() {
    return (
      <div className="container">
        <h1>Create Account</h1>
        {this.state.error && <p className='error'>{this.state.error}</p>}
        <form
          onSubmit={(event) =>
            this.createAccount(
              event,
              this.state.email,
              this.state.username,
              this.state.password
            )
          }
        >
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              aria-describedby="emailHelp"
              onChange={this.handleInputChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword1"
              name="password"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword2">Repeat Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword2"
              name="passwordRepeat"
              onChange={this.handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CreateAccount;
