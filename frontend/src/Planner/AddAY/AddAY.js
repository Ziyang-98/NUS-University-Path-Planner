import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = (theme) => ({
  titleHolder: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(20),
  },
  infoHolder: {
    margin: theme.spacing(2),
    marginLeft: theme.spacing(20),
  },
  root: {
    "& > *": {
      margin: theme.spacing(2),
      marginLeft: theme.spacing(25),
      width: "34ch",
    },

    textField: {
      width: "25ch",
    },
  },
  alert: {
    marginBottom: theme.spacing(2),
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class AddAY extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      /*----Alert Conditions----*/
      added: false,
      wrongFormat: false,
      sameYear: false,
      emptyInput: false,
      displayYear: "",
    };

    this.handleAdded = this.handleAdded.bind(this);
    this.handleWrongFormat = this.handleWrongFormat.bind(this);
    this.handleSameYear = this.handleSameYear.bind(this);
    this.handleEmptyInput = this.handleEmptyInput.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  updateInput(acadYear) {
    this.setState({
      input: acadYear,
    });
  }

  /*----Handle Alerts----*/

  handleAdded() {
    this.setState({
      added: true,
    });
  }

  handleWrongFormat() {
    this.setState({
      wrongFormat: true,
    });
  }

  handleSameYear() {
    this.setState({
      sameYear: true,
    });
  }

  handleEmptyInput() {
    this.setState({
      emptyInput: true,
    });
  }

  handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    if (this.state.added) {
      this.setState({
        added: false,
      });
    }
    if (this.state.wrongFormat) {
      this.setState({
        wrongFormat: false,
      });
    }
    if (this.state.sameYear) {
      this.setState({
        sameYear: false,
      });
    }
    if (this.state.emptyInput) {
      this.setState({
        emptyInput: false,
      });
    }
  }

  submit() {
    const AY =
      "AY" +
      this.state.input +
      "/" +
      (parseInt(this.state.input) + 1).toString();

    if (this.state.input === "") {
      this.handleEmptyInput();
    } else if (this.props.moduleList.hasOwnProperty(AY + "1")) {
      this.setState({ displayYear: AY });
      this.handleSameYear();
    } else if (
      this.state.input.length === 2 &&
      !isNaN(this.state.input.slice(0))
    ) {
      this.props.submitAY(AY);
      this.setState({ displayYear: AY });
      this.handleAdded();
      this.setState({ input: "" });
    } else {
      this.handleWrongFormat();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.titleHolder}>
          <Typography variant="h5">
            Add an Academic Year to your planner.
          </Typography>
          <div className={classes.infoHolder}></div>
        </div>
        <div className={classes.infoHolder}>
          <Typography variant="subtitle1">
            Instructions: Input the first two digits of the AY
          </Typography>
          <Typography variant="subtitle1">
            (Example: Enter 19 for AY19/20)
          </Typography>
        </div>
        <FormControl
          className={clsx(classes.root, classes.textField)}
          variant="outlined"
        >
          <InputLabel htmlFor="add-academic-year">AY</InputLabel>
          <OutlinedInput
            id="add-academic-year"
            value={this.state.input}
            onChange={(e) => {
              this.updateInput(e.target.value);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="submit AY"
                  onClick={() => {
                    this.submit();
                  }}
                  //    onMouseDown={}
                  edge="end"
                >
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={20}
          />
        </FormControl>
        {/*----Alerts----*/}
        <Snackbar
          open={this.state.added}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <Alert
            className={classes.alert}
            onClose={this.handleClose}
            severity="success"
          >
            {this.state.displayYear} added to your planner!
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.wrongFormat}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <Alert
            className={classes.alert}
            onClose={this.handleClose}
            severity="error"
          >
            Wrong format! Please input the correct format for AY.
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.sameYear}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <Alert
            className={classes.alert}
            onClose={this.handleClose}
            severity="error"
          >
            {this.state.displayYear} has already been added to your planner!
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.emptyInput}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <Alert
            className={classes.alert}
            onClose={this.handleClose}
            severity="error"
          >
            Please input an academic year!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(useStyles)(AddAY);
