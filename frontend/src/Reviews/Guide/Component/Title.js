import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: theme.spacing(10),
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2),
  },
  title: {
    fontWeight: 400,
    fontStyle: "italic",
  },
}));

/*
<Typography variant="h4">
          Welcome to{" "}
          <Typography
            variant="h3"
            component="span"
            color="primary"
            className={classes.name}
          >
            {name}
          </Typography>{" "}
          's guide
        </Typography>
        */
export default function Title({ name, title, major }) {
  const classes = useStyles();
  return (
    <Container width="auto" className={classes.container}>
      <div>
        <Typography variant="h2" color="primary" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="h5">
          By{" "}
          <Typography variant="h5" component="span" color="primary">
            {name}
          </Typography>{" "}
          {" | "} Studying{" "}
          <Typography variant="h5" component="span" color="primary">
            {major}
          </Typography>
        </Typography>
      </div>
    </Container>
  );
}
