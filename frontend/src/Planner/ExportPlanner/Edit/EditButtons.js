import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";

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
  button: {
    margin: theme.spacing(1),
  },
});

class EditButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  render() {
    const { classes, username } = this.props;
    return (
      <div className={classes.root}>
        <Link href={`/Guides/${username}`}>
          <Button variant="outlined" className={classes.button} color="primary">
            View Your Guide
          </Button>
        </Link>
        <Link href={`/EditGuide/${username}`}>
          <Button variant="outlined" className={classes.button} color="primary">
            Edit Guide
          </Button>
        </Link>
      </div>
    );
  }
}

export default withStyles(useStyles)(EditButtons);
