import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
    width: "65%",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
  },
}));

export default function Description({ description }) {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography variant="h5" component="span" color="primary">
        Description:{" "}
      </Typography>
      <Typography variant="subtitle1">{description}</Typography>
    </Container>
  );
}
