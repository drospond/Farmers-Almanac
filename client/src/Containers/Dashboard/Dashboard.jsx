import React, { Component } from "react";

class Dashboard extends Component {

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Welcome {this.props.user.username}</h1>
      </div>
    );
  }
}

export default Dashboard;
