import React from "react";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  tag: {
    margin: "2px",
  },
}));

export default function Tags({ tags }) {
  const classes = useStyles();
  if (tags.length > 0) {
    const newTags = tags.map((tag) => (
      <Chip className={classes.tag} size="small" key={tag} label={tag} />
    ));
    // console.log(newTags)
    return <div>{newTags}</div>;
  }
}
