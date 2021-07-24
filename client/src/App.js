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
    <Route path="/register" exact component={Register} />
    <Route path="/profile" exact component={Profile} />
    <Route path="/home" exact component={Home} />
    <Route path="/home/:c" exact component={Home} />
  </Switch>
  </div>
  </Router>
}

export default App;

