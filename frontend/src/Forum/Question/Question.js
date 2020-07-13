import React, { Component } from "react";
import axios from "axios";
import SubmitAnswer from "./SubmitAnswer";
import auth0Client from "../../Auth";
//------ tag style -------//
import Chip from '@material-ui/core/Chip';
//---- upvote downvote -----//
import RatingBar from "./QuestionRating";
import AnswerRatingBar from "./AnswerRating";
//----- Editing --------//
import EditQuestion from "./EditQuestion";
import EditAnswer from "./EditAnswer";
//------- Deleting ------//
import DeleteQuestion from "./DeleteQuestion";
import DeleteAnswer from "./DeleteAnswer";
//------ Pagination ------//
import Pagination from "@material-ui/lab/Pagination";

/*----- New files
EditQuestion.js, EditAnswer.js, DeleteQuestion.js, DeleteAnswer.js
-------*/

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      answers: null,
      username: localStorage.getItem("username"),

      //----- Pagination --------//
      baseAnswers: [],
      numOfPages: 1,
      currPage: 1,
      pagedAnswers: [],
      answersPerPage: 0,
    };
    this.submitAnswer = this.submitAnswer.bind(this);
    this.refreshVotes = this.refreshVotes.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  async componentDidMount() {  
    //Change this to change how many reviews displayed per page
    const answersPerPage = 3;

    const {
      match: { params },
    } = this.props;
    const question = (
      await axios.get(`http://localhost:8081/Forum/${params.questionId}`)
    ).data;
    const answers = question.answers;
    answers.sort((r1, r2) => {
      let denom1 = r1.upvotes + r1.downvotes;
      let denom2 = r2.upvotes + r2.downvotes;

      //preventing division by 0
      denom1 = denom1 === 0 ? 1 : denom1;
      denom2 = denom2 === 0 ? 1 : denom2;
      return (r2.upvotes / denom2) - (r1.upvotes / denom1);
    })

    this.setState({
      question,
      answers,
      baseAnswers: answers,
      numOfPages: Math.ceil(answers.length / answersPerPage),
      pagedAnswers: answers.slice(0, answersPerPage),
      answersPerPage,
    });
  }

  // async refreshQuestion() {
  //   console.log("refresh")
  //   const {
  //     match: { params },
  //   } = this.props;
  //   const question = (
  //     await axios.get(`http://localhost:8081/Forum/${params.questionId}`)
  //   ).data;
  //   this.setState({
  //     question,
  //   });
  // }

  //--------- Voting -------------//
  /*----- Use QuestionRating.js to change question style and
        AnswerRating.js to change answer style ---------
  */
  async refreshVotes() {
    const data = await axios.get(
      `http://localhost:8081/Forum/${this.state.question.id}`
    );
    const question = data.data;
    const answers = question.answers;
    console.log(question);
    this.setState({
      question,
      answers,
    });

    console.log("refreshed");
  }

  async upvote(username) {
    await axios.post(`http://localhost:8081/Forum/upvote/${username}`, {
      id: this.state.question.id,
      upvoted: this.state.question.upvoted,
      downvoted: this.state.question.downvoted,
    });
    console.log("upvote");
    await this.refreshVotes();
  }

  async downvote(username) {
    await axios.post(`http://localhost:8081/Forum/downvote/${username}`, {
      id: this.state.question.id,
      upvoted: this.state.question.upvoted,
      downvoted: this.state.question.downvoted,
    });
    console.log("downvote");
    await this.refreshVotes();
  }

  async upvoteAnswer(username, answerId) {
    await axios.post(`http://localhost:8081/Forum/upvoteAns/${username}`, {
      questionId: this.state.question.id,
      answerId: answerId,
      upvoted: this.state.answers[answerId].upvoted,
      downvoted: this.state.answers[answerId].downvoted,
    });
    console.log("upvote");
    await this.refreshVotes();
  }

  async downvoteAnswer(username, answerId) {
    await axios.post(`http://localhost:8081/Forum/downvoteAns/${username}`, {
      questionId: this.state.question.id,
      answerId: answerId,
      upvoted: this.state.answers[answerId].upvoted,
      downvoted: this.state.answers[answerId].downvoted,
    });
    console.log("downvote");
    await this.refreshVotes();
  }

  async submitAnswer(answer, hasName) {
    console.log("in submit")
    console.log(answer)
    await axios.post(
      `http://localhost:8081/Forum/answer/${this.state.question.id}`,
      {
        username: this.state.username,
        answer,
        hasName,
      },
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` },
      }
    )
      .then(window.location.reload(false))
  }

  async deleteTag(index) {
    await axios.post(
      `http://localhost:8081/Forum/deleteTag/${this.state.question.id}`,
      {
        tagId: index,
      }
    )
      .then(window.location.reload(false))
  }

  handlePageChange(event, value) {
    event.preventDefault();
    const start = this.state.answersPerPage * (value - 1);
    const end = start + this.state.answersPerPage;
    const currPage = value;
    const pagedAnswers = this.state.answers.slice(start, end);
    console.log(start, end, currPage, pagedAnswers);
    this.setState({
      currPage,
      pagedAnswers,
    })
  }

  render() {
    const { question, answers } = this.state;
    console.log(answers)
    console.log(this.state.baseAnswers)
    console.log(this.state.pagedAnswers)
    if (question === null) return <p>Loading ...</p>;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="jumbotron col-12">
              {question.author === this.state.username ?
                <EditQuestion
                  question={this.state.question}
                />
                : <div />
              }

              {question.author === this.state.username ?
                <DeleteQuestion
                  question={this.state.question}
                />
                : <div />
              }

              <h1 className="display-3">{question.title}</h1>
              <p className="lead">{question.description}</p>
              {/* NEW DISPLAY HERE */}
              <p className="lead">Posted by {question.name}</p>
              <div>
                {question.tags.map((tag, index) => <Chip size="small" label={tag} onDelete={() => this.deleteTag(index)} />)}
              </div>
              <RatingBar
                username={this.state.username}
                noOfUpvotes={question.upvotes}
                noOfDownvotes={question.downvotes}
                upvote={this.upvote.bind(this)}
                downvote={this.downvote.bind(this)}
                upvotedNames={question.upvoted}
                downvotedNames={question.downvoted}
              />
              {/* NEW DISPLAY END */}
              <hr className="my-4" />
              <SubmitAnswer
                questionId={question.id}
                submitAnswer={this.submitAnswer}
              />
              <p>Answers:</p>
              {this.state.pagedAnswers.map((answer, idx) => (
                <div className="lead" key={idx}>
                  {answer.answer}
                  {answer.author === this.state.username ?
                    <EditAnswer
                      question={this.state.question}
                      answerId={idx}
                    />
                    : <div />
                  }
                  {answer.author === this.state.username ?
                    <DeleteAnswer
                      question={this.state.question}
                      answerId={idx}
                    />
                    : <div />
                  }
                  <AnswerRatingBar
                    username={this.state.username}
                    noOfUpvotes={answer.upvotes}
                    noOfDownvotes={answer.downvotes}
                    upvote={this.upvoteAnswer.bind(this)}
                    downvote={this.downvoteAnswer.bind(this)}
                    upvotedNames={answer.upvoted}
                    downvotedNames={answer.downvoted}
                    answerId={idx}
                  />
                  <h6>Posted by {answer.name}</h6>
                  <hr />
                </div>
              ))}
              <Pagination
                count={this.state.numOfPages}
                page={this.state.currPage}
                onChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Question;
