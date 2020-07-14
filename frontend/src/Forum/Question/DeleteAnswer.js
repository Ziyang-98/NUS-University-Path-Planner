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

export default function DeleteAnswer({ question, answerId }) {
    //-- opening and closing -------//
    const [open, setOpen] = React.useState(false);
    // const [disabled, setDisabled] = React.useState(false);
    //----- styles ---------//
    const classes = useStyles();
    //------- used to redirect  ------//
    const [redirect, setRedirect] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        // setDisabled(true);
        //--- posting to backend ----//
        await axios.post(
            `http://localhost:8081/Forum/deleteAns/${question.id}`,
            {
                answerId: answerId,
            },
            {
                headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` },
            }
        );

        setRedirect(true);

    }

    if (redirect) {
        return <Redirect to={`/Forum`} />
    } else {
        return (
            <div className={classes.root}>
                <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
                    Delete this answer
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
                                    <div className="card-header">
                                        Are you sure that you want to delete this answer? (Deleted answers cannot be recovered.)
                                    </div>
                                    <div className="card-body text-left">
                                        <Button
                                            onClick={handleDelete}
                                            color="secondary"
                                            variant="contained"
                                        >
                                            Delete
                                    </Button>
                                        <Button
                                            onClick={handleClose}
                                            color="grey"
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