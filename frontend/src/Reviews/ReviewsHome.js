import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
//import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Rating from "@material-ui/lab/Rating";
import Pagination from "@material-ui/lab/Pagination";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import axios from "axios";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(14, 0, 8),
  },
  showcaseContent: {
    color: "#3f51b5",
    fontWeight: 400,
  },

  emptyPage: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActions: {
    display: "flex",
    alignItems: "baseline",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(6),
  },
  reviews: {
    fontWeight: 500,
  },
  votes: {
    marginLeft: theme.spacing(2),
  },
  icons: {
    marginLeft: theme.spacing(1),
  },
}));

export default function Reviews() {
  const classes = useStyles();
  //const [rating, setRating] = useState(3);
  const [reviews, setReviews] = useState([]);
  const [mounted, setMounted] = useState(false);

  // format of review in reviews: [name: , moduleList, title, major,
  // description , votes, upvoted, downvoted]
  useEffect(() => {
    async function fetchData() {
      if (!mounted) {
        const reviews = await axios.get("http://localhost:8081/reviews");
        const result = Object.values(reviews.data.reviews);
        setReviews(result);
        setMounted(true);
      }
    }
    fetchData();
  });

  /* Image 
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  */
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography variant="h2" className={classes.showcaseContent}>
              Welcome to{" "}
              <Typography
                variant="h2"
                component="span"
                className={classes.reviews}
              >
                reviews
              </Typography>
            </Typography>
          </Container>
        </div>
        {reviews.length === 0 && (
          <Container Container className={classes.emptyPage} maxWidth="md">
            <Typography variant="h5">No guides are available.</Typography>
            <SentimentVeryDissatisfiedIcon />
          </Container>
        )}
        {reviews.length !== 0 && (
          <div>
            <Container className={classes.cardGrid} maxWidth="md">
              {/* End hero unit */}
              <Grid container spacing={4}>
                {reviews.map((review) => (
                  <Grid item key={review.name} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          className={classes.reviews}
                        >
                          {review.title}
                        </Typography>
                        <Typography>By {review.name}</Typography>
                        <Typography>Majoring in {review.major}</Typography>
                      </CardContent>
                      <CardActions className={classes.cardActions}>
                        <Link to={`/Guides/${review.name}`}>
                          <Button size="small" color="primary">
                            View
                          </Button>
                        </Link>
                        {/* <Rating
                          name="read-only"
                          value={
                            review.upvoted.length === 0 &&
                            review.downvoted.length === 0
                              ? 0
                              : (review.upvoted.length /
                                  (review.upvoted.length +
                                    review.downvoted.length)) *
                                5
                          }
                          precision={0.1}
                          readOnly
                        /> */}
                        <div className={classes.votes}>
                          <ThumbUpIcon className={classes.icons} />
                          <Typography
                            className={classes.icons}
                            component="span"
                          >
                            {review.upvotes}
                          </Typography>
                          <ThumbDownIcon className={classes.icons} />
                          <Typography
                            className={classes.icons}
                            component="span"
                          >
                            {review.downvotes}
                          </Typography>
                        </div>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
            <div className={classes.pagination}>
              <Pagination count={10} />
            </div>
          </div>
        )}
      </main>
    </React.Fragment>

    /* Pagination
    <div className={classes.pagination}>
        <Pagination count={10} />
      </div>
    */
  );
}
