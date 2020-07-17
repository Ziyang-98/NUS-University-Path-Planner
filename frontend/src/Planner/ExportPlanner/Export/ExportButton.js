import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ExportDialog from "./ExportDialog";

const useStyles = (theme) => ({
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
});

class ExportButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    const open = true;
    this.setState({ open });
  }

  handleClose() {
    const open = false;
    this.setState({ open });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Button variant="outlined" color="primary" onClick={this.handleOpen}>
          Export Planner As a Guide
        </Button>
        <ExportDialog
          degrees={this.props.degrees}
          exportPlanner={this.props.exportPlanner}
          open={this.state.open}
          handleClose={this.handleClose.bind(this)}
        />
      </div>
    );
  }
}

export default withStyles(useStyles)(ExportButton);
