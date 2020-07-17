import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

//---- For anonymous -----//
import { DialogContentText, FormControlLabel } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = (theme) => ({
  alert: {
    margin: theme.spacing(1),
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class SubmitAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: "",
      hasName: true,
      noAnswer: false,
      success: false,
    };
    //binded handle change
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  updateAnswer(value) {
    this.setState({
      answer: value,
    });
  }

  //----- Radio button control -----//
  handleChange(event) {
    if (event.target.value === "yes") {
      this.setState({
        hasName: false,
      });
    } else {
      this.setState({
        hasName: true,
      });
    }
  }

  submit(event) {
    event.preventDefault();
    if (this.state.answer === "") {
      this.handleNoAnswer();
    } else {
      this.props.submitAnswer(this.state.answer, this.state.hasName);

      this.setState({
        answer: "",
        hasName: true,
      });
      this.handleSuccess();
    }
  }
  //------ Alerts ------//
  handleNoAnswer() {
    this.setState({ noAnswer: true });
  }

  handleSuccess() {
    this.setState({ success: true });
  }

  handleClose() {
    this.setState({ noAnswer: false });
    this.setState({ success: false });
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className="form-group text-left">
          <label htmlFor="exampleInputEmail1">Answer:</label>
          <textarea
            type="text"
            onChange={(e) => {
              this.updateAnswer(e.target.value);
            }}
            className="form-control"
            placeholder="Share your answer."
            value={this.state.answer}
            rows="4"
          />
        </div>
        {/*  Anonymous Control  */}
        <DialogContentText>
          Would you like to post anonymously?
        </DialogContentText>
        <form className="form-group" noValidate autoComplete="off">
          <RadioGroup
            name="hasName"
            valueselected={this.state.hasName.toString()}
            onChange={this.handleChange}
            defaultValue="no"
          >
            <FormControlLabel
              value="yes"
              control={<Radio color="primary" />}
              label="Yes"
              labelPlacement="end"
            />
            <FormControlLabel
              value="no"
              control={<Radio color="primary" />}
              label="No"
              labelPlacement="end"
            />
          </RadioGroup>
        </form>
        <button className="btn btn-primary" onClick={this.submit}>
          Submit
        </button>
        <hr className="my-4" />
        <Snackbar
          open={this.state.noAnswer}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <Alert
            className={classes.alert}
            onClose={this.handleClose}
            severity="error"
          >
            Please enter an answer.
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.success}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <Alert
            className={classes.alert}
            onClose={this.handleClose}
            severity="success"
          >
            Your answer is successfully submitted.
          </Alert>
        </Snackbar>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(withRouter(SubmitAnswer));
