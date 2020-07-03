import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import DeleteIcon from "@material-ui/icons/Delete";
import ClearIcon from "@material-ui/icons/Clear";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(5),
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
  },
}));

function createAYData(year, modulesPlanned, yearCredits, sem1, sem2, st1, st2) {
  return {
    year,
    modulesPlanned,
    yearCredits,

    semester1: sem1,
    semester2: sem2,
    specialTerm1: st1,
    specialTerm2: st2,
  };
}

function Row(props) {
  const { row, deleteYear, deleteModule } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.year}
        </TableCell>
        <TableCell align="right">{row.modulesPlanned}</TableCell>
        <TableCell align="right">{row.yearCredits}</TableCell>
        <TableCell align="right">
          <IconButton
            aria-label="delete row"
            size="small"
            onClick={() => deleteYear(row.year)}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Typography variant="h6" gutterBottom component="div">
                Semester 1
              </Typography>
              {row.semester1.length === 0 ? (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">No modules added</TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              ) : (
                <Table size="small" aria-label="semesters">
                  <TableHead>
                    <TableRow>
                      <TableCell>Module Code</TableCell>
                      <TableCell>Module Name</TableCell>
                      <TableCell align="right">Module Credit</TableCell>
                      <TableCell align="right">Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.semester1.map((sem1Row) => (
                      <TableRow key={sem1Row.moduleCode}>
                        <TableCell component="th" scope="row">
                          {sem1Row.moduleCode}
                        </TableCell>
                        <TableCell>{sem1Row.moduleTitle}</TableCell>
                        <TableCell align="right">
                          {sem1Row.moduleCredits}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            aria-label="delete module"
                            size="small"
                            onClick={() => deleteModule(row.year, "1", sem1Row)}
                          >
                            <ClearIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell style={{"font-weight": "bold"}}>Total Credits for this semester: </TableCell>
                      <TableCell/>
                      <TableCell align="right">
                        {row.semester1.reduce((total, num) => {
                          return total + num.moduleCredits
                        }, 0)
                        }
                      </TableCell>
                      <TableCell/>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </Box>
            <Box margin={2}>
              <Typography variant="h6" gutterBottom component="div">
                Semester 2
              </Typography>
              {row.semester2.length === 0 ? (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">No modules added</TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              ) : (
                <Table size="small" aria-label="semesters">
                  <TableHead>
                    <TableRow>
                      <TableCell>Module Code</TableCell>
                      <TableCell>Module Name</TableCell>
                      <TableCell align="right">Module Credit</TableCell>
                      <TableCell align="right">Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.semester2.map((sem2Row) => (
                      <TableRow key={sem2Row.moduleCode}>
                        <TableCell component="th" scope="row">
                          {sem2Row.moduleCode}
                        </TableCell>
                        <TableCell>{sem2Row.moduleTitle}</TableCell>
                        <TableCell align="right">
                          {sem2Row.moduleCredits}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            aria-label="delete module"
                            size="small"
                            onClick={() => deleteModule(row.year, "2", sem2Row)}
                          >
                            <ClearIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell style={{"font-weight": "bold"}}>Total Credits for this semester: </TableCell>
                      <TableCell/>
                      <TableCell align="right">
                        {row.semester2.reduce((total, num) => {
                          return total + num.moduleCredits
                        }, 0)
                        }
                      </TableCell>
                      <TableCell/>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </Box>
            <Box margin={2}>
              <Typography variant="h6" gutterBottom component="div">
                Special Term 1
              </Typography>
              {row.specialTerm1.length === 0 ? (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">No modules added</TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              ) : (
                <Table size="small" aria-label="semesters">
                  <TableHead>
                    <TableRow>
                      <TableCell>Module Code</TableCell>
                      <TableCell>Module Name</TableCell>
                      <TableCell align="right">Module Credit</TableCell>
                      <TableCell align="right">Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.specialTerm1.map((st1Row) => (
                      <TableRow key={st1Row.moduleCode}>
                        <TableCell component="th" scope="row">
                          {st1Row.moduleCode}
                        </TableCell>
                        <TableCell>{st1Row.moduleTitle}</TableCell>
                        <TableCell align="right">
                          {st1Row.moduleCredits}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            aria-label="delete module"
                            size="small"
                            onClick={() => deleteModule(row.year, "3", st1Row)}
                          >
                            <ClearIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell style={{"font-weight": "bold"}}>Total Credits for this semester: </TableCell>
                      <TableCell/>
                      <TableCell align="right">
                        {row.specialTerm1.reduce((total, num) => {
                          return total + num.moduleCredits
                        }, 0)
                        }
                      </TableCell>
                      <TableCell/>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </Box>
            <Box margin={2}>
              <Typography variant="h6" gutterBottom component="div">
                Special Term 2
              </Typography>
              {row.specialTerm2.length === 0 ? (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">No modules added</TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              ) : (
                <Table size="small" aria-label="semesters">
                  <TableHead>
                    <TableRow>
                      <TableCell>Module Code</TableCell>
                      <TableCell>Module Name</TableCell>
                      <TableCell align="right">Module Credit</TableCell>
                      <TableCell align="right">Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.specialTerm2.map((st2Row) => (
                      <TableRow key={st2Row.moduleCode}>
                        <TableCell component="th" scope="row">
                          {st2Row.moduleCode}
                        </TableCell>
                        <TableCell>{st2Row.moduleTitle}</TableCell>
                        <TableCell align="right">
                          {st2Row.moduleCredits}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            aria-label="delete module"
                            size="small"
                            onClick={() => deleteModule(row.year, "4", st2Row)}
                          >
                            <ClearIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell style={{"font-weight": "bold"}}>Total Credits for this semester: </TableCell>
                      <TableCell/>
                      <TableCell align="right">
                        {row.specialTerm2.reduce((total, num) => {
                          return total + num.moduleCredits
                        }, 0)
                        }
                      </TableCell>
                      <TableCell/>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    year: PropTypes.string.isRequired,
    modulesPlanned: PropTypes.number.isRequired,
    yearCredits: PropTypes.number.isRequired,
    semester1: PropTypes.arrayOf(
      PropTypes.shape({
        moduleCode: PropTypes.string.isRequired,
        moduleTitle: PropTypes.string.isRequired,
        moduleCredits: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

/*
const sem1 = [
  createModuleData("CS1101S", "Programming Methodology I", 4),
  createModuleData("CS2030", "Programming Methodology II", 4),
];

const sem2 = [
  createModuleData("CS1101S", "Programming Methodology I", 4),
  createModuleData("CS2030", "Programming Methodology II", 4),
];

const st1 = [
  createModuleData("CS1101S", "Programming Methodology I", 4),
  createModuleData("CS2030", "Programming Methodology II", 4),
];

const st2 = [
  createModuleData("CS1101S", "Programming Methodology I", 4),
  createModuleData("CS2030", "Programming Methodology II", 4),
];

const rows = [
  createAYData("AY19/20", 4, 16, sem1, sem2, [], []),
  createAYData("AY20/21", 0, 0, [], [], [], []),
  createAYData("AY21/22", 0, 0, [], [], [], []),
  createAYData("AY22/23", 0, 0, [], [], [], []),
];
*/

function countModuleCredits(sem) {
  var credit = 0;
  for (var i = 0; i < sem.length; i++) {
    credit += parseInt(sem[i].moduleCredits);
  }
  return credit;
}

// Extracts an array containing year of data (for each semester,
// index 0 to 3 are sems while index 4 and 5 are noOfModules
// and module credits respectively)
function extractSemester(year, moduleList) {
  const semesterData = [];
  var credits = 0;
  var noOfModules = 0;
  for (var key in moduleList) {
    if (moduleList.hasOwnProperty(key)) {
      if (key.slice(0, 7) === year) {
        semesterData.push(moduleList[key]);
        credits += countModuleCredits(moduleList[key]);
        noOfModules += moduleList[key].length;
      }
    }
  }
  semesterData.push(noOfModules);
  semesterData.push(credits);
  return semesterData;
}

//Extract data from module list and returns "rows"
function extractData(moduleList) {
  const years = [];
  for (var key in moduleList) {
    if (moduleList.hasOwnProperty(key)) {
      const AY = key.slice(0, 7);
      if (!years.includes(AY)) {
        years.push(AY);
      }
    }
  }
  years.sort();
  const rows = [];
  for (var i = 0; i < years.length; i++) {
    const year = years[i];
    const semData = extractSemester(year, moduleList);
    rows.push(
      createAYData(
        year,
        semData[4],
        semData[5],
        semData[0],
        semData[1],
        semData[2],
        semData[3]
      )
    );
  }

  return rows;
}

const PlannerTable = ({ moduleList, deleteYear, deleteModule }) => {
  const classes = useStyles();
  const rows = extractData(moduleList);
  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Academic Year(AY--/--)</TableCell>
              <TableCell align="right">Modules Planned</TableCell>
              <TableCell align="right">Total MCs</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row
                key={row.year}
                row={row}
                deleteYear={deleteYear}
                deleteModule={deleteModule}
              />
            ))}
          </TableBody>
          <TableBody>
            <TableCell style={{"font-weight": "bold", "font-size": 16}}>
              Overall MCs obtained: {rows.reduce((total, row) => {
                return total + row.yearCredits
              }, 0)
              }
            </TableCell>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PlannerTable;
