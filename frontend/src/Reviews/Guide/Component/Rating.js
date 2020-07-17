import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Button from "@material-ui/core/Button";
import auth0Client from "../../../Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
    display: "flex",
    alignItems: "center",
  },
  thumbsup: {
    float: "left",
  },
  value: {
    float: "left",
    marginLeft: theme.spacing(1),
  },

  thumbsdown: {
    float: "left",
    marginLeft: theme.spacing(1),
  },
  upvote: {
    float: "left",
    marginLeft: theme.spacing(2),
  },
  downvote: {
    float: "left",
    marginLeft: theme.spacing(2),
  },
  upvoteButton: {
    backgroundColor: "#3f51b5",
  },
  downvoteButton: {
    backgroundColor: "#e91e63",
  },
  votedButton: {
    backgroundColor: "#f5f5f5",
  },
  vote: {
    marginLeft: theme.spacing(1),
    color: "#FFFFFF",
  },
  voted: {
    marginLeft: theme.spacing(1),
    color: "#bdbdbd",
  },
  voteIcon: {
    color: "#FFFFFF",
  },
  votedIcon: {
    color: "#bdbdbd",
  },
}));

export default function RatingBar({
  upvote,
  downvote,
  upvotedNames,
  downvotedNames,
  name,
}) {
  const classes = useStyles();
  const username = localStorage.getItem("username");
  const [upvoted, setUpvote] = React.useState(false);
  const [downvoted, setDownvote] = React.useState(false);
  //console.log(upvotedNames);

  useEffect(() => {
    // if (auth0Client.isAuthenticated()) {
    if (upvotedNames.includes(username)) {
      setUpvote(true);
    }
    if (downvotedNames.includes(username)) {
      setDownvote(true);
    }
    //}
  }, [name]);

  // useEffect(() => {
  //   //if (auth0Client.isAuthenticated()) {
  //   if (downvotedNames.includes(username)) {
  //     setDownvote(true);
  //   }
  //   // }
  // }, [downvotedNames]);

  const handleUpvote = () => {
    if (auth0Client.isAuthenticated()) {
      upvote(auth0Client.getProfile().name);

      if (!upvoted) {
        setUpvote(true);
        setDownvote(false);
      } else {
        setUpvote(false);
      }
    } else {
      auth0Client.signIn();
    }
  };

  const handleDownvote = () => {
    if (auth0Client.isAuthenticated()) {
      downvote(auth0Client.getProfile().name);

      if (!downvoted) {
        setDownvote(true);
        setUpvote(false);
      } else {
        setDownvote(false);
      }
    } else {
      auth0Client.signIn();
    }
  };

  return (
    <Container width="auto" className={classes.root}>
      <div className={classes.thumbsup}>
        <ThumbUpIcon />
      </div>

      <div className={classes.value}>
        <Typography component="span">{upvotedNames.length}</Typography>
      </div>
      <div className={classes.thumbsdown}>
        <ThumbDownIcon />
      </div>

      <div className={classes.value}>
        <Typography component="span">{downvotedNames.length}</Typography>
      </div>

      <div className={classes.upvote}>
        {upvoted && (
          <Button
            variant="contained"
            //className={upvote ? classes.votedColour : classes.voteColour}
            className={classes.votedButton}
            onClick={handleUpvote}
          >
            <span>
              <ThumbUpIcon size="small" className={classes.votedIcon} />
            </span>
            <span>
              <Typography className={classes.voted}>{"Upvoted"}</Typography>
            </span>
          </Button>
        )}
        {!upvoted && (
          <Button
            variant="contained"
            //className={upvote ? classes.votedColour : classes.voteColour}
            className={classes.upvoteButton}
            onClick={handleUpvote}
          >
            <span>
              <ThumbUpIcon size="small" className={classes.voteIcon} />
            </span>
            <span>
              <Typography className={classes.vote}>{"Vote"}</Typography>
            </span>
          </Button>
        )}
      </div>
      <div className={classes.downvote}>
        <Button
          //disabled={downvote}
          variant="contained"
          //color="secondary"
          className={downvoted ? classes.votedButton : classes.downvoteButton}
          onClick={handleDownvote}
        >
          <span>
            <ThumbDownIcon
              className={downvoted ? classes.votedIcon : classes.voteIcon}
            />
          </span>
          <span className={classes.vote}>
            <Typography
              className={downvoted ? classes.votedIcon : classes.voteIcon}
            >
              {downvoted ? "Downvoted" : "Vote"}
            </Typography>
          </span>
        </Button>
      </div>
    </Container>
  );
}
