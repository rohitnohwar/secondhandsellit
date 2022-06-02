import React, { Suspense } from 'react';
// import Home from "./Home";
// import Profile from "./Profile";
// import Register from "./Register"
// import Login from "./Login";
import {BrowserRouter as Router, Switch, Route, HashRouter} from "react-router-dom";

const Home = React.lazy(() => import('./Home.js'));
const Profile = React.lazy(() => import('./Profile.js'));
const Register = React.lazy(() => import('./Register.js'));
const Login = React.lazy(() => import('./Login.js'));


// function App(){ 

//   return <Router>
//   <div>
//   <Switch>
//     <Route path="/" exact component={Login} />
//     <Route path="/register" exact component={Register} />
//     <Route path="/profile" exact component={Profile} />
//     <Route path="/home" exact component={Home} />
//     <Route path="/home/:c" exact component={Home} />
//   </Switch>
//   </div>
//   </Router>
// }


function App(){ 

  return <Router>
  <div>
  <Suspense fallback={<div style={{margin:'auto', textAlign:'center',fontSize:'30px', fontWeight:'800'}}>Loading...</div>}>
  <Route>
    <Route path="/" exact component={Login} />
    <Route path="/register" exact component={Register} />
    <Route path="/profile" exact component={Profile} />
    <Route path="/home" exact component={Home} />
    <Route path="/home/:c" exact component={Home} />
  </Route>
  </Suspense>
  </div>
  </Router>
}

export default App;

