import React, { useState, useEffect } from "react";
import useMountEffect from "react";
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
import Tags from "./Tags";
import DialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { FormControlLabel } from "@material-ui/core";
// import FilterReviews from "./FilterReviews";

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
  filter: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  const [major, setMajor] = useState("");
  const [hasSecondDegree, setHasSecondDegree] = useState(false);
  const [secondDegree, setSecondDegree] = useState("");
  const [typeOfSecondDegree, setTypeOfSecondDegree] = useState("");
  const [hasHallRC, setHasHallRC] = useState(false);
  const [hallRC, setHallRC] = useState("");
  const [baseReviews, setBaseReviews] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [test, setTest] = useState("");

  //----- Pagination --------//
  const [numOfPages, setNumOfPages] = useState(1);
  const [currPage, setCurrPage] = useState(1);
  const [pagedReviews, setPagedReviews] = useState([]);
  //Change this to change how many reviews displayed per page
  const reviewsPerPage = 2;

  const hallRCs = [
    "Eusoff Hall",
    "Kent Ridge Hall",
    "King Edward VII Hall",
    "Raffles Hall",
    "Sheares Hall",
    "Temasek Hall",
    "PGP House",
    "Ridge View Residential College (RVRC)",
    "College of Alice and Peter Tan (CAPT)",
    "Residential College 4 (RC4)",
    "Tembusu College",
    "University Scholars Programme (USP)"
  ]

  // format of review in reviews: [name: , moduleList, title, major, tags,
  // description , votes, upvoted, downvoted]
  const fn = () => {
    async function fetchData() {
      if (!mounted) {
        const reviews = await axios.get("http://localhost:8081/reviews");
        const result = Object.values(reviews.data.reviews);
        result.sort((r1, r2) => {
          let denom1 = r1.upvotes + r1.downvotes;
          let denom2 = r2.upvotes + r2.downvotes;
          
          //preventing division by 0
          denom1 = denom1 === 0 ? 1 : denom1;
          denom2 = denom2 === 0 ? 1 : denom2;
          return (r2.upvotes / denom2) - (r1.upvotes / denom1);
        })
        setBaseReviews(result);
        setReviews(result);
        setNumOfPages(Math.ceil(result.length / reviewsPerPage));
        setPagedReviews(result.slice(0, reviewsPerPage));
        
        const degrees = await axios.get(
          `http://localhost:8081/degrees`
        ).then(data => setDegrees(data.data.degrees));
        setMounted(true);
      }
    }
    fetchData();
  }

  useEffect(fn, [test]);


  const handleMajorChange = (value) => {
    setMajor(value);
  };

  const handleHasSecondDegree = (event) => {
    const value = event.target.value;
    if (value === "") {
      setSecondDegree("");
      setTypeOfSecondDegree("");
      setHasSecondDegree(false);
    } else {
      setTypeOfSecondDegree(value);
      setHasSecondDegree(true);
    }
  }

  const handleSecondDegree = (event) => {
    setSecondDegree(event.target.value);
  };

  const handleHasHallRC = (event) => {
    setHasHallRC(event.target.checked)
  }

  const handleHallRCChange = (value) => {
    setHallRC(value);
  }

  const filterReviews = (tagsToFilter) => {
    let filteredReviews = [...baseReviews];
    for (let tag of tagsToFilter) {
      filteredReviews = filteredReviews.filter((review) => {
        return review.tags.includes(tag);
      })
    }
    setReviews(filteredReviews);
    setNumOfPages(Math.ceil(filteredReviews.length / reviewsPerPage));
    setPagedReviews(filteredReviews.slice(0, reviewsPerPage));
  }

  const handleFilter = (event) => {
    event.preventDefault();
    const tagsToFilter = [];
    if (major !== "") {
      tagsToFilter.push(major);
    }
    if (secondDegree !== "") {
      tagsToFilter.push(secondDegree);
    }
    if (typeOfSecondDegree !== "") {
      tagsToFilter.push(typeOfSecondDegree);
    }
    if (hallRC !== "") {
      tagsToFilter.push(hallRC);
    }
    filterReviews(tagsToFilter);
  }

  const handleReset = (event) => {
    console.log("in reset")
    event.preventDefault();
    setReviews(baseReviews);
    setPagedReviews(baseReviews.slice(0, reviewsPerPage));
    setNumOfPages(Math.ceil(baseReviews.length / reviewsPerPage));
  }

  const handlePageChange = (event, value) => {
    event.preventDefault();
    setCurrPage(value);
    const start = reviewsPerPage * (value - 1);
    const end = start + reviewsPerPage;
    setPagedReviews(reviews.slice(start, end));
  }

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
        {/* Filter unit */}
        <div className={classes.filter}>
          <DialogTitle id="form-dialog-title">Filter reviews by tags</DialogTitle>
          <form noValidate autoComplete="off" onSubmit={handleFilter}>
            <Autocomplete
              className={classes.degree}
              id="combo-box-demo"
              name="major"
              defaultValue="None"
              value={major}
              onChange={(event, newValue) => handleMajorChange(newValue)}
              options={degrees}
              getOptionLabel={(option) => option}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Enter the primary major"
                  variant="outlined"
                />
              )}
            />
            <TextField
              id="secondDegree"
              name="secondDegree"
              className={classes.secondDegree}
              multiline
              rowsMax={4}
              value={secondDegree}
              onChange={handleSecondDegree}
              variant="outlined"
            />
            <RadioGroup name="typeOfSecondDegree" valueSelected={typeOfSecondDegree} onChange={handleHasSecondDegree}>
              <FormControlLabel
                value="Double Degree"
                control={<Radio color="primary" />}
                label="Double Degree"
                labelPlacement="end"
              />
              <FormControlLabel
                value="Double Major"
                control={<Radio color="primary" />}
                label="Double Major"
                labelPlacement="end"
              />
              <FormControlLabel
                value="minor"
                control={<Radio color="primary" />}
                label="Minor"
                labelPlacement="end"
              />
              <FormControlLabel
                value=""
                control={<Radio color="primary" />}
                label="None"
                labelPlacement="end"
              />
            </RadioGroup>
            <Autocomplete
              className={classes.degree}
              id="combo-box-demo"
              name="hallRC"
              value={hallRC}
              onChange={(event, newValue) => handleHallRCChange(newValue)}
              options={hallRCs}
              getOptionLabel={(option) => option}
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
              Filter
            </Button>
          </form>
          <Button
            type="submit"
            onClick={handleReset}
            variant="contained"
          >
            Reset
              </Button>
        </div>
        {pagedReviews.length === 0 && (
          <Container Container className={classes.emptyPage} maxWidth="md">
            <Typography variant="h5">No guides are available.</Typography>
            <SentimentVeryDissatisfiedIcon />
          </Container>
        )}
        {pagedReviews.length !== 0 && (
          <div>
            <Container className={classes.cardGrid} maxWidth="md">
              {/* End hero unit */}
              <Grid container spacing={4}>
                {pagedReviews.map((review) => (
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
                        <br />
                        <Tags tags={review.tags} />
                      </CardContent>
                      <CardActions className={classes.cardActions}>
                        <Link to={`/Guides/${review.name}`}>
                          <Button size="small" color="primary">
                            View
                          </Button>
                        </Link>
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
              <Pagination count={numOfPages} page={currPage} onChange={handlePageChange} />
            </div>
          </div>
        )}
      </main>
    </React.Fragment>
  );
}
