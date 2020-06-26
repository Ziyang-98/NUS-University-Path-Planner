import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

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
  major: {
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
}));

export default function ExportButton({ exportPlanner }) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [major, setMajor] = React.useState("");
  const [description, setDescription] = React.useState("");
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleMajorChange = (event) => {
    setMajor(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleExport = () => {
    if (title !== "" && major !== "" && description !== "") {
      console.log(description);
      exportPlanner(title, major, description);
      setMajor("");
      setDescription("");
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
            Please add a title, your major and a description to your guide.
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
              id="major"
              className={classes.major}
              label="Major"
              multiline
              rowsMax={4}
              value={major}
              onChange={handleMajorChange}
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
    </div>
  );
}
