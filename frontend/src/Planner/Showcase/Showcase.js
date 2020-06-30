import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import auth0Client from "../../Auth";

const useStyles = makeStyles((theme) => ({
  notSignIn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: theme.spacing(10),
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: theme.spacing(10),
  },
  name: {
    fontWeight: 500,
  },
}));

export default function Showcase() {
  const classes = useStyles();
  return (
    <Container width="auto" className={classes.container}>
      <div>
        {!auth0Client.isAuthenticated() && (
          <div className={classes.notSignIn}>
            <Typography variant="h3">
              Welcome, please sign in to start planning!
            </Typography>
          </div>
        )}
        {auth0Client.isAuthenticated() && (
          <Typography variant="h4">
            Welcome
            <Typography
              variant="h3"
              component="span"
              color="primary"
              className={classes.name}
            >
              {" "}
              {auth0Client.getProfile().name}
            </Typography>
            , you can plan your modules here!
          </Typography>
        )}
      </div>
    </Container>
  );
}
