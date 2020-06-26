import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import Callback from "./Callback";
import auth0Client from "./Auth";
import AppBar from "./AppBar/AppBar";
import Questions from "./Forum/Questions/Questions";
import Question from "./Forum/Question/Question";
import NewQuestion from "./Forum/NewQuestion/NewQuestion";
import SecuredRoute from "./Forum/SecuredRoute/SecuredRoute";
import About from "./About/About";
import Footer from "./Footer/Footer";
import Planner from "./Planner/Planner";
import Home from "./Home/Home";
import ReviewsGuides from "./Reviews/ReviewsHome";
import GuidePage from "./Reviews/Guide/Guide";

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
        <Route exact path="/" component={Home} />
        <Route exact path="/callback" component={Callback} />
        <Route path="/About" component={About} />
        <Route path="/Planner" component={Planner} />
        <Route path="/ReviewsGuides" component={ReviewsGuides} />
        <Route path="/Guides/:name" component={GuidePage} />
        <Route path="/Forum" component={Questions} />
        <Route path="/question/:questionId" component={Question} />
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
