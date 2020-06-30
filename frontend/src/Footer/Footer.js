import React, { Component } from "react";

class Footer extends Component {
  render() {
    const footerStyle = {
      position: "fixed",
      width: "100%",
      background: "#333",
      color: "#fff",
      textAlign: "center",
      padding: "20",
      bottom: "0",
    };

    return (
      <div>
        <footer style={footerStyle}>Copyright © 2020; Mod Planner</footer>
      </div>
    );
  }
}

export default Footer;
