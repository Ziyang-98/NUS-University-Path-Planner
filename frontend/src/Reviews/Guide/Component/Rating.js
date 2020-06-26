import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
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
  rating: {
    float: "left",
  },
  ratingValue: {
    float: "left",
    marginLeft: theme.spacing(1),
  },
  upvote: {
    float: "left",
    marginLeft: theme.spacing(4),
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
  votes,
  upvote,
  downvote,
  upvotedNames,
  downvotedNames,
}) {
  console.log(votes);
  const value =
    upvotedNames.length === 0 && downvotedNames.length === 0
      ? 0
      : (upvotedNames.length / (upvotedNames.length + downvotedNames.length)) *
        5;

  const classes = useStyles();
  const [upvoted, setUpvote] = React.useState(false);
  const [downvoted, setDownvote] = React.useState(false);

  useEffect(() => {
    if (auth0Client.isAuthenticated()) {
      if (upvotedNames.includes(auth0Client.getProfile().name)) {
        setUpvote(true);
      }
      if (downvotedNames.includes(auth0Client.getProfile().name)) {
        setDownvote(true);
      }
    }
  }, [upvotedNames, downvotedNames]);
  const handleUpvote = () => {
    if (!upvoted) {
      setUpvote(true);
      setDownvote(false);
    } else {
      setUpvote(false);
    }
    upvote(auth0Client.getProfile().name);
  };

  const handleDownvote = () => {
    if (!downvoted) {
      setDownvote(true);
      setUpvote(false);
    } else {
      setDownvote(false);
    }
    downvote(auth0Client.getProfile().name);
  };

  return (
    <Container width="auto" className={classes.root}>
      <div className={classes.rating}>
        <Rating name="read-only" value={value} precision={0.1} readOnly />
      </div>
      <div className={classes.ratingValue}>
        <Typography component="span">
          Score: {votes} Total votes:{" "}
          {upvotedNames.length + downvotedNames.length}
        </Typography>
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
