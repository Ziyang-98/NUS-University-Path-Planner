import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import AboutIcon from "@material-ui/icons/Info";
import PlannerIcon from "@material-ui/icons/Book";
import ForumIcon from "@material-ui/icons/Forum";
import GuidesIcon from "@material-ui/icons/RateReview";
import Link from "@material-ui/core/Link";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link
          className="moveHome"
          color="inherit"
          style={{ textDecoration: "none" }}
          href="/"
        >
          <StyledMenuItem>
            <ListItemIcon>
              <HomeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </StyledMenuItem>
        </Link>
        <Link
          className="toHome"
          color="inherit"
          style={{ textDecoration: "none" }}
          href="/About"
        >
          <StyledMenuItem>
            <ListItemIcon>
              <AboutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="About" />
          </StyledMenuItem>
        </Link>

        <Link
          className="toPlanner"
          color="inherit"
          style={{ textDecoration: "none" }}
          href="/Planner"
        >
          <StyledMenuItem>
            <ListItemIcon>
              <PlannerIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Planner" />
          </StyledMenuItem>
        </Link>

        <Link
          className="toReviews"
          color="inherit"
          style={{ textDecoration: "none" }}
          href="/ReviewsGuides"
        >
          <StyledMenuItem>
            <ListItemIcon>
              <GuidesIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Reviews / Guides" />
          </StyledMenuItem>
        </Link>

        <Link
          className="toForum"
          color="inherit"
          style={{ textDecoration: "none" }}
          href="/Forum"
        >
          <StyledMenuItem>
            <ListItemIcon>
              <ForumIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Forums" />
          </StyledMenuItem>
        </Link>
      </StyledMenu>
    </div>
  );
}
