import React, { Component } from "react";
import "../styles/App.css";
import LinkList from "./LinkList";
import CreateLink from "./CreateLink";
import LogIn from "./LogIn";
import Header from "./Header";
import { BrowserRouter as Router, Switch, Route ,Redirect } from "react-router-dom";
import Search from "./Search";

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
              <Route exact path="/search" component={Search} />
              <Route exact path="/top" component={LinkList} />
              <Route exact path="/new/:page" component={LinkList} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
