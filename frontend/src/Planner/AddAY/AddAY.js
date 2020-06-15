import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";

// to do: add props and state (mainly to store AYs data)

const useStyles = makeStyles((theme) => ({
  titleHolder: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(5),
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
}));

export default function AddAY() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.titleHolder}>
        <Typography variant="h5">
          Add your Academic Year to your planner.
        </Typography>
      </div>
      <FormControl
        className={clsx(classes.root, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="add-academic-year">Add Academic Year</InputLabel>
        <OutlinedInput
          id="add-academic-year"
          //          onChange={}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="submit AY"
                //         onClick={}
                //    onMouseDown={}
                edge="end"
              >
                <AddIcon />
              </IconButton>
            </InputAdornment>
          }
          labelWidth={140}
        />
      </FormControl>
    </div>
  );
}
