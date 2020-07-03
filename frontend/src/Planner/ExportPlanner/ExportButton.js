import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { FormControlLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(10),
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  degree: {
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
}));

export default function ExportButton({ exportPlanner, degrees }) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [major, setMajor] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [hasSecondDegree, setHasSecondDegree] = React.useState(false);
  const [secondDegree, setSecondDegree] = React.useState("");
  const [typeOfSecondDegree, setTypeOfSecondDegree] = React.useState("");
  const [hasHallRC, setHasHallRC] = React.useState(false);
  const [hallRC, setHallRC] = React.useState("");
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

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
    "University Scholars Programme (USP)"
  ]

  const reset = () => {
    setTitle("");
    setMajor("");
    setDescription("");
    setHasSecondDegree(false);
    setSecondDegree("");
    setTypeOfSecondDegree("");
    setHasHallRC(false);
    setHallRC("");
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleMajorChange = (value) => {
    setMajor(value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleHasSecondDegree = (event) => {
    const value = event.target.value;
    console.log(value);
    if (value === "") {
      setSecondDegree("");
      setTypeOfSecondDegree("");
      setHasSecondDegree(false);
    } else {
      setTypeOfSecondDegree(value);
      setHasSecondDegree(true);
    }
  }

  const handleSecondDegree = (event) => {
    setSecondDegree(event.target.value);
  };

  const handleHasHallRC = (event) => {
    setHasHallRC(event.target.checked)
  }

  const handleHallRCChange = (value) => {
    setHallRC(value);
  }

  const handleExport = () => {
    if (title !== "" && major !== "" && description !== "") {
      const tags = [];
      if (secondDegree !== "" && typeOfSecondDegree !== "") {
        if (typeOfSecondDegree === "doubleDegree") {
          tags.push("Double Degree");
        } else if (typeOfSecondDegree === "doubleMajor") {
          tags.push("Double Major");
        } else if (typeOfSecondDegree === "minor") {
          tags.push("Minor")
        }
        tags.push(secondDegree);
      }
      if (hallRC !== "") {
        tags.push(hallRC);
      }
      tags.push(major);

      exportPlanner(title, major, description, tags);
      reset();
    }
    handleClose();
  };

  return (
    <div className={classes.root}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Export Planner As a Guide
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add description</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add a title, description, and your primary major to your guide.
          </DialogContentText>
          <form noValidate autoComplete="off">
            <TextField
              id="title"
              className={classes.title}
              label="Title"
              multiline
              rowsMax={4}
              value={title}
              onChange={handleTitleChange}
            />
            <TextField
              id="description"
              label="Description"
              fullWidth
              multiline
              rowsMax={4}
              value={description}
              onChange={handleDescriptionChange}
            />
            <div>
              <br />
            </div>

            <Autocomplete
              className={classes.degree}
              id="combo-box-demo"
              value={major}
              onChange={(event, newValue) => handleMajorChange(newValue)}
              options={degrees}
              getOptionLabel={(option) => option}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Enter your primary degree here"
                  variant="outlined"
                />
              )}
            />

            <DialogContentText>
              Select the options which are applicable (optional):
              </DialogContentText>
            <TextField
              id="secondDegree"
              className={classes.secondDegree}
              label="Enter the degree here"
              multiline
              rowsMax={4}
              value={secondDegree}
              onChange={handleSecondDegree}
              disabled={!hasSecondDegree}
              variant={hasSecondDegree ? "outlined" : "filled"}
            />
            <RadioGroup name="secondDegree" valueSelected={secondDegree} onChange={handleHasSecondDegree} defaultValue="">
              <FormControlLabel
                value="doubleDegree"
                control={<Radio color="primary" />}
                label="Double Degree"
                labelPlacement="end"
              />
              <FormControlLabel
                value="doubleMajor"
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
              <FormControlLabel
                value=""
                control={<Radio color="primary" />}
                label="None"
                labelPlacement="end"
              />
            </RadioGroup>
            <FormControlLabel
              value="hallRC"
              control={<Checkbox color="primary" />}
              label="Hall/Residential Colleges"
              labelPlacement="end"
              onChange={handleHasHallRC}
            />

            <Autocomplete
              className={classes.degree}
              id="combo-box-demo"
              value={hallRC}
              onChange={(event, newValue) => handleHallRCChange(newValue)}
              options={hallRCs}
              getOptionLabel={(option) => option}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose your Hall/RC here"
                  variant={hasHallRC ? "outlined" : "filled"}
                />
              )}
              disabled={!hasHallRC}
            />


          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleExport} color="primary">
            Export
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}
