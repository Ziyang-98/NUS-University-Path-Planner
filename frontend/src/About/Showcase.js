import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "stretch",
    height: 150,
  },

  text: {
    color: "#1C53E2",
    fontWeight: "fontWeightBold",
  },
}));

function AboutUs() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography
        className={classes.text}
        variant="h1"
        component="h2"
        gutterBottom
      >
        <Box fontWeight={400}>About us</Box>
      </Typography>
    </div>
  );
}

export default function Theming() {
  return <AboutUs />;
}
