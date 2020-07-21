import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home'
import Primary from './Primary'
import Secondary from './Secondary'
import Search from './Search'
import Repurchase from './Repurchase'


import './navbar.css'


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/primary/:schoolId?" component={Primary} />
        <Route path="/secondary/:schoolId?" component={Secondary} />
        <Route exact path="/" component={Home} />
        <Route exact path="/search" exact component={Search} />
        <Route exact path="/repurchase" exact component={Repurchase} />
        <Route exact strict path="" component={() =>
          (<h1>404</h1>)
        } />
      </Switch>
    </Router>
  );
}

export default App;
