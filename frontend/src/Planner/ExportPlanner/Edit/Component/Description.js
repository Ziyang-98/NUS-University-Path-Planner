import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
    width: "65%",
    marginLeft: "auto",
    marginRight: "auto",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
  },
  buttonAndTitle: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  editDescriptionText: {
    marginTop: theme.spacing(2),
  },
}));

export default function Description({
  description,
  handleEdited,
  handleDescriptionChange,
}) {
  const [newDescription, setNewDescription] = React.useState("");
  const [editDescription, setEditDescription] = React.useState(false);
  const [noDescription, setNoDescription] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    setNewDescription(description);
  }, [description]);

  const handleChange = (event) => {
    setNewDescription(event.target.value);
  };

  const handleEditDescription = () => {
    setEditDescription(true);
  };

  const handleUpdateDescription = () => {
    if (newDescription === "") {
      handleNoDescription();
      handleEdited();
    } else {
      handleDescriptionChange(newDescription);
      setEditDescription(false);
      setNoDescription(false);
    }
  };

  const handleNoDescription = () => {
    setNoDescription(true);
  };

  return (
    <Container className={classes.root}>
      <div className={classes.buttonAndTitle}>
        <Typography variant="h5" component="span" color="primary">
          Description:{" "}
        </Typography>
        {!editDescription && (
          <span className={classes.button}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditDescription}
            >
              Edit
            </Button>
          </span>
        )}
        {editDescription && (
          <span className={classes.button}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateDescription}
            >
              Update
            </Button>
          </span>
        )}
      </div>
      {editDescription && (
        <form noValidate autoComplete="off">
          <TextField
            id="title-textfield"
            label="Edit Your Description Here"
            className={classes.editDescriptionText}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            rowsMax={16}
            value={newDescription}
            onChange={handleChange}
            error={noDescription}
            helperText={noDescription ? "Please input a description" : ""}
          />
        </form>
      )}

      {!editDescription && (
        <Typography variant="body1" style={{ wordWrap: "break-word" }}>
          {description}
        </Typography>
      )}
    </Container>
  );
}
