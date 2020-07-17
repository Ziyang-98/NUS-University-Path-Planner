import React from "react";
//----- styles -----//
import { makeStyles } from "@material-ui/core/styles";
//----- MUI ------//
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  degree: {
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  description: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  tagHolder: {
    maxWidth: "450px",
  },
  tag: {
    margin: 2,
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  form: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "baseline",
  },
  anonymous: {
    marginTop: theme.spacing(2),
  },
  alert: {
    marginBottom: theme.spacing(2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//NEED POPUPS WHEN THEY EDIT WITH WRONG INPUT LIKE EMPTY TITLE AND STUFF
export default function EditQuestion({ question, editQuestion }) {
  //-- opening and closing -------//
  const [open, setOpen] = React.useState(false);
  // const [disabled, setDisabled] = React.useState(false);
  //----- styles ---------//
  const classes = useStyles();
  //---- For compulsory fields ------//
  const [title, setTitle] = React.useState(question.title);
  const [description, setDescription] = React.useState(question.description);
  const [hasName, setHasName] = React.useState(question.name !== "Anonymous");
  //------- used for tagging --------//
  const [tags, setTags] = React.useState(question.tags);
  const [tag, setTag] = React.useState("");
  //------- Alerts --------//
  const [noTitle, setNoTitle] = React.useState(false);
  const [noDescription, setNoDescription] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // setTitle(question.title);
    // setDescription(question.description);
    // setTags(question.tags);
    setOpen(false);
  };

  const deleteTag = (tagId) => {
    let newTags = [...tags];
    newTags.splice(tagId, 1);
    setTags(newTags);
  };

  const updateDescription = (value) => {
    setDescription(value);
  };

  const updateTitle = (value) => {
    setTitle(value);
  };

  //---- tagging -------- //
  const handleTag = (event) => {
    setTag(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    const newTags = [...tags];
    if (tag) {
      newTags.push(tag);
    }
    setTag("");
    setTags(newTags);
  };

  const handleChange = (event) => {
    if (event.target.value === "yes") {
      setHasName(false);
    } else {
      setHasName(true);
    }
  };

  //------- Alert handlers --------//
  const handleNoTitle = () => {
    setNoTitle(true);
  };

  const handleNoDescription = () => {
    setNoDescription(true);
  };

  const handleSuccess = () => {
    setSuccess(true);
  };

  const handleAlertClose = () => {
    setNoTitle(false);
    setNoDescription(false);
    setSuccess(false);
  };

  const handleEdit = () => {
    if (title === "" && description === "") {
      handleNoTitle();
      handleNoDescription();
      return;
    } else if (title === "") {
      handleNoTitle();
      return;
    } else if (description === "") {
      handleNoDescription();
      return;
    } else {
      editQuestion(title, description, hasName, tags);
      handleClose();
      handleSuccess();
    }
  };

  const getDisplayLabel = () => {
    if (noTitle && noDescription) {
      return "Please enter a title and a description.";
    } else if (noTitle) {
      return "Please enter a title.";
    } else if (noDescription) {
      return "Please enter a description.";
    }
  };

  return (
    <div className={classes.root}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Editing your question.</DialogTitle>
        <DialogContent>
          <TextField
            // disabled={disabled}
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => {
              updateTitle(e.target.value);
            }}
            style={{ width: 400 }}
          />
          <div className={classes.description}>
            <TextField
              // disabled={disabled}
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => {
                updateDescription(e.target.value);
              }}
              multiline
              rows={4}
              rowsMax={8}
              style={{ width: 400 }}
            />
          </div>
          <div>
            <div className={classes.tagHolder}>
              {tags.map((tag, index) => (
                <Chip
                  className={classes.tag}
                  size="small"
                  label={tag}
                  key={tag}
                  onDelete={() => deleteTag(index)}
                />
              ))}
            </div>
            <form
              className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={handleClick}
            >
              <TextField
                className={classes.filter}
                id="filter"
                name="filter"
                multiline
                rowsMax={4}
                value={tag}
                onChange={handleTag}
                variant="outlined"
                label="Add tag here"
                style={{ width: 300 }}
              />

              <Button
                className={classes.button}
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </form>
          </div>
          <div className={classes.anonymous}>
            <DialogContentText>
              Would you like to post anonymously?
            </DialogContentText>
            <form className="form-group" noValidate autoComplete="off">
              <RadioGroup
                name="hasName"
                valueselected={hasName.toString()}
                onChange={handleChange}
                defaultValue={question.name === "Anonymous" ? "yes" : "no"}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio color="primary" />}
                  label="Yes"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio color="primary" />}
                  label="No"
                  labelPlacement="end"
                />
              </RadioGroup>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit} color="default" variant="contained">
            Edit
          </Button>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/*----Alerts----*/}
      <Snackbar
        open={noTitle || noDescription}
        autoHideDuration={3000}
        onClose={handleAlertClose}
      >
        <Alert
          className={classes.alert}
          onClose={handleAlertClose}
          severity="error"
        >
          {getDisplayLabel()}
        </Alert>
      </Snackbar>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleAlertClose}
      >
        <Alert
          className={classes.alert}
          onClose={handleAlertClose}
          severity="success"
        >
          Your question has been successfully updated.
        </Alert>
      </Snackbar>
    </div>
  );
}
