import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: theme.spacing(10),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  editTitleAndButton: {
    display: "flex",
    alignItems: "baseline",
  },
  editTitleText: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
  },

  titleAndButton: {
    display: "flex",
    alignItems: "center",
  },

  title: {
    fontWeight: 400,
    fontStyle: "italic",
    marginRight: theme.spacing(4),
  },
}));

export default function Title({
  name,
  title,
  major,
  handleEdited,
  handleTitleChange,
}) {
  const [newTitle, setNewTitle] = React.useState("");
  const [editTitle, setEditTitle] = React.useState(false);
  const [noTitle, setNoTitle] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    setNewTitle(title);
  }, [title]);

  const handleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleEditTitle = () => {
    setEditTitle(true);
    handleEdited();
  };

  const handleUpdateTitle = () => {
    if (newTitle === "") {
      handleNoTitle();
    } else {
      handleTitleChange(newTitle);
      setEditTitle(false);
      setNoTitle(false);
    }
  };

  const handleNoTitle = () => {
    setNoTitle(true);
  };

  return (
    <Container width="auto" className={classes.container}>
      <div>
        {editTitle && (
          <form noValidate autoComplete="off">
            <span className={classes.editTitleAndButton}>
              <TextField
                id="title-textfield"
                label="Edit Your Title Here"
                className={classes.editTitleText}
                variant="outlined"
                multiline
                rowsMax={4}
                value={newTitle}
                onChange={handleChange}
                error={noTitle}
                helperText={noTitle ? "Please input a title" : ""}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateTitle}
              >
                Update
              </Button>
            </span>
          </form>
        )}{" "}
        {!editTitle && (
          <div className={classes.titleAndButton}>
            <Typography
              variant="h2"
              component="span"
              color="primary"
              className={classes.title}
            >
              {title}
            </Typography>
            <span>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditTitle}
              >
                Edit
              </Button>
            </span>
          </div>
        )}
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
