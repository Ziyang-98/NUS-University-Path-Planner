import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Logo from "../Images/logo3.png";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  imageContent: {
    padding: theme.spacing(25, 0, 5),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 20),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

export default function Homw() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}

        <div className={classes.heroContent}>
          <div className={classes.imageContent}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <img src={Logo} alt="app logo" />
            </Box>
          </div>
          <Container maxWidth="sm">
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Start planning your modules today!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Link className="to-planner" href="/Planner">
                    <Button variant="contained" color="primary">
                      Move to Planner
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="to-forums" href="/Forum">
                    <Button variant="outlined" color="primary">
                      Move to Forums
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}
