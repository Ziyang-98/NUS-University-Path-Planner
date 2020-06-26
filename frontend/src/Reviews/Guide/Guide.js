import React, { Component } from "react";
import Title from "./Component/Title";
import Table from "./Component/Table";
import RatingBar from "./Component/Rating";
import Description from "./Component/Description";
import axios from "axios";

class Guide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      moduleList: null,
      title: "",
      major: "",
      description: "",
      votes: 0,
      upvoted: [],
      downvoted: [],
    };
  }

  async componentDidMount() {
    const name = this.props.match.params.name;
    const data = await axios.get(`http://localhost:8081/reviews/${name}`);
    const review = data.data;
    const moduleList = review.moduleList;
    const title = review.title;
    const major = review.major;
    const description = review.description;
    const votes = review.votes;
    const upvoted = review.upvoted;
    const downvoted = review.downvoted;

    this.setState({
      name,
      moduleList,
      title,
      major,
      description,
      votes,
      upvoted,
      downvoted,
    });
  }

  async refreshGuide() {
    const data = await axios.get(
      `http://localhost:8081/reviews/${this.state.name}`
    );
    const review = data.data;
    const moduleList = review.moduleList;
    const title = review.title;
    const major = review.major;
    const description = review.description;
    const votes = review.votes;
    const upvoted = review.upvoted;
    const downvoted = review.downvoted;
    this.setState({
      moduleList,
      title,
      major,
      description,
      votes,
      upvoted,
      downvoted,
    });
  }

  async upvote(username) {
    await axios.post(`http://localhost:8081/reviews/upvote/${username}`, {
      name: this.state.name,
      upvoted: this.state.upvoted,
      downvoted: this.state.downvoted,
    });
    await this.refreshGuide();
  }

  async downvote(username) {
    await axios.post(`http://localhost:8081/downvote/${username}`, {
      name: this.state.name,
      upvoted: this.state.upvoted,
      downvoted: this.state.downvoted,
    });
    await this.refreshGuide();
  }

  render() {
    return (
      <div>
        <Title
          name={this.state.name}
          title={this.state.title}
          major={this.state.major}
        />
        <RatingBar
          votes={this.state.votes}
          upvote={this.upvote.bind(this)}
          downvote={this.downvote.bind(this)}
          upvotedNames={this.state.upvoted}
          downvotedNames={this.state.downvoted}
        />
        <Description description={this.state.description} />
        <Table moduleList={this.state.moduleList} />
      </div>
    );
  }
}

export default Guide;
