import React, { Component } from "react";
import Showcase from "./Showcase/Showcase";
import Searchbar from "./Searchbar/Searchbar";
import AddAYBar from "./AddAY/AddAY";
import Table from "./PlannerTable/PlannerTable";
import auth0Client from "../Auth";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import ExportButton from "./ExportPlanner/ExportButton";

class Planner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
      update: false,
    };
  }

  async componentDidUpdate() {
    if (auth0Client.isAuthenticated() && this.state.userData === null) {
      const username = auth0Client.getProfile().name;
      await axios.post(`http://localhost:8081/Planner/name`, {
        name: username,
      });

      const data = await axios.get(
        `http://localhost:8081/Planner/users/${username}`
      );
      const userData = data.data;
      console.log(userData);
      this.setState({ userData });
    } else if (this.state.update) {
      await this.refreshTable();
      const update = false;
      this.setState({ update });
    }
  }

  async submitAY(AY) {
    const username = this.state.userData.name;
    await axios.post(`http://localhost:8081/Planner/users/moduleList`, {
      name: username,
      AY: AY,
    });
    const update = true;
    this.setState({ update });
    //await this.refreshTable();
  }

  async submitModule(year, semester, module) {
    const username = this.state.userData.name;
    await axios.post(`http://localhost:8081/Planner/users/${username}/`, {
      AY: year,
      semester: semester,
      module: {
        moduleCode: module.moduleCode,
        moduleTitle: module.moduleTitle,
        moduleCredits: parseInt(module.moduleCredits),
      },
    });
    const update = true;
    this.setState({ update });
  }

  async exportPlanner(title, major, description) {
    const username = this.state.userData.name;
    const moduleList = this.state.userData.moduleList;
    console.log("in export Planner");
    console.log(description);
    await axios.post(`http://localhost:8081/reviews/${username}`, {
      moduleList: moduleList,
      title: title,
      major: major,
      description: description,
    });
  }

  //Work in progress
  async deleteYear(year) {
    await axios.post(`http://localhost:8081/Planner/deleteYear`, {
      name: this.state.userData.name,
      AY: year,
    });
    const update = true;
    this.setState({ update });
  }

  async deleteModule(year, semester, module) {
    await axios.post(`http://localhost:8081/Planner/deleteModule`, {
      name: this.state.userData.name,
      AY: year,
      semester: semester,
      module: {
        moduleCode: module.moduleCode,
        moduleTitle: module.moduleTitle,
        moduleCredits: parseInt(module.moduleCredits),
      },
    });
    const update = true;
    this.setState({ update });
  }

  async refreshTable() {
    const data = await axios.get(
      `http://localhost:8081/Planner/users/${this.state.userData.name}`
    );
    const userData = data.data;
    this.setState({
      userData,
    });
  }

  render() {
    return (
      <div>
        <div>
          <Showcase />
        </div>
        {auth0Client.isAuthenticated() && (
          <div>
            {this.state.userData === null && (
              <div>
                <Typography variant="h4">Loading profile...</Typography>
              </div>
            )}
            {this.state.userData !== null && (
              <div>
                <AddAYBar submitAY={this.submitAY.bind(this)} />
                <Searchbar
                  submitModule={this.submitModule.bind(this)}
                  userModuleList={this.state.userData.moduleList}
                />
                <Table
                  moduleList={this.state.userData.moduleList}
                  deleteYear={this.deleteYear.bind(this)}
                  deleteModule={this.deleteModule.bind(this)}
                />
                <ExportButton exportPlanner={this.exportPlanner.bind(this)} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Planner;
