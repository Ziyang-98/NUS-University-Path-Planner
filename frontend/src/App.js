import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import Album from "./Album/Album";
import Callback from "./Callback";
import auth0Client from "./Auth";
import AppBar from "./AppBar/AppBar";
import Questions from "./Forum/Questions/Questions";
import Question from "./Forum/Question/Question";
import NewQuestion from "./Forum/NewQuestion/NewQuestion";
import SecuredRoute from "./Forum/SecuredRoute/SecuredRoute";
import About from "./About/About";
import Footer from "./Footer/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    };
  }

  async componentDidMount() {
    if (this.props.location.pathname === "/callback") {
      this.setState({ checkingSession: false });
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== "login_required") console.log(err.error);
    }
    this.setState({ checkingSession: false });
  }
  render() {
    return (
      <div>
        <AppBar />
        <Route exact path="/" component={Album} />
        <Route path="/About" component={About} />
        <Route path="/Forum" component={Questions} />
        <Route path="/question/:questionId" component={Question} />
        <SecuredRoute
          path="/new-question"
          component={NewQuestion}
          checkingSession={this.state.checkingSession}
        />
        <Route exact path="/callback" component={Callback} />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
