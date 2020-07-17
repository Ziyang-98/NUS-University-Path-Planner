import React from "react";
import { Redirect, withRouter } from "react-router";
import auth0Client from "../../Auth";
import axios from "axios";
//----------- Handle anonymity -------------//
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { DialogContentText, FormControlLabel } from "@material-ui/core";
//---- MUI-----//
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
//------ tag style -------//
import Chip from "@material-ui/core/Chip";
//------ Alerts Dependencies-------//
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(10),
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  degree: {
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  tag: {
    margin: theme.spacing(1),
  },
  tagForm: {
    display: "flex",
    alignItems: "baseline",
  },
  button: {
    margin: theme.spacing(2),
  },
  alert: {
    marginBottom: theme.spacing(2),
  },
}));

//---- Changed from class to functional ----//
function NewQuestion(props) {
  //---- styles ----//
  const classes = useStyles();
  //---- For compulsory fields ------//
  const [disabled, setDisabled] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [hasName, setHasName] = React.useState(true);
  //------- used for tagging --------//
  const [tags, setTags] = React.useState([]);
  const [tag, setTag] = React.useState("");
  //------- used to redirect  ------//
  const [redirect, setRedirect] = React.useState(false);
  //------- Alerts --------//
  const [noTitle, setNoTitle] = React.useState(false);
  const [noDescription, setNoDescription] = React.useState(false);
  //const [success, setSuccess] = React.useState(false);

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

  const handleAlertClose = () => {
    setNoTitle(false);
    setNoDescription(false);
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

  const submit = async () => {
    if (title === "" && description === "") {
      handleNoTitle();
      handleNoDescription();
    } else if (title === "") {
      handleNoTitle();
    } else if (description === "") {
      handleNoDescription();
    } else {
      setDisabled(true);
      //--- posting to backend ----//
      await axios.post(
        "http://localhost:8081/Forum",
        {
          title: title,
          description: description,
          hasName: hasName,
          tags: tags,
          username: localStorage.getItem("username"),
        },
        {
          headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` },
        }
      );
      // console.log({
      //   title: title,
      //   description: description,
      //   hasName: hasName,
      //   tags: tags,
      //   username: localStorage.getItem("username"),
      // });
      setRedirect(true);
    }
  };

  const deleteTag = (tagId) => {
    let newTags = [...tags];
    newTags.splice(tagId, 1);
    setTags(newTags);
    // .then(window.location.reload(false))
  };

  if (redirect) {
    return <Redirect to="/Forum" />;
  } else {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">New Question</div>
              <div className="card-body text-left">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Title:</label>
                  <input
                    disabled={disabled}
                    type="text"
                    onBlur={(e) => {
                      updateTitle(e.target.value);
                    }}
                    className="form-control"
                    placeholder="Give your question a title."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Description:</label>
                  <textarea
                    disabled={disabled}
                    type="text"
                    onBlur={(e) => {
                      updateDescription(e.target.value);
                    }}
                    className="form-control"
                    placeholder="Give more context to your question."
                  />
                </div>
                <div>
                  <div>
                    {tags.map((tag, index) => (
                      <Chip
                        key={tag}
                        className={classes.tag}
                        size="small"
                        label={tag}
                        onDelete={() => deleteTag(index)}
                      />
                    ))}
                  </div>
                  <form
                    className={classes.tagForm}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleClick}
                  >
                    {/* <InputLabel htmlFor="filter">Add tag here...</InputLabel> */}
                    <TextField
                      className={classes.filter}
                      id="filter"
                      name="filter"
                      label="Add tag here"
                      multiline
                      rowsMax={4}
                      value={tag}
                      onChange={handleTag}
                      variant="outlined"
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
                <DialogContentText>
                  Would you like to post anonymously?
                </DialogContentText>
                <form className="form-group" noValidate autoComplete="off">
                  <RadioGroup
                    name="hasName"
                    valueselected={hasName.toString()}
                    onChange={handleChange}
                    defaultValue="no"
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
                <button
                  disabled={disabled}
                  className="btn btn-primary"
                  onClick={() => {
                    submit();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
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
      </div>
    );
  }
}

export default withRouter(NewQuestion);
