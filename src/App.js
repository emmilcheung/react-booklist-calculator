import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home'
import Secondary from './Secondary'
import Search from './Search'

import './App.css';
import './navbar.css'


function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/secondary" exact component={Secondary} />
      <Route path="/search" exact component={Search} />
    </Router>
  );
}

export default App;
