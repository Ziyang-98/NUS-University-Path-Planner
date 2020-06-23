import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import PlannerIcon from "@material-ui/icons/Book";
import ForumIcon from "@material-ui/icons/Forum";
import GuidesIcon from "@material-ui/icons/RateReview";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import ForumPic from "../Images/forum.png";
import ReviewsPic from "../Images/reviews.png";
import PlannerPic from "../Images/planner.png";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    marginBottom: 50,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },

  infoBoxes: {
    height: 300,
    backgroundColor: "#f9f9f9",
  },

  forumContainer: {
    height: 300,
    backgroundColor: "#f9f9f9",
  },
  infoContainer: {
    float: "right",
    height: "inherit",
    backgroundColor: "#f9f9f9",
    height: "inherit",
    width: "70%",
  },
  imageContainer: {
    float: "left",
    height: "inherit",
    backgroundColor: "#f9f9f9",
    width: "30%",
  },
  images: {
    height: 180,
    width: 300,
  },

  forumButton: {
    marginTop: 90,
  },
}));

export default function NestedList() {
  const classes = useStyles();
  const [openPlanner, setOpenPlanner] = React.useState(true);
  const [openReview, setOpenReview] = React.useState(true);
  const [openForum, setOpenForum] = React.useState(true);

  const handleClickPlanner = () => {
    setOpenPlanner(!openPlanner);
  };

  const handleClickReview = () => {
    setOpenReview(!openReview);
  };

  const handleClickForum = () => {
    setOpenForum(!openForum);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Click to find out more about our features!
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button onClick={handleClickPlanner}>
        <ListItemIcon>
          <PlannerIcon />
        </ListItemIcon>
        <ListItemText primary="Planner" />
        {openPlanner ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openPlanner} timeout="auto" unmountOnExit>
        <Typography variant="subtitle1">
          <Box className={classes.infoBox}>
            <Box className={classes.imageContainer}>
              <img className={classes.images} src={PlannerPic} />
            </Box>
            <Box className={classes.infoContainer}>
              The planner interface allows user to add modules based on user's
              recommendations from data statistics, as well as user's own
              preference of modules in their respective fields.
              <div className={classes.forumButton}>
                <Link href="/Planner">
                  <Button variant="outlined" color="primary">
                    Move to Planner
                  </Button>
                </Link>
              </div>
            </Box>
          </Box>
        </Typography>
      </Collapse>

      <ListItem button onClick={handleClickReview}>
        <ListItemIcon>
          <GuidesIcon />
        </ListItemIcon>
        <ListItemText primary="Reviews / Guides" />
        {openReview ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openReview} timeout="auto" unmountOnExit>
        <Typography variant="subtitle1">
          <Box className={classes.infoBox}>
            <Box className={classes.imageContainer}>
              <img className={classes.images} src={ReviewsPic} />
            </Box>
            <Box className={classes.infoContainer}>
              The reviews / guides section features planners made my users. It
              recommends specific combination of modules and their benefits to
              other users and advise other users about module planning.
              <div className={classes.forumButton}>
                <Link href="/ReviewsGuides">
                  <Button variant="outlined" color="primary">
                    Move to Reviews/Guides
                  </Button>
                </Link>
              </div>
            </Box>
          </Box>
        </Typography>
      </Collapse>

      <ListItem button onClick={handleClickForum}>
        <ListItemIcon>
          <ForumIcon />
        </ListItemIcon>
        <ListItemText primary="Forum" />
        {openForum ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openForum} timeout="auto" unmountOnExit>
        <Typography variant="subtitle1">
          <Box className={classes.infoBox}>
            <Box className={classes.imageContainer}>
              <img className={classes.images} src={ForumPic} />
            </Box>
            <Box className={classes.infoContainer}>
              The forum is a Q&A platforum for users to post/answer any queries
              or issues faced when planning their modules.
              <Box className={classes.forumButton}>
                <Link href="/Forum">
                  <Button variant="outlined" color="primary">
                    Move to Forums
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Typography>
      </Collapse>
    </List>
  );
}
