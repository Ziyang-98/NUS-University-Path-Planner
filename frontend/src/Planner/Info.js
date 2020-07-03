import React, { Component } from "react";
import Showcase from "./Showcase/Showcase";
import Searchbar from "./Searchbar/Searchbar";
import AddAYBar from "./AddAY/AddAY";
import Table from "./PlannerTable/PlannerTable";
import auth0Client from "../Auth";
import axios from "axios";
import { Typography } from "@material-ui/core";

class Info extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
    };
  }

  async componentDidMount() {
    console.log("mounted");
    if (auth0Client.isAuthenticated()) {
      console.log("mounted2");

      const username = auth0Client.getProfile().name;
      const userData = (
        await axios.get("http://localhost:8081/Planner/name", {
          name: username,
        })
      ).data;
      this.setState(userData);
    }
  }

  render() {
    console.log(auth0Client.isAuthenticated());
    return (
      <div>
        {auth0Client.isAuthenticated() && (
          <div>
            {this.state.userData === null && (
              <div>
                <Typography variant="h2">Loading profile...</Typography>
              </div>
            )}
            {this.state.userData && (
              <div>
                <AddAYBar />
                <Searchbar />
                <Table />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Info;
