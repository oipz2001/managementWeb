import React from 'react';
import './App.css';
import Navbar from './screens/components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './screens/page/Home';
import Reports from './screens/page/Reports';
import Seatmap from './screens/page/Seatmap';
import Attendants from './screens/page/Attendants';
import Login from './screens/page/Login';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/reports' component={Reports} />
          <Route path='/seatmap' component={Seatmap} />
          <Route path='/attendants' component={Attendants} />
        </Switch>
      </Router>
    </>
  );
}

export default App;