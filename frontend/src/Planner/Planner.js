import React, { Component } from "react";
import Showcase from "./Showcase/Showcase";
import Searchbar from "./Searchbar/Searchbar";
import AddAYBar from "./AddAY/AddAY";
import Table from "./PlannerTable/PlannerTable";

class Planner extends Component {
  render() {
    return (
      <div>
        <Showcase />
        <AddAYBar />
        <Searchbar />
        <Table />
      </div>
    );
  }
}

export default Planner;
