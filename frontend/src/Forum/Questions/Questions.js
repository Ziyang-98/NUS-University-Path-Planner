import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Chip from '@material-ui/core/Chip';
//--- styles -----//
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
//----- MUI stuff -----//
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
//------ Pagination ------//
import Pagination from "@material-ui/lab/Pagination";

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

export default function Questions({ username }) {
  //------ styles ---------//
  const classes = useStyles();
  //----- used when component first mounts -----//
  const [mounted, setMounted] = useState(false);
  //------- main display ----------//
  const [questions, setQuestions] = React.useState([]);
  const [degrees, setDegrees] = React.useState([]);
  //------ Filter ---------//
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  //----- Pagination --------//
  const [baseQuestions, setBaseQuestions] = useState([]);
  const [numOfPages, setNumOfPages] = useState(1);
  const [currPage, setCurrPage] = useState(1);
  const [pagedQuestions, setPagedQuestions] = useState([]);
  //Change this to change how many reviews displayed per page
  const questionsPerPage = 3;

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
  ];

  const fn = () => {
    async function fetchData() {
      if (!mounted) {
        const questions = await axios.get("http://localhost:8081/Forum");
        const result = questions.data;
        setQuestions(result);
        const data = await axios.get(`http://localhost:8081/degrees`);
        setDegrees(data.data.degrees);
        result.sort((r1, r2) => {
          let denom1 = r1.upvotes + r1.downvotes;
          let denom2 = r2.upvotes + r2.downvotes;

          //preventing division by 0
          denom1 = denom1 === 0 ? 1 : denom1;
          denom2 = denom2 === 0 ? 1 : denom2;
          return (r2.upvotes / denom2) - (r1.upvotes / denom1);
        })
        setBaseQuestions(result);
        setQuestions(result);
        setNumOfPages(Math.ceil(result.length / questionsPerPage));
        setPagedQuestions(result.slice(0, questionsPerPage));
        setMounted(true);
      }
    }
    fetchData();
  }

  useEffect(fn, []);

  const handleTag = (event) => {
    setTag(event.target.value);
  };

  const filterQuestions = (tagsToFilter) => {
    console.log(tagsToFilter)
    // this piece of code is temporary
    //change to a popup warning for empty filter input
    if (tagsToFilter.length === 0) {
      handleRefresh();
      return;
    }
    //end
    let qnsToFilter = [...baseQuestions];
    let filteredQuestions = [];
    for (let tag of tagsToFilter) {
      if (tag === null) {
        continue;
      }
      qnsToFilter.filter((qn) => {
        if (!filteredQuestions.includes(qn) && qn.tags.includes(tag)) {
          filteredQuestions.push(qn);
        }
        return qn.tags.includes(tag);
      })
    }
    setQuestions(filteredQuestions);
    setNumOfPages(Math.ceil(filteredQuestions.length / questionsPerPage));
    setPagedQuestions(filteredQuestions.slice(0, questionsPerPage));
  }

  const handleFilter = (event) => {
    event.preventDefault();
    filterQuestions(tags);
  }

  const handleClick = (event) => {
    event.preventDefault();
    const newTags = [...tags];
    if (tag) {
      newTags.push(tag);
    }
    setTag("")
    setTags(newTags);
  }

  const handlePageChange = (event, value) => {
    event.preventDefault();
    setCurrPage(value);
    const start = questionsPerPage * (value - 1);
    const end = start + questionsPerPage;
    setPagedQuestions(questions.slice(start, end));
  }

  //----- filters to display questions made by user ------//
  const handleAuthor = (event) => {
    let qnsToFilter = [...baseQuestions];
    let filteredQuestions = qnsToFilter.filter((qn) => {
      return qn.author === username;
    });
    setQuestions(filteredQuestions);
    setNumOfPages(Math.ceil(filteredQuestions.length / questionsPerPage));
    setPagedQuestions(filteredQuestions.slice(0, questionsPerPage));
  }

  //------- refreshes the site ---------//
  const handleRefresh = (event) => {
    let filteredQuestions = [...baseQuestions];
    setQuestions(filteredQuestions);
    setNumOfPages(Math.ceil(filteredQuestions.length / questionsPerPage));
    setPagedQuestions(filteredQuestions.slice(0, questionsPerPage));
  }

  return (
    <div className="container" >
      {/* Filter component added */}
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
        {/* <Autocomplete
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
        /> */}
        {/* <RadioGroup
          name="typeOfSecondDegree"
          valueSelected={typeOfSecondDegree}
          onChange={handleHasSecondDegree}
        >
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
        /> */}
      </form>
      <Button
        type="submit"
        variant="contained"
        onClick={handleFilter}
      >
        Filter
      </Button>
      <Button
        type="submit"
        variant="contained"
        onClick={handleAuthor}
      >
        View your own questions
      </Button>
      <Button
        type="submit"
        variant="contained"
        onClick={handleRefresh}
      >
        Refresh
      </Button>
      {/* Filter component end */}
      < div className="row" >
        <Link to={{ pathname: "/new-question", state: { degrees: degrees } }}>
          <div className="card text-white bg-secondary mb-3">
            <div className="card-header">Need help? Ask here!</div>
            <div className="card-body">
              <h4 className="card-title">+ New Question</h4>
              <p className="card-text">Don't worry. Help is on the way!</p>
            </div>
          </div>
        </Link>
        {pagedQuestions === null && <p>Loading questions...</p>}
        {
          pagedQuestions &&
          pagedQuestions.map((question) => (
            <div key={question.id} className="col-sm-12 col-md-4 col-lg-3">
              <Link to={`/question/${question.id}`}>
                <div className="card text-white bg-success mb-3">
                  <div className="card-header">
                    Answers: {question.answers.length} <br />
                      Upvotes: {question.upvotes} <br />
                      Downvotes: {question.downvotes}
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">{question.title}</h4>
                    <p className="card-text">{question.description}</p>
                    <div className="card text-white bg-secondary mb-3">
                      {question.tags.map((tag) => <Chip size="small" label={tag} />)}
                    </div>
                    <p className="card-text">Posted by {question.name}</p>
                  </div>
                  <div className={classes.votes}>
                    <ThumbUpIcon className={classes.icons} />
                    <Typography
                      className={classes.icons}
                      component="span"
                    >
                      {question.upvotes}
                    </Typography>
                    <ThumbDownIcon className={classes.icons} />
                    <Typography
                      className={classes.icons}
                      component="span"
                    >
                      {question.downvotes}
                    </Typography>
                  </div>
                </div>
              </Link>
            </div>
          ))
        }
        <div className={classes.pagination}>
          <Pagination
            count={numOfPages}
            page={currPage}
            onChange={handlePageChange}
          />
        </div>
      </div >
    </div >
  );

}
