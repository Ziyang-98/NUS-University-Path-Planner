import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import { withRouter } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: theme.spacing(5),
  },
  button: {
    margin: theme.spacing(2),
  },
  alert: {
    marginBottom: theme.spacing(2),
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class UpdateButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      delete: false,
      update: false,
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.delete = this.delete.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAlertClose = this.handleAlertClose.bind(this);
  }

  async delete() {
    await axios.post(
      `http://localhost:8081/editGuide/delete/${this.props.username}`
    );
    this.handleClose();
    this.props.history.push("/Planner");
  }

  handleUpdate() {
    this.props.update();
    this.setState({ update: true });
  }

  handleCancel() {
    this.props.history.push("/Planner");
  }

  handleDelete() {
    this.setState({ delete: true });
  }

  handleClose() {
    this.setState({ delete: false });
  }

  handleAlertClose() {
    this.setState({ update: false });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={this.handleUpdate}
        >
          Update
        </Button>
        {/* <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          startIcon={<CancelIcon />}
          onClick={this.handleCancel}
        >
          Cancel
        </Button> */}
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={this.handleDelete}
        >
          Delete
        </Button>
        <Dialog
          open={this.state.delete}
          onClose={this.handleClose}
          aria-labelledby="alert-user-title"
          aria-describedby="alert-user-description1"
        >
          <DialogTitle id="alert-user-title">
            {"Are you sure you want to delete your current guide? "}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Once deleted, your guide will be permanantly removed from the
              Reviews Page and you will be redirected back to your planner.
            </DialogContentText>

            <DialogContentText>Press delete to proceed.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="default">
              Cancel
            </Button>
            <Button
              onClick={this.delete}
              variant="contained"
              color="secondary"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={this.state.update}
          autoHideDuration={3000}
          onClose={this.handleAlertClose}
        >
          <Alert
            className={classes.alert}
            onClose={this.handleAlertClose}
            severity="success"
          >
            Your guide has been successfully updated!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
export default withStyles(useStyles)(withRouter(UpdateButtons));
