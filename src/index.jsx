import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";

import Home from "./components/Home.jsx"
import Stats from "./components/Stats.jsx"
import Settings from "./components/Settings.jsx"
import Login from "./components/Login.jsx"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

const App = () => {


  return (
    <Router>
      <header className="nav_head">
        <div className="nav_container">
          <div className="logo">
            <Link to="/">Trackster</Link>
          </div>
          <nav>
            <ul>
              <li className="nav-item">
                <NavLink activeClassName="active" exact to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeClassName="active" to="/stats">Stats</NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeClassName="active" to="/settings">Settings</NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeClassName="active" to="/login">Login</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>


        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/stats">
            <Stats />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
