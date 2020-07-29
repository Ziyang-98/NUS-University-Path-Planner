import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Chip from "@material-ui/core/Chip";
//--- styles -----//
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

//------ Pagination ------//
import Pagination from "@material-ui/lab/Pagination";

import FilterSection from "./FilterSection";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  reviews: {
    fontWeight: 500,
  },
  votes: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  tag: {
    margin: 2,
    backgroundColor: "#e8eaf6",
  },
  tagholder: {
    marginBottom: theme.spacing(2),
  },
  icons: {
    marginRight: theme.spacing(1),
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(6),
  },
}));

export default function Questions() {
  const username = localStorage.getItem("username");

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
  const questionsPerPage = 6;

  //----- Alerts --------//

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
          return r2.upvotes / denom2 - r1.upvotes / denom1;
        });
        setBaseQuestions(result);
        setQuestions(result);
        setNumOfPages(Math.ceil(result.length / questionsPerPage));
        setPagedQuestions(result.slice(0, questionsPerPage));
        setMounted(true);
      }
    }
    fetchData();
  };

  useEffect(fn, []);

  const handleTag = (event) => {
    setTag(event.target.value);
  };

  const filterQuestions = (tagsToFilter) => {
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
      });
    }
    setQuestions(filteredQuestions);
    setNumOfPages(Math.ceil(filteredQuestions.length / questionsPerPage));
    setPagedQuestions(filteredQuestions.slice(0, questionsPerPage));
  };

  const handleFilter = (event) => {
    event.preventDefault();
    filterQuestions(tags);
  };

  const handleClick = (event) => {
    event.preventDefault();
    const newTags = [...tags];
    if (tag && !tags.includes(tag)) {
      newTags.push(tag);
      setTag("");
      setTags(newTags);
    }
  };

  const handlePageChange = (event, value) => {
    event.preventDefault();
    setCurrPage(value);
    const start = questionsPerPage * (value - 1);
    const end = start + questionsPerPage;
    setPagedQuestions(questions.slice(start, end));
  };

  //----- filters to display questions made by user ------//
  const handleAuthor = (event) => {
    let qnsToFilter = [...baseQuestions];
    let filteredQuestions = qnsToFilter.filter((qn) => {
      return qn.author === username;
    });
    setQuestions(filteredQuestions);
    setNumOfPages(Math.ceil(filteredQuestions.length / questionsPerPage));
    setPagedQuestions(filteredQuestions.slice(0, questionsPerPage));
  };

  //------- refreshes the site ---------//
  const handleRefresh = (event) => {
    let filteredQuestions = [...baseQuestions];
    setQuestions(filteredQuestions);
    setNumOfPages(Math.ceil(filteredQuestions.length / questionsPerPage));
    setPagedQuestions(filteredQuestions.slice(0, questionsPerPage));
    setCurrPage(1);
  };

  const handleDelete = (tagToDelete) => {
    let clonedTags = [...tags];
    console.log(clonedTags);
    clonedTags = clonedTags.filter((tag) => tag !== tagToDelete);
    console.log(clonedTags);
    setTags(clonedTags);
  };

  return (
    <div className="container">
      {/* Filter component added */}
      <FilterSection
        tag={tag}
        tags={tags}
        handleTag={handleTag}
        handleClick={handleClick}
        handleFilter={handleFilter}
        handleAuthor={handleAuthor}
        handleRefresh={handleRefresh}
        handleDelete={handleDelete}
      />
      {/* Filter component end */}
      <div className="row">
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
        {pagedQuestions &&
          pagedQuestions.map((question) => (
            <div key={question.id} className="col-sm-12 col-md-4 col-lg-3">
              <Link to={`/question/${question.id}`}>
                <div className="card text-white bg-success mb-3">
                  <div className="card-header">
                    Answers: {question.answers.length} <br />
                    <div className={classes.votes}>
                      <ThumbUpIcon className={classes.icons} />
                      <Typography className={classes.icons} component="span">
                        {question.upvoted.length}
                      </Typography>
                      <ThumbDownIcon className={classes.icons} />
                      <Typography className={classes.icons} component="span">
                        {question.downvoted.length}
                      </Typography>
                    </div>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">{question.title}</h4>
                    <p className="card-text">{question.description}</p>
                    <div className={classes.tagholder}>
                      {question.tags.map((tag) => (
                        <Chip
                          className={classes.tag}
                          size="small"
                          label={tag}
                          key={tag}
                        />
                      ))}
                    </div>
                    <p className="card-text">Posted by {question.name}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
      <div className={classes.pagination}>
        <Pagination
          count={numOfPages}
          page={currPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
