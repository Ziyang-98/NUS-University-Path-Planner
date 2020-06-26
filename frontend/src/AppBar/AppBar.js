import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Menu from "./Menu";
import auth0Client from "../Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  const signOut = () => {
    auth0Client.signOut();
    props.history.replace("/");
  };

  return (
    <div edge="start" color="inherit" className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Menu className={classes.menuButton}></Menu>
          <Typography variant="h6" className={classes.title}>
            Mod Planner
          </Typography>
          {!auth0Client.isAuthenticated() && (
            <Button color="inherit" onClick={auth0Client.signIn}>
              Sign In
            </Button>
          )}
          {auth0Client.isAuthenticated() && (
            <div>
              <label className="mr-2 text-secondary">
                {auth0Client.getProfile().name}
              </label>
              <Button
                color="inherit"
                onClick={() => {
                  signOut();
                }}
              >
                Sign Out
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
