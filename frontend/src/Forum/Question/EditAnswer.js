import React from "react";

//----- styles -----//
import { makeStyles } from "@material-ui/core/styles";
//----- MUI ------//
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  text: {
    marginTop: theme.spacing(2),
  },
  degree: {
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  alert: {
    margin: theme.spacing(1),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function EditAnswer({ answers, answerId, editAnswer }) {
  //-- opening and closing --//
  const [open, setOpen] = React.useState(false);
  // const [disabled, setDisabled] = React.useState(false);
  //----- styles -----//
  const classes = useStyles();
  //---- For compulsory fields ----//
  const [answer, setAnswer] = React.useState(answers[answerId].answer);
  const [hasName, setHasName] = React.useState(
    answers[answerId].name === "Anonymous" ? false : true
  );
  //---- Alerts ----//
  const [noAnswer, setNoAnswer] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleEdit = (event) => {
    //event.preventDefault();
    if (answer === "") {
      handleNoAnswer();
    } else {
      editAnswer(answer, hasName, answerId);
      handleSuccess();
      handleClose();
    }
  };
  const handleClickOpen = () => {
    console.log(answers[answerId]);

    setOpen(true);
  };

  const handleClose = () => {
    // setAnswer(question.answers[answerId].answer);
    // setHasName(question.answers[answerId].name === "Anonymous" ? false : true);
    setOpen(false);
  };

  const updateAnswer = (value) => {
    setAnswer(value);
  };

  const handleChange = (event) => {
    if (event.target.value === "yes") {
      setHasName(false);
    } else {
      setHasName(true);
    }
  };

  //------ Alert handlers------//
  const handleNoAnswer = () => {
    setNoAnswer(true);
  };

  const handleSuccess = () => {
    setSuccess(true);
  };

  const handleAlertClose = () => {
    setNoAnswer(false);
    setSuccess(false);
  };

  return (
    <div className={classes.root}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Editting your answer</DialogTitle>
        <DialogContent>
          <label htmlFor="exampleInputEmail1">Answer:</label>
          <textarea
            // disabled={disabled}
            type="text"
            onBlur={(e) => {
              updateAnswer(e.target.value);
            }}
            className="form-control"
            placeholder="Please type an answer."
            defaultValue={answer}
          />
          <DialogContentText className={classes.text}>
            Would you like to post anonymously?
          </DialogContentText>
          <form className="form-group" noValidate autoComplete="off">
            <RadioGroup
              name="hasName"
              valueselected={hasName.toString()}
              onChange={handleChange}
              defaultValue={
                answers[answerId].name === "Anonymous" ? "yes" : "no"
              }
              controlled="true"
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit} color="primary" variant="contained">
            Edit
          </Button>
          <Button onClick={handleClose} color="default" variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={noAnswer}
        autoHideDuration={3000}
        onClose={handleAlertClose}
      >
        <Alert className={classes.alert} onClose={handleClose} severity="error">
          Please enter an answer.
        </Alert>
      </Snackbar>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleAlertClose}
      >
        <Alert
          className={classes.alert}
          onClose={handleClose}
          severity="success"
        >
          Your answer has been updated.
        </Alert>
      </Snackbar>
    </div>
  );
}
