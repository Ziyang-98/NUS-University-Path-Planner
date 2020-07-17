import React, { Component } from "react";
import axios from "axios";
import SubmitAnswer from "./SubmitAnswer";
import auth0Client from "../../Auth";
//------ tag style -------//
import Chip from "@material-ui/core/Chip";
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
//------ Styling ------//
import { withStyles } from "@material-ui/core/styles";

/*----- New files
EditQuestion.js, EditAnswer.js, DeleteQuestion.js, DeleteAnswer.js
-------*/
const useStyle = (theme) => ({
  qnButtonHolders: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  ansButtonHolders: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  tag: {
    margin: theme.spacing(1),
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(6),
  },
});

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
    this.handlePageChange = this.handlePageChange.bind(this);
    this.refreshQuestion = this.refreshQuestion.bind(this);
    this.refreshAnswers = this.refreshAnswers.bind(this);
    this.editQuestion = this.editQuestion.bind(this);
    this.editAnswer = this.editAnswer.bind(this);
    this.deleteAnswer = this.deleteAnswer.bind(this);
  }

  async componentDidMount() {
    //Change this to change how many reviews displayed per page
    const answersPerPage = 3;

    const {
      match: { params },
    } = this.props;
    const data = await axios.get(
      `http://localhost:8081/Forum/${params.questionId}`
    );

    const question = data.data;
    if (question === undefined) {
      this.setState({ question });
    } else {
      const answers = question.answers;
      const pagedAnswers = answers.slice(0, answersPerPage);

      // answers.sort((r1, r2) => {
      //   let denom1 = r1.upvotes + r1.downvotes;
      //   let denom2 = r2.upvotes + r2.downvotes;

      //   //preventing division by 0
      //   denom1 = denom1 === 0 ? 1 : denom1;
      //   denom2 = denom2 === 0 ? 1 : denom2;
      //   return r2.upvotes / denom2 - r1.upvotes / denom1;
      // });

      this.setState({
        question,
        answers,
        baseAnswers: answers,
        numOfPages: Math.ceil(answers.length / answersPerPage),
        pagedAnswers,
        answersPerPage,
      });
    }
  }

  async refreshQuestion() {
    const {
      match: { params },
    } = this.props;
    const question = (
      await axios.get(`http://localhost:8081/Forum/${params.questionId}`)
    ).data;
    this.setState({ question });
  }

  async refreshAnswers() {
    const {
      match: { params },
    } = this.props;
    const question = (
      await axios.get(`http://localhost:8081/Forum/${params.questionId}`)
    ).data;
    const answers = question.answers;
    // answers.sort((r1, r2) => {
    //   let denom1 = r1.upvotes + r1.downvotes;
    //   let denom2 = r2.upvotes + r2.downvotes;

    //   //preventing division by 0
    //   denom1 = denom1 === 0 ? 1 : denom1;
    //   denom2 = denom2 === 0 ? 1 : denom2;
    //   return r2.upvotes / denom2 - r1.upvotes / denom1;
    // });
    this.setState({
      answers,
      baseAnswers: answers,
      numOfPages: Math.ceil(answers.length / this.state.answersPerPage),
      pagedAnswers: answers.slice(0, this.state.answersPerPage),
    });
  }

  //--- Editing question and answers ----//

  async editQuestion(title, description, hasName, tags) {
    //if (title !== "" && description !== "") {
    // setDisabled(true);
    //--- posting to backend ----//
    await axios.post(
      `http://localhost:8081/Forum/edit/${this.state.question.id}`,
      {
        title: title,
        description: description,
        hasName: hasName,
        tags: tags,
      },
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` },
      }
    );
    await this.refreshQuestion();
    //}
  }

  async editAnswer(answer, hasName, answerID) {
    await axios.post(
      `http://localhost:8081/Forum/editAns/${this.state.question.id}`,
      {
        newAnswer: answer,
        answerId: answerID,
        hasName: hasName,
      },
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` },
      }
    );
    await this.refreshAnswers();
  }

  async deleteAnswer(answerID) {
    await axios.post(
      `http://localhost:8081/Forum/deleteAns/${this.state.question.id}`,
      {
        answerId: answerID,
      },
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` },
      }
    );

    await this.refreshAnswers();
  }

  //--------- Voting -------------//
  /*----- Use QuestionRating.js to change question style and
        AnswerRating.js to change answer style ---------
  */
  // async refreshVotes() {
  //   const data = await axios.get(
  //     `http://localhost:8081/Forum/${this.state.question.id}`
  //   );
  //   const question = data.data;
  //   const answers = question.answers;
  //   this.setState({
  //     question,
  //     answers,
  //   });

  // }

  async upvote(username) {
    await axios.post(`http://localhost:8081/Forum/upvote/${username}`, {
      id: this.state.question.id,
      upvoted: this.state.question.upvoted,
      downvoted: this.state.question.downvoted,
    });
    await this.refreshQuestion();
  }

  async downvote(username) {
    await axios.post(`http://localhost:8081/Forum/downvote/${username}`, {
      id: this.state.question.id,
      upvoted: this.state.question.upvoted,
      downvoted: this.state.question.downvoted,
    });
    await this.refreshQuestion();
  }

  async upvoteAnswer(username, answerId) {
    await axios.post(`http://localhost:8081/Forum/upvoteAns/${username}`, {
      questionId: this.state.question.id,
      answerId: answerId,
      upvoted: this.state.answers[answerId].upvoted,
      downvoted: this.state.answers[answerId].downvoted,
    });
    await this.refreshAnswers();
  }

  async downvoteAnswer(username, answerId) {
    await axios.post(`http://localhost:8081/Forum/downvoteAns/${username}`, {
      questionId: this.state.question.id,
      answerId: answerId,
      upvoted: this.state.answers[answerId].upvoted,
      downvoted: this.state.answers[answerId].downvoted,
    });
    await this.refreshAnswers();
  }

  async submitAnswer(answer, hasName) {
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
    );
    // .then(window.location.reload(false));

    await this.refreshAnswers();
  }

  async deleteTag(index) {
    await axios
      .post(`http://localhost:8081/Forum/deleteTag/${this.state.question.id}`, {
        tagId: index,
      })
      .then(window.location.reload(false));
  }

  handlePageChange(event, value) {
    event.preventDefault();
    const start = this.state.answersPerPage * (value - 1);
    const end = start + this.state.answersPerPage;
    const currPage = value;
    const pagedAnswers = this.state.answers.slice(start, end);
    this.setState({
      currPage,
      pagedAnswers,
    });
  }

  render() {
    const { classes } = this.props;
    // const { question, answers } = this.state;
    if (this.state.question === null) return <p>Loading ...</p>;
    else if (this.state.question === undefined)
      return (
        <p>
          The question either does not exist or is already deleted by author.
        </p>
      );
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="jumbotron col-12">
              <div className={classes.qnButtonHolders}>
                {this.state.question.author === this.state.username && (
                  <EditQuestion
                    question={this.state.question}
                    editQuestion={this.editQuestion}
                  />
                )}
                {this.state.question.author === this.state.username && (
                  <DeleteQuestion question={this.state.question} />
                )}
              </div>
              <h1 className="display-3">{this.state.question.title}</h1>
              <p className="lead">{this.state.question.description}</p>
              {/* NEW DISPLAY HERE */}
              <p className="lead">Posted by {this.state.question.name}</p>
              <div>
                {this.state.question.tags.map((tag) => (
                  <Chip className={classes.tag} key={tag} label={tag} />
                ))}
              </div>
              <RatingBar
                username={this.state.username}
                noOfUpvotes={this.state.question.upvotes}
                noOfDownvotes={this.state.question.downvotes}
                upvote={this.upvote.bind(this)}
                downvote={this.downvote.bind(this)}
                upvotedNames={this.state.question.upvoted}
                downvotedNames={this.state.question.downvoted}
              />
              {/* NEW DISPLAY END */}
              <hr className="my-4" />
              <SubmitAnswer
                questionId={this.state.question.id}
                submitAnswer={this.submitAnswer}
              />
              <p>Answers:</p>
              {this.state.pagedAnswers.map((answer) => (
                <div className="lead" key={answer.id}>
                  {answer.answer}
                  <div className={classes.ansButtonHolders}>
                    <AnswerRatingBar
                      username={this.state.username}
                      noOfUpvotes={answer.upvotes}
                      noOfDownvotes={answer.downvotes}
                      upvote={this.upvoteAnswer.bind(this)}
                      downvote={this.downvoteAnswer.bind(this)}
                      upvotedNames={answer.upvoted}
                      downvotedNames={answer.downvoted}
                      answerId={answer.id}
                    />
                    {answer.author === this.state.username && (
                      <EditAnswer
                        questionID={this.state.question.id}
                        answers={this.state.answers}
                        answerId={answer.id}
                        editAnswer={this.editAnswer}
                      />
                    )}
                    {answer.author === this.state.username && (
                      <DeleteAnswer
                        question={this.state.question}
                        answerId={answer.id}
                        deleteAnswer={this.deleteAnswer}
                      />
                    )}
                  </div>

                  <h6>Posted by {answer.name}</h6>
                  <hr />
                </div>
              ))}
              <div className={classes.pagination}>
                <Pagination
                  count={this.state.numOfPages}
                  page={this.state.currPage}
                  onChange={this.handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyle)(Question);
