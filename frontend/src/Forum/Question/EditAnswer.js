import React from "react";
import axios from "axios";
import auth0Client from "../../Auth";
//----- styles -----//
import { makeStyles } from "@material-ui/core/styles";
//----- MUI ------//
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
export default function EditQuestion({ question, answerId }) {
    //-- opening and closing -------//
    const [open, setOpen] = React.useState(false);
    // const [disabled, setDisabled] = React.useState(false);
    //----- styles ---------//
    const classes = useStyles();
    //---- For compulsory fields ------//
    const [answer, setAnswer] = React.useState(question.answers[answerId]);
    const [hasName, setHasName] = React.useState(false);
    //------- used to redirect  ------//
    const [redirect, setRedirect] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateAnswer = (value) => {
        setAnswer(value);
    }

    const handleChange = (event) => {
        if (event.target.value === "yes") {
            setHasName(false);
        } else {
            setHasName(true);
        }
    }

    const handleEdit = async () => {
        if (answer !== "") {
            // setDisabled(true);
            //--- posting to backend ----//
            console.log(answerId)
            await axios.post(
                `http://localhost:8081/Forum/editAns/${question.id}`,
                {
                    newAnswer: answer,
                    answerId: answerId,
                    hasName: hasName,
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
                                    <div className="card-header">Editing Answer...</div>
                                    <div className="card-body text-left">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Answer:</label>
                                            <textarea
                                                // disabled={disabled}
                                                type="text"
                                                onBlur={(e) => {
                                                    updateAnswer(e.target.value);
                                                }}
                                                className="form-control"
                                                placeholder="Please type an answer."
                                                defaultValue={answer.answer}
                                            />
                                        </div>
                                        <DialogContentText>
                                            Would you like to post anonymously?
                                        </DialogContentText>
                                        <form className="form-group" noValidate autoComplete="off">
                                            <RadioGroup
                                                name="hasName"
                                                valueSelected={hasName}
                                                onChange={handleChange}
                                                defaultValue={answer.name === "Anonymous" ? "yes" : "no"}
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
            </div >
        )
    }
}