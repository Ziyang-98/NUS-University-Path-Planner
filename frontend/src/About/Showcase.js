import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 200,
  },

  text: {
    color: "#1C53E2",
    fontWeight: 400,
  },
}));

export default function Showcase() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Box>
        <Typography
          className={classes.text}
          variant="h1"
          component="h2"
          gutterBottom
        >
          About us
        </Typography>
      </Box>
    </Container>
  );
}
