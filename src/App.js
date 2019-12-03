import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppHeader from './components/common/AppHeader';
import Footer from './components/common/Footer';
import Dashboard from './components/dashboard';

import './App.css';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className="container-fluid">
        <div className="row content">
          <div className="container">
            <Switch>
              <Route exact path='/' component={Dashboard} />
            </Switch>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
