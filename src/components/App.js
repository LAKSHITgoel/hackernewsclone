import React, { Component } from "react";
import "../styles/App.css";
import LinkList from "./LinkList";
import CreateLink from "./CreateLink";
import LogIn from "./LogIn";
import Header from "./Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="center w85">
          <Header />
          <div className="ph3 pv1 background-gray">
            <Switch>
              <Route exact path="/" component={LinkList} />
              <Route exact path="/create" component={CreateLink} />
              <Route exact path="/login" component={LogIn} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
