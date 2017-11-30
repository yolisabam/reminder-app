import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import NoMatch from "./pages/NoMatch";
// import Nav from ".components/Nav";

const App = () => 
  <Router>
    <div>
      {/*
      <Nav />
      <Header />
      */}
      <Switch>
        <Route exact path="/" component={Landing} />
        {/*<Route exact path="/home" component={Home} />
        <Route exact path="/about" component={About}/>
        <Route component={NoMatch} />*/}
      </Switch>
    </div>
  </Router>;

export default App;
