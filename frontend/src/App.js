import logo from "./logo.svg";
import "./App.css";
import Test from "./Test/Test";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ActorsList from "./components/ActorsList";
import React from "react";
import Home from "./components/Home";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div
            style={{
              marginLeft: 200,
              marginRight: 200,
            }}
          >
            <Home />
          </div>
        </Route>
        <Route exact path="/basic">
          <div
            style={{
              
              marginLeft: 200,
              marginRight: 200,
              backgroundColor: "#eaeaea",
            }}
          >
            <ActorsList isBasic={true} />
          </div>
        </Route>
        <Route exact path="/advanced">
          <div
            style={{
              marginLeft: 200,
              marginRight: 200,
              backgroundColor: "#eaeaea",
            }}
          >
            <ActorsList isBasic={false} />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
