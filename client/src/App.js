import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./Pages/Landing";
import User from "./Pages/User";
import About from "./Pages/About";
// import NoMatch from "./Pages/NoMatch";

const App = () => 
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/user" component={User}/>
        <Route exact path="/about" component={About}/>
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>;

export default App;
