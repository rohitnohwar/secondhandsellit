import React from 'react';
import Home from "./Home";
import Profile from "./Profile";
import Register from "./Register"
import Login from "./Login";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App(){ 

  return <Router>
  <div>
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/profile" component={Profile} />
    <Route path="/home" component={Home} />
    <Route path="/home/:i" component={Home} />
  </Switch>
  </div>
  </Router>
}

export default App;

