import React from "react";
import PropTypes from "prop-types";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
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
    marginBottom: theme.spacing(15),
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
  },
}));

function createModuleData(moduleCode, moduleName, moduleCredit) {
  return {
    moduleCode,
    moduleName,
    moduleCredit,
  };
}

function createAYData(
  year,
  modulesPlanned,
  moduleCredits,
  sem1,
  sem2,
  st1,
  st2
) {
  /*
  console.log(st2);
  st2.map((x) => console.log(x));
  */
  return {
    year,
    modulesPlanned,
    moduleCredits,

    semester1: sem1,
    semester2: sem2,
    specialTerm1: st1,
    specialTerm2: st2,
  };
}

function Row(props) {
  const { row } = props;
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
        <TableCell align="right">{row.moduleCredits}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Typography variant="h6" gutterBottom component="div">
                Semester 1
              </Typography>
              <Table size="small" aria-label="semesters">
                <TableHead>
                  <TableRow>
                    <TableCell>Module Code</TableCell>
                    <TableCell>Module Name</TableCell>
                    <TableCell align="right">Module Credit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.semester1.map((sem1Row) => (
                    <TableRow key={sem1Row.moduleCode}>
                      <TableCell component="th" scope="row">
                        {sem1Row.moduleCode}
                      </TableCell>
                      <TableCell>{sem1Row.moduleName}</TableCell>
                      <TableCell align="right">
                        {sem1Row.moduleCredit}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Box margin={2}>
              <Typography variant="h6" gutterBottom component="div">
                Semester 2
              </Typography>
              <Table size="small" aria-label="semesters">
                <TableHead>
                  <TableRow>
                    <TableCell>Module Code</TableCell>
                    <TableCell>Module Name</TableCell>
                    <TableCell align="right">Module Credit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.semester2.map((sem2Row) => (
                    <TableRow key={sem2Row.moduleCode}>
                      <TableCell component="th" scope="row">
                        {sem2Row.moduleCode}
                      </TableCell>
                      <TableCell>{sem2Row.moduleName}</TableCell>
                      <TableCell align="right">
                        {sem2Row.moduleCredit}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Box margin={2}>
              <Typography variant="h6" gutterBottom component="div">
                Special Term 1
              </Typography>
              <Table size="small" aria-label="semesters">
                <TableHead>
                  <TableRow>
                    <TableCell>Module Code</TableCell>
                    <TableCell>Module Name</TableCell>
                    <TableCell align="right">Module Credit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.specialTerm1.map((st1Row) => (
                    <TableRow key={st1Row.moduleCode}>
                      <TableCell component="th" scope="row">
                        {st1Row.moduleCode}
                      </TableCell>
                      <TableCell>{st1Row.moduleName}</TableCell>
                      <TableCell align="right">{st1Row.moduleCredit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Box margin={2}>
              <Typography variant="h6" gutterBottom component="div">
                Special Term 2
              </Typography>
              <Table size="small" aria-label="semesters">
                <TableHead>
                  <TableRow>
                    <TableCell>Module Code</TableCell>
                    <TableCell>Module Name</TableCell>
                    <TableCell align="right">Module Credit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.specialTerm2.map((st2Row) => (
                    <TableRow key={st2Row.moduleCode}>
                      <TableCell component="th" scope="row">
                        {st2Row.moduleCode}
                      </TableCell>
                      <TableCell>{st2Row.moduleName}</TableCell>
                      <TableCell align="right">{st2Row.moduleCredit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
    moduleCredits: PropTypes.number.isRequired,
    semester1: PropTypes.arrayOf(
      PropTypes.shape({
        moduleCode: PropTypes.string.isRequired,
        moduleName: PropTypes.string.isRequired,
        moduleCredit: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

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
  createAYData("AY19/20", 4, 16, sem1, sem2, st1, st2),
  createAYData("AY20/21", 0, 0, [], [], [], []),
  createAYData("AY21/22", 0, 0, [], [], [], []),
  createAYData("AY22/23", 0, 0, [], [], [], []),
];

export default function PlannerTable() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Academic Year(--/-- AY)</TableCell>
              <TableCell align="right">Modules Planned</TableCell>
              <TableCell align="right">Total MCs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.year} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
