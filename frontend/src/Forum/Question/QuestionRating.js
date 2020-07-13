import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Button from "@material-ui/core/Button";

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
  noOfUpvotes,
  noOfDownvotes,
  upvote,
  downvote,
  upvotedNames,
  downvotedNames,
}) {
  // const value =
  //   upvotedNames.length === 0 && downvotedNames.length === 0
  //     ? 0
  //     : (upvotedNames.length / (upvotedNames.length + downvotedNames.length)) *
  //       5;
  const upvotes = noOfUpvotes;
  const downvotes = noOfDownvotes;
  const classes = useStyles();
  const username = localStorage.getItem("username");
  const [upvoted, setUpvote] = React.useState(upvotedNames.includes(username));
  const [downvoted, setDownvote] = React.useState(downvotedNames.includes(username));

  //Do not remove the comments in the useEffects(), they prevent a certain warning.
  useEffect(() => {
    if (upvotedNames.includes(username)) {
      setUpvote(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upvotedNames]);

  useEffect(() => {

    if (downvotedNames.includes(username)) {
      setDownvote(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downvotedNames]);

  const handleUpvote = () => {
    if (!upvoted) {
      console.log("upvoting")
      setUpvote(true);
      setDownvote(false);
    } else {
      setUpvote(false);
    }
    upvote(username);
  };

  const handleDownvote = () => {
    if (!downvoted) {
      setDownvote(true);
      setUpvote(false);
    } else {
      setDownvote(false);
    }
    downvote(username);
  };

  return (
    <Container width="auto" className={classes.root}>
      <div className={classes.thumbsup}>
        <ThumbUpIcon />
      </div>

      <div className={classes.value}>
        <Typography component="span">{upvotes}</Typography>
      </div>
      <div className={classes.thumbsdown}>
        <ThumbDownIcon />
      </div>

      <div className={classes.value}>
        <Typography component="span">{downvotes}</Typography>
      </div>

      <div className={classes.upvote}>
        <Button
          variant="contained"
          //className={upvote ? classes.votedColour : classes.voteColour}
          className={upvoted ? classes.votedButton : classes.upvoteButton}
          onClick={handleUpvote}
        >
          <span>
            <ThumbUpIcon
              size="small"
              className={upvoted ? classes.votedIcon : classes.voteIcon}
            />
          </span>
          <span>
            <Typography className={upvoted ? classes.voted : classes.vote}>
              {upvoted ? "Upvoted" : "Vote"}
            </Typography>
          </span>
        </Button>
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
