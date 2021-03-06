import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = (theme) => ({
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

  alert: {
    marginBottom: theme.spacing(2),
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const isIncluded = (module, moduleList) => {
  const data = { result: false, year: "", sem: "" };
  const moduleArr = Object.values(moduleList);
  const years = Object.keys(moduleList);
  for (var i = 0; i < moduleArr.length; i++) {
    for (var j = 0; j < moduleArr[i].length; j++) {
      if (moduleArr[i][j].moduleCode === module.moduleCode) {
        data.result = true;
        data.year = years[i].slice(0, 7);
        data.sem =
          years[i].slice(7, 8) === "1"
            ? "Semester 1"
            : years[i].slice(7, 8) === "2"
            ? "Semester 2"
            : years[i].slice(7, 8) === "3"
            ? "Special Term 1"
            : "Special Term 2";
        break;
      }
    }
    if (data.result) {
      break;
    }
  }
  return data;
};

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availableYears: [],
      year: "",
      sem: "",
      module: null,
      // Users have access to modules in each semester based on
      // which semester they are on (noneModules if no semester is selected)
      noneModules: [],
      sem1Modules: null,
      sem2Modules: null,
      st1Modules: null,
      st2Modules: null,
      // updated: false,
      /*----Alert Conditions----*/
      success: false,
      wrongInput: false,
      noSem: false,
      noAY: false,
      noModule: false,
      sameModule: false,
      displayData: [],
    };
  }

  async componentDidMount() {
    const allModules = await axios.get(
      `http://localhost:8081/Planner/modules`,
      {}
    );
    const modules = allModules.data;

    const moduleList = this.props.userModuleList;
    const availableYears = [];
    for (var key in moduleList) {
      if (moduleList.hasOwnProperty(key)) {
        const AY = key.slice(0, 7);
        if (!availableYears.includes(AY)) {
          availableYears.push(AY);
        }
      }
    }
    availableYears.sort();
    const sem1Modules = modules.sem1;
    const sem2Modules = modules.sem2;
    const st1Modules = modules.st1;
    const st2Modules = modules.st2;
    this.setState({
      availableYears,
      sem1Modules,
      sem2Modules,
      st1Modules,
      st2Modules,
    });
  }

  async componentDidUpdate(prevProps) {
    if (this.props.userModuleList !== prevProps.userModuleList) {
      const moduleList = this.props.userModuleList;
      const availableYears = [];
      for (var key in moduleList) {
        if (moduleList.hasOwnProperty(key)) {
          const AY = key.slice(0, 7);
          if (!availableYears.includes(AY)) {
            availableYears.push(AY);
          }
        }
      }
      availableYears.sort();
      this.setState({
        availableYears,
      });
    }
  }

  handleYearChange = (AY) => {
    const year = AY;
    this.setState({ year, module: null });
  };

  handleSemChange = (semester) => {
    const sem = semester;
    this.setState({ sem, module: null });
  };

  handleModuleChange = (mod) => {
    const module = mod;
    this.setState({ module });
  };

  /*----Handle Alerts----*/
  handleClose = () => {
    this.setState({
      success: false,
      noAY: false,
      noSem: false,
      noModule: false,
      sameModule: false,
    });
  };

  display = (displayData) => {
    if (this.state.success) {
      return displayData.length === 3
        ? displayData[2] +
            " is added to " +
            displayData[1] +
            " in " +
            displayData[0] +
            "!"
        : "Success Error";
    } else if (this.state.sameModule) {
      return displayData.length === 3
        ? displayData[2] +
            " has already been added to " +
            displayData[1] +
            " in " +
            displayData[0] +
            "!"
        : "Same Module Error";
    } else if (displayData.length === 0) {
      return "No data found";
    } else if (displayData.length === 1) {
      return "Please select a " + displayData[0] + "!";
    } else if (displayData.length === 2) {
      return (
        "Please select a " + displayData[0] + " and a " + displayData[1] + "!"
      );
    } else if (displayData.length === 3) {
      return (
        "Please select a " +
        displayData[0] +
        ", a " +
        displayData[1] +
        " and a " +
        displayData[2] +
        "!"
      );
    } else {
      return "Unknown Error";
    }
  };

  submit() {
    if (
      this.state.year !== "" &&
      this.state.semester !== "" &&
      this.state.module !== null
    ) {
      const data = isIncluded(this.state.module, this.props.userModuleList);
      if (data.result) {
        const displayData = [];
        displayData.push(data.year);
        displayData.push(data.sem);
        displayData.push(this.state.module.moduleCode);
        this.setState({ sameModule: true, displayData });
      } else {
        const semester =
          this.state.sem === "Semester 1"
            ? "1"
            : this.state.sem === "Semester 2"
            ? "2"
            : this.state.sem === "Special Term 1"
            ? "3"
            : "4";
        this.props.submitModule(this.state.year, semester, this.state.module);
        this.setState({
          module: null,
        });
        const displayData = [];
        displayData.push(this.state.year);
        displayData.push(this.state.sem);
        displayData.push(this.state.module.moduleCode);
        this.setState({ success: true, displayData });
        return;
      }
    } else {
      const displayData = [];
      if (this.state.year === "") {
        displayData.push("AY");
        this.setState({ noAY: true, displayData });
      }

      if (this.state.sem === "") {
        this.setState({ noSem: true });
        displayData.push("semester");
        this.setState({ displayData });
      }

      if (this.state.module === null) {
        this.setState({ noModule: true });
        displayData.push("module");
        this.setState({ displayData });
      }
    }
  }

  render() {
    const AYs = [...this.state.availableYears];
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.titleHolder}>
          <Typography variant="h5">
            Search for modules to add to your planner.
          </Typography>
        </div>
        <div className={classes.infoHolder}>
          <Typography variant="subtitle1">
            Step 1: Select the AY and semester which you want to add the module
            to
          </Typography>
          <Typography variant="subtitle1">
            Step 2: Search for the module to add
          </Typography>
          <Typography variant="subtitle1">
            Step 3: Press the ADD button and the module will be added
            accordingly in the table below
          </Typography>
        </div>
        <div>
          <FormControl variant="outlined" className={classes.formControlAY}>
            <InputLabel id="demo-simple-select-outlined-label">AY</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={this.state.year}
              onChange={(e) => this.handleYearChange(e.target.value)}
              label="Year"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {AYs.map((AY) => (
                <MenuItem key={AY} value={AY}>
                  {AY}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" className={classes.formControlSem}>
            <InputLabel id="demo-simple-select-outlined-label">
              Semester
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={this.state.sem}
              onChange={(e) => this.handleSemChange(e.target.value)}
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
            value={this.state.module}
            onChange={(event, newValue) => this.handleModuleChange(newValue)}
            options={
              this.state.sem === "Semester 1"
                ? this.state.sem1Modules
                : this.state.sem === "Semester 2"
                ? this.state.sem2Modules
                : this.state.sem === "Special Term 1"
                ? this.state.st1Modules
                : this.state.sem === "Special Term 2"
                ? this.state.st2Modules
                : this.state.noneModules
            }
            getOptionLabel={(option) =>
              option.moduleCode + ": " + option.moduleTitle
            }
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
            onClick={() => this.submit()}
          >
            Add
          </Button>
        </div>
        {/*----Alerts----*/}
        <Snackbar
          open={this.state.success}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <Alert
            className={classes.alert}
            onClose={this.handleClose}
            severity="success"
          >
            {this.display(this.state.displayData)}
          </Alert>
        </Snackbar>
        <Snackbar
          open={
            this.state.noAY ||
            this.state.noSem ||
            this.state.noModule ||
            this.state.sameModule
          }
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <Alert
            className={classes.alert}
            onClose={this.handleClose}
            severity="error"
          >
            {this.display(this.state.displayData)}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(useStyles)(SearchBar);
