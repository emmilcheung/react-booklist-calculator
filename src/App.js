import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home'
import Primary from './Primary'
import Secondary from './Secondary'
import Search from './Search'

import './App.css';
import './navbar.css'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/secondary" exact component={Secondary} />
        <Route path="/primary/:schoolId" exact component={Primary} />
        <Route exact path="/search" component={Search} />
        <Route exact strict path="" component={() =>
          (<h1>404</h1>)
        } />
      </Switch>
    </Router>
  );
}

export default App;
