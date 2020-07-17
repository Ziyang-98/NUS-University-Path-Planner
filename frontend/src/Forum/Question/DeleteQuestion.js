import React from "react";
import axios from "axios";
import auth0Client from "../../Auth";
//----- styles -----//
import { makeStyles } from "@material-ui/core/styles";
//----- MUI ------//
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";

// import { red } from "@material-ui/core/colors";
import { Redirect } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  degree: {
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
}));

export default function DeleteQuestion({ question }) {
  //-- opening and closing -------//
  const [open, setOpen] = React.useState(false);
  // const [disabled, setDisabled] = React.useState(false);
  //----- styles ---------//
  const classes = useStyles();
  //------- used to redirect  ------//
  const [redirect, setRedirect] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    // setDisabled(true);
    //--- posting to backend ----//
    await axios.post(`http://localhost:8081/Forum/delete/${question.id}`, {
      headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` },
    });

    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={`/Forum`} />;
  } else {
    return (
      <div className={classes.root}>
        <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
          Delete this question
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle>
            Are you sure that you want to delete this question
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Deleted questions will not be available and cannot be recovered.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDelete}
              color="secondary"
              variant="contained"
            >
              Delete
            </Button>
            <Button onClick={handleClose} color="grey" variant="contained">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
