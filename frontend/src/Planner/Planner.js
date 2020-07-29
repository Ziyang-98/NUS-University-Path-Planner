import React, { Component } from "react";
import Showcase from "./Showcase/Showcase";
import Searchbar from "./Searchbar/Searchbar";
import AddAYBar from "./AddAY/AddAY";
import Table from "./PlannerTable/PlannerTable";
import auth0Client from "../Auth";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import ExportButton from "./ExportPlanner/Export/ExportButton";
import EditButtons from "./ExportPlanner/Edit/EditButtons";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  alert: {
    marginBottom: theme.spacing(2),
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Planner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
      hasGuide: false,
      degrees: null,
      update: false,
      exported: false,
    };

    this.handleClose = this.handleClose.bind(this);
  }

  async componentDidMount() {
    if (auth0Client.isAuthenticated() && this.state.userData === null) {
      const username = auth0Client.getProfile().name;
      await axios.post(`http://localhost:8081/Planner/name`, {
        name: username,
      });

      const degreesData = await axios.get(`http://localhost:8081/degrees`);
      const degrees = degreesData.data.degrees;

      const data = await axios.get(
        `http://localhost:8081/Planner/users/${username}`
      );
      const userData = data.data;

      //this.setState({ userData, degrees });

      let reviewData = await axios.get(
        `http://localhost:8081/editGuide/hasGuide/${username}`
      );
      const hasReview = reviewData.data.hasReview;
      this.setState({ userData, degrees, hasReview });
      // console.log("review gotten");
      // console.log(reviewData.data);
    }
  }

  async componentDidUpdate() {
    if (this.state.update) {
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

  async exportPlanner(title, major, description, tags) {
    const username = this.state.userData.name;
    const moduleList = this.state.userData.moduleList;
    await axios.post(`http://localhost:8081/reviews/${username}`, {
      moduleList: moduleList,
      title: title,
      major: major,
      description: description,
      tags: tags,
    });
    const update = true;
    this.setState({ update });
    this.handleOpen();
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

    let reviewData = await axios.get(
      `http://localhost:8081/editGuide/hasGuide/${this.state.userData.name}`
    );
    const hasReview = reviewData.data.hasReview;
    this.setState({ userData, hasReview });
  }

  handleOpen() {
    this.setState({ exported: true });
  }

  handleClose() {
    this.setState({ exported: false });
  }

  render() {
    const { classes } = this.props;
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
                <AddAYBar
                  moduleList={this.state.userData.moduleList}
                  submitAY={this.submitAY.bind(this)}
                />
                <Searchbar
                  submitModule={this.submitModule.bind(this)}
                  userModuleList={this.state.userData.moduleList}
                />
                <Table
                  moduleList={this.state.userData.moduleList}
                  deleteYear={this.deleteYear.bind(this)}
                  deleteModule={this.deleteModule.bind(this)}
                />
                {!this.state.hasReview && (
                  <ExportButton
                    exportPlanner={this.exportPlanner.bind(this)}
                    degrees={this.state.degrees}
                  />
                )}
                {this.state.hasReview && (
                  <EditButtons username={this.state.userData.name} />
                )}
              </div>
            )}
          </div>
        )}
        <Snackbar
          open={this.state.exported}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <Alert
            className={classes.alert}
            onClose={this.handleClose}
            severity="success"
          >
            Guide successfully exported!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(useStyles)(Planner);
