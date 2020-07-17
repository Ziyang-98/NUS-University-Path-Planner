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

// import { red } from "@material-ui/core/colors";

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

export default function DeleteAnswer({ answerId, deleteAnswer }) {
  //-- opening and closing -------//
  const [open, setOpen] = React.useState(false);
  // const [disabled, setDisabled] = React.useState(false);
  //----- styles ---------//
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteAnswer(answerId);
    handleClose();
  };

  return (
    <div className={classes.root}>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Delete this answer
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>
          Are you sure that you want to delete this answer?
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Deleted answers will not be available and cannot be recovered.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDelete} color="secondary" variant="contained">
            Delete
          </Button>
          <Button onClick={handleClose} color="default" variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
