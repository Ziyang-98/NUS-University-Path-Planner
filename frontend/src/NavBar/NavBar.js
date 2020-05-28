import React from "react";
import { Link, withRouter } from "react-router-dom";
import auth0Client from "../Auth";
import Logo from "../Images/logo1.png";

function NavBar(props) {
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace("/");
  };

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
      {!auth0Client.isAuthenticated() && (
        <button className="btn btn-dark" onClick={auth0Client.signIn}>
          Sign In
        </button>
      )}
      {auth0Client.isAuthenticated() && (
        <div>
          <label className="mr-2 text-secondary">
            {auth0Client.getProfile().name}
          </label>
          <button
            className="btn btn-dark"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}

export default withRouter(NavBar);
