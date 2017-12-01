import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./Pages/Landing";
// import Home from "./pages/Home";
import About from "./Pages/About";
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
        <Route exact path="/about" component={About}/>
      </Switch>
    </div>
  </Router>;

export default App;
