import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
//---- For anonymous -----//
import { DialogContentText, FormControlLabel } from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

class SubmitAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: "",
      hasName: true,
    };
    //binded handle change
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
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
      })
    } else {
      this.setState({
        hasName: true,
      })
    }
  }

  submit() {
    console.log("inside submit answer submit")
    if (this.state.answer.length !== 0) {
      this.props.submitAnswer(this.state.answer, this.state.hasName);

      this.setState({
        answer: "",
        hasName: true,
      });
    }
  }

  render() {
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
            valueSelected={this.state.hasName}
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
        <button
          className="btn btn-primary"
          onClick={this.submit}
        >
          Submit
        </button>
        <hr className="my-4" />
      </Fragment>
    );
  }
}

export default withRouter(SubmitAnswer);
