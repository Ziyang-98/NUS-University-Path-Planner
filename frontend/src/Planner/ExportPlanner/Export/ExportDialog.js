import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { FormControlLabel } from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
    width: "300px",
  },
  degree: {
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  otherDetails: {
    marginTop: theme.spacing(2),
  },
  stepper: {
    width: "100%",
  },
  buttons: {
    margin: theme.spacing(2),
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  cancelButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  alert: {
    marginBottom: theme.spacing(2),
  },
}));

function getSteps() {
  return [
    "Add title and description",
    "Add your field of study",
    "Add additional relevant details",
  ];
}

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ExportDialog({
  exportPlanner,
  degrees,
  open,
  handleClose,
}) {
  //   const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [major, setMajor] = React.useState(null);
  const [description, setDescription] = React.useState("");
  const [hasSecondDegree, setHasSecondDegree] = React.useState(false);
  const [secondDegree, setSecondDegree] = React.useState("");
  const [typeOfSecondDegree, setTypeOfSecondDegree] = React.useState("");
  const [hasHallRC, setHasHallRC] = React.useState(false);
  const [hallRC, setHallRC] = React.useState(null);

  /*----Alert Conditions----*/
  const [noTitle, setNoTitle] = React.useState(false);
  const [noDescription, setNoDescription] = React.useState(false);
  const [noMajor, setNoMajor] = React.useState(false);
  const [noSecondMajor, setNoSecondMajor] = React.useState(false);
  const [noHallRC, setNoHallRC] = React.useState(false);

  const classes = useStyles();

  const reset = () => {
    setTitle("");
    setMajor(null);
    setDescription("");
    setHasSecondDegree(false);
    setSecondDegree("");
    setTypeOfSecondDegree("");
    setHasHallRC(false);
    setHallRC("");
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
    if (value === "") {
      setSecondDegree("");
      setTypeOfSecondDegree("");
      setHasSecondDegree(false);
    } else {
      setTypeOfSecondDegree(value);
      setHasSecondDegree(true);
    }
  };

  const handleSecondDegree = (event) => {
    console.log(event.target.value);
    setSecondDegree(event.target.value);
  };

  const handleHasHallRC = (event) => {
    setHasHallRC(event.target.checked);
  };

  const handleHallRCChange = (value) => {
    setHallRC(value);
  };

  const handleExport = () => {
    if (hasHallRC && hallRC === null) {
      handleNoHallRC();
      return;
    }

    if (title !== "" && major !== "" && description !== "") {
      const tags = [];
      if (secondDegree !== "" && typeOfSecondDegree !== "") {
        if (typeOfSecondDegree === "doubleDegree") {
          tags.push("Double Degree");
        } else if (typeOfSecondDegree === "doubleMajor") {
          tags.push("Double Major");
        } else if (typeOfSecondDegree === "minor") {
          tags.push("Minor");
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

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    // if (title !== "" && description !== "") {
    //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // }
    console.log(secondDegree);
    console.log(hasSecondDegree);
    if (title === "" && activeStep === 0) {
      handleNoTitle();
      if (description === "") {
        handleNoDescription();
      }
    } else if (description === "") {
      handleNoDescription();
    } else if (major === null && activeStep === 1) {
      handleNoMajor();
      if (hasSecondDegree && secondDegree === "") {
        handleNoSecondMajor();
      }
    } else if (hasSecondDegree && secondDegree === "") {
      handleNoSecondMajor();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //   const handleReset = () => {
  //     setActiveStep(0);
  //     reset();
  //   };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <DialogTitle id="form-dialog-title-step0">
              Add title and desciption
            </DialogTitle>

            <DialogContent>
              <DialogContentText>
                Add a title, description to your guide for other users to view
                and understand your guide.
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
                  rows={4}
                  rowsMax={10}
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </form>
            </DialogContent>
          </div>
        );
      case 1:
        return (
          <div>
            <DialogTitle id="form-dialog-title-step1">
              Add your field of study
            </DialogTitle>

            <DialogContent>
              <DialogContentText>
                Select your major, as well as relevant fields of your studies.
              </DialogContentText>
              <form noValidate autoComplete="off">
                <div className={classes.otherDetails}>
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
                  <RadioGroup
                    name="secondDegree"
                    valueselected={secondDegree}
                    onChange={handleHasSecondDegree}
                    defaultValue=""
                  >
                    <FormControlLabel
                      value=""
                      control={<Radio color="primary" />}
                      label="None"
                      labelPlacement="end"
                    />
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
                  </RadioGroup>
                </div>
              </form>
            </DialogContent>
          </div>
        );
      case 2:
        return (
          <div>
            <DialogTitle id="form-dialog-title-step2">
              Add additional relevant details
            </DialogTitle>

            <DialogContent>
              <DialogContentText>
                Please add additional information if any.
              </DialogContentText>
              <form noValidate autoComplete="off">
                <div>
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
                </div>
              </form>
            </DialogContent>
          </div>
        );

      default:
        return <div>Unknown Step</div>;
    }
  };

  /*----Handle Alerts----*/
  const handleNoTitle = () => {
    setNoTitle(true);
  };

  const handleNoDescription = () => {
    setNoDescription(true);
  };

  const handleNoMajor = () => {
    setNoMajor(true);
  };

  const handleNoSecondMajor = () => {
    setNoSecondMajor(true);
  };

  const handleNoHallRC = () => {
    setNoHallRC(true);
  };

  const handleAlertClose = () => {
    setNoTitle(false);
    setNoDescription(false);
    setNoMajor(false);
    setNoSecondMajor(false);
    setNoHallRC(false);
  };

  const getDisplayLabel = () => {
    if (noMajor || noSecondMajor) {
      return noMajor && noSecondMajor
        ? "Please select your major and enter your second field of study."
        : noMajor
        ? "Please select your major."
        : "Please enter your second field of study.";
    } else if (noTitle || noDescription) {
      return noTitle && noDescription
        ? "Please enter a title and a description for your guide."
        : noTitle
        ? "Please enter a title for your guide."
        : "Please enter a description for your guide.";
    } else if (noHallRC) {
      return "Please select a Hall/RC.";
    }
    // else {
    //   return "Unknown Error";
    // }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <DialogContent>
          {
            // Populate the content pane based on the active step
            getStepContent(activeStep)
          }
          <div className={classes.stepper}>
            <div>
              <div>
                <div className={classes.buttons} align="right">
                  <Button
                    className={classes.cancelButton}
                    onClick={handleClose}
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={
                      activeStep === steps.length - 1
                        ? handleExport
                        : handleNext
                    }
                  >
                    {activeStep === steps.length - 1 ? "Export" : "Next"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/*----Alerts----*/}
      <Snackbar
        open={noTitle || noDescription || noMajor || noSecondMajor || noHallRC}
        autoHideDuration={3000}
        onClose={handleAlertClose}
      >
        <Alert
          className={classes.alert}
          onClose={handleAlertClose}
          severity="error"
        >
          {getDisplayLabel()}
        </Alert>
      </Snackbar>
    </div>
  );
}
