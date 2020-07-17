import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { FormControlLabel } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  secondTextfield: {
    marginTop: theme.spacing(2),
  },
  radioOptions: {
    marginTop: theme.spacing(2),
  },
}));

const hallRCs = [
  "Eusoff Hall",
  "Kent Ridge Hall",
  "King Edward VII Hall",
  "Raffles Hall",
  "Sheares Hall",
  "Temasek Hall",
  "PGP House",
  "Ridge View Residential College (RVRC)",
  "College of Alice and Peter Tan (CAPT)",
  "Residential College 4 (RC4)",
  "Tembusu College",
  "University Scholars Programme (USP)",
];

export default function Filter({ filterReviews, degrees, handleReset }) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [major, setMajor] = useState(null);
  const [secondDegree, setSecondDegree] = useState("");
  const [typeOfSecondDegree, setTypeOfSecondDegree] = useState("");
  const [hallRC, setHallRC] = useState(null);
  // const [hasSecondDegree, setHasSecondDegree] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    handleFormReset();
  };

  const handleFilter = (event) => {
    event.preventDefault();
    const tagsToFilter = [];
    if (major !== null) {
      tagsToFilter.push(major);
    }
    if (secondDegree !== "") {
      tagsToFilter.push(secondDegree);
    }
    if (typeOfSecondDegree !== "") {
      tagsToFilter.push(typeOfSecondDegree);
    }
    if (hallRC !== null) {
      tagsToFilter.push(hallRC);
    }
    filterReviews(tagsToFilter);
    handleClose();
  };

  const handleMajorChange = (value) => {
    setMajor(value);
  };

  const handleHallRCChange = (value) => {
    setHallRC(value);
  };

  const handleHasSecondDegree = (event) => {
    const value = event.target.value;
    if (value === "") {
      setSecondDegree("");
      setTypeOfSecondDegree("");
      // setHasSecondDegree(false);
    } else {
      setTypeOfSecondDegree(value);
      // setHasSecondDegree(true);
    }
  };

  const handleSecondDegree = (event) => {
    setSecondDegree(event.target.value);
  };

  const handleFormReset = () => {
    setMajor(null);
    setSecondDegree("");
    setTypeOfSecondDegree("");
    setHallRC(null);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
        >
          Filter{" "}
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        // fullWidth
        // maxWidth="md"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Filter reviews by tags</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <Autocomplete
              className={classes.degree}
              id="combo-box-demo"
              name="major"
              defaultValue="None"
              value={major}
              onChange={(event, newValue) => handleMajorChange(newValue)}
              options={degrees}
              getOptionLabel={(option) => option}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Enter the primary major"
                  variant="outlined"
                />
              )}
            />
            <TextField
              id="secondDegree"
              name="secondDegree"
              className={classes.secondTextfield}
              label={
                typeOfSecondDegree === ""
                  ? "Select an additional field of study."
                  : typeOfSecondDegree === "Double Degree"
                  ? "Enter your second degree."
                  : typeOfSecondDegree === "Double Major"
                  ? "Enter your second major."
                  : typeOfSecondDegree === "minor"
                  ? "Enter your minor."
                  : "Unknown Error"
              }
              fullWidth
              multiline
              rowsMax={4}
              value={secondDegree}
              onChange={handleSecondDegree}
              variant="outlined"
              disabled={typeOfSecondDegree === ""}
            />
            <RadioGroup
              name="typeOfSecondDegree"
              className={classes.radioOptions}
              valueselected={typeOfSecondDegree}
              onChange={handleHasSecondDegree}
            >
              <FormControlLabel
                value=""
                control={<Radio color="primary" />}
                label="None"
                labelPlacement="end"
                checked={typeOfSecondDegree === ""}
              />
              <FormControlLabel
                value="Double Degree"
                control={<Radio color="primary" />}
                label="Double Degree"
                labelPlacement="end"
              />
              <FormControlLabel
                value="Double Major"
                control={<Radio color="primary" />}
                label="Double Major"
                labelPlacement="end"
              />
              <FormControlLabel
                value="minor"
                control={<Radio color="primary" />}
                label="Minor"
                labelPlacement="end"
              />
            </RadioGroup>
            <Autocomplete
              className={classes.degree}
              id="combo-box-demo"
              name="hallRC"
              value={hallRC}
              onChange={(event, newValue) => handleHallRCChange(newValue)}
              options={hallRCs}
              getOptionLabel={(option) => option}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Enter any Hall/RCs (Optional)" />
              )}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleClose} variant="contained">
            Cancel
          </Button>
          <Button type="submit" onClick={handleFilter} variant="contained">
            Filter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
