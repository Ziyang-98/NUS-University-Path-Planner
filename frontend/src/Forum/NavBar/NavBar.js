import React from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from "../Images/logo1.png";

function NavBar(props) {
  const navBarColour = {
    backgroundColor: "#CEFBF8",
  };

  const title = {
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: "800",
    color: "#555555",
    fontStyle: "Italic",
    letterSpacing: "0.1em",
    fontSize: "22px",
    /*
    <Link className="navbar-brand" to="/" style={title}>
        ModPlanner Forums
      </Link>
            <img src={Logo} alt="app logo" />

      */
  };

  return (
    <nav class="navbar navbar-light fixed-top" style={navBarColour}>
      <Link className="navbar-brand" to="/">
        <img src={Logo} alt="app logo" />
      </Link>
      )}
    </nav>
  );
}

export default withRouter(NavBar);
