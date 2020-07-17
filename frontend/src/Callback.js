import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import auth0Client from "./Auth";

class Callback extends Component {
  async componentDidMount() {
    await auth0Client.handleAuthentication();
    this.props.history.push("/");
  }

  render() {
    console.log(this.props.history.location.state);
    return <p>Loading profile...</p>;
  }
}

export default withRouter(Callback);
