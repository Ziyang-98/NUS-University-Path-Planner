import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  titleHolder: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(20),
  },

  infoHolder: {
    margin: theme.spacing(2),
    marginLeft: theme.spacing(20),
  },
  formControlAY: {
    float: "left",
    margin: theme.spacing(2),
    marginLeft: theme.spacing(25),
    minWidth: 120,
  },

  formControlSem: {
    float: "left",
    margin: theme.spacing(2),
    marginLeft: theme.spacing(4),
    minWidth: 150,
  },

  searchBar: {
    float: "left",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    width: "25ch",
  },

  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(5),
  },
}));

export default function SearchBar() {
  const classes = useStyles();
  const [year, setYear] = React.useState("");

  const [sem, setSem] = React.useState("");

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleSemChange = (event) => {
    setSem(event.target.value);
  };
  return (
    <div>
      <div className={classes.titleHolder}>
        <Typography variant="h5">
          Search for modules to add to your planner.
        </Typography>
      </div>
      <div className={classes.infoHolder}>
        <Typography variant="subtitle1">
          Step 1: Select the AY and semester which you want to add the module to
        </Typography>
        <Typography variant="subtitle1">
          Step 2: Search for the module to add
        </Typography>
        <Typography variant="subtitle1">
          Step 3: Press submit and the module will be added in the table below
        </Typography>
      </div>
      <div>
        <FormControl variant="outlined" className={classes.formControlAY}>
          <InputLabel id="demo-simple-select-outlined-label">AY</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={year}
            onChange={handleYearChange}
            label="Year"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"AY19/20"}>AY19/20</MenuItem>
            <MenuItem value={"AY20/21"}>AY20/21</MenuItem>
            <MenuItem value={"AY21/22"}>AY21/22</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControlSem}>
          <InputLabel id="demo-simple-select-outlined-label">
            Semester
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={sem}
            onChange={handleSemChange}
            label="Semester"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Semester 1"}>Semester 1</MenuItem>
            <MenuItem value={"Semester 2"}>Semester 2</MenuItem>
            <MenuItem value={"Special Term 1"}>Special Term 1</MenuItem>
            <MenuItem value={"Special Term 2"}>Special Term 2</MenuItem>
          </Select>
        </FormControl>

        <Autocomplete
          className={classes.searchBar}
          id="combo-box-demo"
          options={NUSModules}
          getOptionLabel={(option) => option.code + ": " + option.title}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for modules here"
              variant="outlined"
            />
          )}
        />
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.button}
        >
          Add
        </Button>
      </div>
    </div>
  );
}

const NUSModules = [
  { code: "CS1101S", title: "Programing Methodology" },
  { code: "CS1231", title: "Discrete Structures" },
  { code: "CS1231S", title: "Discrete Structures" },
  { code: "CS2030", title: "Programing Methodology II" },
  { code: "CS2040", title: "Data Structures and Algorithm" },
  { code: "CS2040S", title: "Data Structures and Algorithm" },
];
