import React from "react";
import axios from "axios";
import auth0Client from "../../Auth";
//----- styles -----//
import { makeStyles } from "@material-ui/core/styles";
//----- MUI ------//
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import { red } from "@material-ui/core/colors";
import { Redirect } from "react-router";

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
}));

//NEED POPUPS WHEN THEY EDIT WITH WRONG INPUT LIKE EMPTY TITLE AND STUFF
export default function EditQuestion({ question }) {
    //-- opening and closing -------//
    const [open, setOpen] = React.useState(false);
    // const [disabled, setDisabled] = React.useState(false);
    //----- styles ---------//
    const classes = useStyles();
    //---- For compulsory fields ------//
    const [title, setTitle] = React.useState(question.title);
    const [description, setDescription] = React.useState(question.description);
    const [hasName, setHasName] = React.useState(false);
    //------- used for tagging --------//
    const [tags, setTags] = React.useState(question.tags);
    const [tag, setTag] = React.useState("");
    //------- used to redirect  ------//
    const [redirect, setRedirect] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateDescription = (value) => {
        setDescription(value);
    }

    const updateTitle = (value) => {
        setTitle(value);
    }

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
        setTag("")
        setTags(newTags);
    }

    const handleChange = (event) => {
        if (event.target.value === "yes") {
            setHasName(false);
        } else {
            setHasName(true);
        }
    }

    const handleEdit = async () => {
        if (title !== "" && description !== "") {
            // setDisabled(true);
            //--- posting to backend ----//
            await axios.post(
                `http://localhost:8081/Forum/edit/${question.id}`,
                {
                    title: title,
                    description: description,
                    hasName: hasName,
                    tags: tags,
                },
                {
                    headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` },
                }
            );

            setRedirect(true);
        }
    }

    if (redirect) {
        return <Redirect to={`/Forum`} />
    } else {
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
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="card border-primary">
                                    <div className="card-header">Editing Question...</div>
                                    <div className="card-body text-left">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Title:</label>
                                            <input
                                                // disabled={disabled}
                                                type="text"
                                                onBlur={(e) => {
                                                    updateTitle(e.target.value);
                                                }}
                                                className="form-control"
                                                placeholder="Give your question a title."
                                                defaultValue={title}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Description:</label>
                                            <textarea
                                                // disabled={disabled}
                                                type="text"
                                                onBlur={(e) => {
                                                    updateDescription(e.target.value);
                                                }}
                                                className="form-control"
                                                placeholder="Give more context to your question."
                                                defaultValue={description}
                                            />
                                        </div>
                                        <div>
                                            {tags}
                                            < form noValidate autoComplete="off" onSubmit={handleClick} >
                                                <InputLabel htmlFor="filter">Add tag here...</InputLabel>
                                                <TextField
                                                    className={classes.filter}
                                                    id="filter"
                                                    name="filter"
                                                    multiline
                                                    rowsMax={4}
                                                    value={tag}
                                                    onChange={handleTag}
                                                    variant="outlined"
                                                    style={{ width: 300 }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Enter any Hall/RCs"
                                                        />
                                                    )}
                                                />
                                                <Button
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
                                                valueSelected={hasName}
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
                                        <Button
                                            onClick={handleEdit}
                                            color="grey"
                                            variant="contained"
                                        >
                                            Edit
                                    </Button>
                                        <Button
                                            onClick={handleClose}
                                            color="secondary"
                                            variant="contained"
                                        >
                                            Cancel
                                    </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}