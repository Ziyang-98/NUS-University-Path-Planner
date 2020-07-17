import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import auth0Client from "../../Auth";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  thumbsup: {
    float: "left",
  },
  value: {
    float: "left",
    // marginLeft: theme.spacing(1),
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
  // noOfUpvotes,
  // noOfDownvotes,
  upvote,
  downvote,
  upvotedNames,
  downvotedNames,
  answerId,
}) {
  // const value =
  //   upvotedNames.length === 0 && downvotedNames.length === 0
  //     ? 0
  //     : (upvotedNames.length / (upvotedNames.length + downvotedNames.length)) *
  //       5;
  // const upvotes = noOfUpvotes;
  // const downvotes = noOfDownvotes;
  const classes = useStyles();
  const username = localStorage.getItem("username");
  const [upvoted, setUpvote] = React.useState(upvotedNames.includes(username));
  const [downvoted, setDownvote] = React.useState(
    downvotedNames.includes(username)
  );

  // useEffect(() => {
  //   if (auth0Client.isAuthenticated()) {
  //     if (upvotedNames.includes(auth0Client.getProfile().name)) {
  //       setUpvote(true);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   if (auth0Client.isAuthenticated()) {
  //     if (downvotedNames.includes(auth0Client.getProfile().name)) {
  //       setDownvote(true);
  //     }
  //   }
  // }, []);

  const handleUpvote = () => {
    upvote(auth0Client.getProfile().name, answerId);

    if (!upvoted) {
      setUpvote(true);
      setDownvote(false);
    } else {
      setUpvote(false);
    }
  };

  const handleDownvote = () => {
    downvote(auth0Client.getProfile().name, answerId);

    if (!downvoted) {
      setDownvote(true);
      setUpvote(false);
    } else {
      setDownvote(false);
    }
  };

  return (
    <div width="auto" className={classes.root}>
      <div className={classes.thumbsup}>
        {!upvoted && (
          <IconButton
            aria-label="upvote"
            color="default"
            onClick={handleUpvote}
          >
            <ThumbUpIcon />
          </IconButton>
        )}
        {upvoted && (
          <IconButton
            aria-label="upvote"
            color="primary"
            onClick={handleUpvote}
          >
            <ThumbUpIcon />
          </IconButton>
        )}
      </div>

      <div className={classes.value}>
        <Typography component="span">{upvotedNames.length}</Typography>
      </div>
      <div className={classes.thumbsdown}>
        {!downvoted && (
          <IconButton
            aria-label="downvote"
            color="default"
            onClick={handleDownvote}
          >
            <ThumbDownIcon />
          </IconButton>
        )}
        {downvoted && (
          <IconButton
            aria-label="downvote"
            color="primary"
            onClick={handleDownvote}
          >
            <ThumbDownIcon />
          </IconButton>
        )}
      </div>

      <div className={classes.value}>
        <Typography component="span">{downvotedNames.length}</Typography>
      </div>

      {/* <div className={classes.upvote}>
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
      </div> */}
    </div>
  );
}
