import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import Callback from "./Callback";
import auth0Client from "./Auth";
import AppBar from "./AppBar/AppBar";
import Questions from "./Forum/Questions/Questions";
import Question from "./Forum/Question/Question";
import NewQuestion from "./Forum/NewQuestion/NewQuestion";
import SecuredRoute from "./SecuredRoute/SecuredRoute";
import About from "./About/About";
import Footer from "./Footer/Footer";
import Planner from "./Planner/Planner";
import Home from "./Home/Home";
import ReviewsGuides from "./Reviews/ReviewsHome";
import GuidePage from "./Reviews/Guide/Guide";
import GuideEditPage from "./Planner/ExportPlanner/Edit/EditGuide";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
      currentRoute: "/",
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
    if (auth0Client.isAuthenticated()) {
      localStorage.setItem("username", auth0Client.getProfile().name);
    }
    this.setState({ checkingSession: false });
  }

  render() {
    return (
      <div>
        <AppBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/callback" component={Callback} />
        <Route path="/About" component={About} />
        <SecuredRoute
          path="/Planner"
          component={Planner}
          checkingSession={this.state.checkingSession}
        />
        <SecuredRoute
          path="/ReviewsGuides"
          component={ReviewsGuides}
          checkingSession={this.state.checkingSession}
        />
        <Route
          path="/Guides/:name"
          component={GuidePage}
          checkingSession={this.state.checkingSession}
        />
        <SecuredRoute
          path="/EditGuide/:name"
          component={GuideEditPage}
          checkingSession={this.state.checkingSession}
        />
        <SecuredRoute
          path="/Forum"
          component={Questions}
          checkingSession={this.state.checkingSession}
        />
        <Route
          path="/question/:questionId"
          component={Question}
          checkingSession={this.state.checkingSession}
        />
        <SecuredRoute
          path="/new-question"
          component={NewQuestion}
          checkingSession={this.state.checkingSession}
        />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
