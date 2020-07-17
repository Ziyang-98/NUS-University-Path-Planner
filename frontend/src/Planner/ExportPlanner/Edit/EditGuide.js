import React, { Component } from "react";
import BackButton from "./Component/BackButton";
import Title from "./Component/Title";
import Table from "./Component/Table";
import Description from "./Component/Description";
import UpdateButtons from "./Component/UpdateButtons";
import axios from "axios";

class EditGuide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      currModuleList: null,
      moduleList: null,
      title: "",
      major: "",
      description: "",
      edited: false,
    };
  }

  async componentDidMount() {
    // Reviews side: to get relevant details of review
    const name = localStorage.getItem("username");
    const data = await axios.get(`http://localhost:8081/reviews/${name}`);
    const review = data.data;
    const moduleList = review.moduleList;
    const title = review.title;
    const major = review.major;
    const description = review.description;

    // Planner side: to get current module list of user
    const currData = await axios.get(
      `http://localhost:8081/Planner/users/${name}`
    );
    const currModuleList = currData.data.moduleList;
    this.setState({
      name,
      currModuleList,
      moduleList,
      title,
      major,
      description,
    });
  }

  handleEdited() {
    this.setState({ edited: true });
  }

  handleTitleChange(newTitle) {
    this.setState({ title: newTitle });
    console.log(this.state.title);
  }

  handleDescriptionChange(newDescription) {
    this.setState({ description: newDescription });
    console.log(this.state.description);
  }

  handleModuleListChange() {
    this.setState({ moduleList: this.state.currModuleList });
  }

  async update() {
    const updated = await axios.post(
      `http://localhost:8081/editGuide/update/${this.state.name}`,
      {
        moduleList: this.state.moduleList,
        title: this.state.title,
        description: this.state.description,
      }
    );
    this.setState({ edited: false });
    console.log(updated.data);
  }

  render() {
    return (
      <div>
        <BackButton edited={this.state.edited} />
        <Title
          name={this.state.name}
          title={this.state.title}
          major={this.state.major}
          handleEdited={this.handleEdited.bind(this)}
          handleTitleChange={this.handleTitleChange.bind(this)}
        />
        <Description
          description={this.state.description}
          handleEdited={this.handleEdited.bind(this)}
          handleDescriptionChange={this.handleDescriptionChange.bind(this)}
        />
        <Table
          handleEdited={this.handleEdited.bind(this)}
          moduleList={this.state.moduleList}
          handleModuleListChange={this.handleModuleListChange.bind(this)}
        />
        <UpdateButtons
          username={this.state.name}
          update={this.update.bind(this)}
          handleEdited={this.handleEdited.bind(this)}
        />
      </div>
    );
  }
}

export default EditGuide;
