import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Secondary from './Secondary'
import Home from './Home'

import './App.css';


function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/secondary" exact component={Secondary} />
      {/* <Secondary /> */}
    </Router>
  );
}

export default App;
