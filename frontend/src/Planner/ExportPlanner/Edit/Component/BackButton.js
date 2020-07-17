import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { withRouter } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = (theme) => ({
  root: {},
});

class BackButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  handleBack() {
    this.props.history.push("/Planner");
  }

  handleOpen() {
    if (this.props.edited) {
      this.setState({ open: true });
    } else {
      this.handleBack();
    }
  }

  handleClose() {
    this.setState({ open: false });
  }

  goBack() {
    this.handleClose();
    this.handleBack();
  }

  render() {
    const { classes } = this.props;
    return (
      <Container width="auto" className={classes.container}>
        <div>
          <Button
            variant="outlined"
            color="default"
            //className={classes.button}
            startIcon={<ArrowBackIcon />}
            onClick={this.handleOpen}
          >
            Move back to Planner
          </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-user-title"
            aria-describedby="alert-user-description"
          >
            <DialogTitle id="alert-user-title">
              {"Are you sure you want to go back?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-user-description">
                You might lose all the unsaved edits if you choose to go back
                now.
              </DialogContentText>

              <DialogContentText id="alert-user-description">
                If you wish to save your edits please update your guide.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={this.goBack}
                color="primary"
                autoFocus
              >
                Go back
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(withRouter(BackButton));
