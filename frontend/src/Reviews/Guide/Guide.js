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
    const upvoted = review.upvoted;
    const downvoted = review.downvoted;
    this.setState({
      name,
      moduleList,
      title,
      major,
      description,
      upvoted,
      downvoted,
    });
  }

  async refreshVotes() {
    const data = await axios.get(
      `http://localhost:8081/reviews/${this.state.name}`
    );
    const review = data.data;

    // const upvotes = review.upvotes;
    // const downvotes = review.downvotes;
    const upvoted = review.upvoted;
    const downvoted = review.downvoted;
    this.setState({
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
    await this.refreshVotes();
  }

  async downvote(username) {
    await axios.post(`http://localhost:8081/reviews/downvote/${username}`, {
      name: this.state.name,
      upvoted: this.state.upvoted,
      downvoted: this.state.downvoted,
    });
    await this.refreshVotes();
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
          // noOfUpvotes={this.state.upvotes}
          // noOfDownvotes={this.state.downvotes}
          upvote={this.upvote.bind(this)}
          downvote={this.downvote.bind(this)}
          upvotedNames={this.state.upvoted}
          downvotedNames={this.state.downvoted}
          name={this.state.name}
        />
        <Description description={this.state.description} />
        <Table moduleList={this.state.moduleList} />
      </div>
    );
  }
}

export default Guide;
