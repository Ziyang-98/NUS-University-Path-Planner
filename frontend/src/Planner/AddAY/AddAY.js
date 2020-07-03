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
});

class AddAY extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
    };
  }
  updateInput(acadYear) {
    this.setState({
      input: acadYear,
    });
  }

  submit() {
    if (
      this.state.input.length === 2 &&
      !isNaN(this.state.input.slice(0))
    ) {
      this.props.submitAY(this.state.input + "/" + (parseInt(this.state.input) + 1).toString());
      this.setState({
        input: "",
      });
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
          <Typography variant="subtitle1">(Example: Enter 19 for AY19/20)</Typography>
        </div>
        <FormControl
          className={clsx(classes.root, classes.textField)}
          variant="outlined"
        >
          <InputLabel htmlFor="add-academic-year">AY--/--</InputLabel>
          <OutlinedInput
            id="add-academic-year"
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
            labelWidth={40}
          />
        </FormControl>
      </div>
    );
  }
}

export default withStyles(useStyles)(AddAY);
