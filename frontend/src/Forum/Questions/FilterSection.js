import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import AddIcon from "@material-ui/icons/Add";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
  root: {
    //paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
  },

  titleHolder: {
    width: "100%",
  },

  tagHolder: {
    width: "100%",
    //margin: theme.spacing(1),
  },

  tag: {
    margin: theme.spacing(1),
  },

  filterHolder: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(2),
  },

  textField: {
    width: "30ch",
  },

  optionsHolder: {
    width: "100%",
  },

  button: {
    margin: theme.spacing(1),
  },

  pagination: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(6),
  },
}));

const FilterSection = ({
  tag,
  tags,
  handleTag,
  handleClick,
  handleFilter,
  handleAuthor,
  handleRefresh,
  handleDelete,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.titleHolder}>
        <Typography variant="h5" color="primary">
          Filter Options
        </Typography>
      </div>
      <div>
        <Typography variant="subtitle1">
          Instructions: Add the tag you want to search for.
        </Typography>
        <Typography variant="subtitle1">
          (Example: Enter{" "}
          <Typography
            variant="subtitle1"
            component="span"
            style={{ fontWeight: 800, fontStyle: "italic" }}
            color="primary"
          >
            module
          </Typography>{" "}
          to search for questions with the tag{" "}
          <Typography
            variant="subtitle1"
            component="span"
            style={{ fontWeight: 800, fontStyle: "italic" }}
            color="primary"
          >
            module
          </Typography>{" "}
          )
        </Typography>
      </div>
      <div className={classes.tags}>
        {tags.map((tag) => (
          <Chip
            className={classes.tag}
            label={tag}
            key={tag}
            onDelete={() => handleDelete(tag)}
          />
        ))}
      </div>
      <div className={classes.filterHolder}>
        <FormControl className={classes.textField} variant="outlined">
          <InputLabel htmlFor="add-tag">Input tags to add here</InputLabel>
          <OutlinedInput
            id="add-tag"
            value={tag}
            onChange={handleTag}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="submit tag"
                  onClick={handleClick}
                  //    onMouseDown={}
                  edge="end"
                >
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={180}
          />
        </FormControl>
        {/* <TextField
            className={classes.filter}
            id="filter"
            name="filter"
            multiline
            rowsMax={4}
            value={tag}
            onChange={handleTag}
            variant="outlined"
            style={{ width: 300 }}
  
          />

          <Button
            className={classes.button}
            variant="contained"
            onClick={handleClick}
          >
            Add
          </Button> */}
        <Button
          className={classes.button}
          variant="contained"
          onClick={handleFilter}
        >
          Filter
        </Button>
      </div>
      <div className={classes.optionsHolder}>
        <Typography variant="subtitle1">Other Options:</Typography>
        <Button
          className={classes.button}
          variant="contained"
          onClick={handleAuthor}
        >
          View your own questions
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          onClick={handleRefresh}
        >
          Reset Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterSection;
