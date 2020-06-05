import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Index } from './components/Index';
import { Pokemon } from './components/Pokemon';

import { GlobalProvider } from './context/GlobalState';

import './App.css';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/pokemon/:id" component={Pokemon} />
          </Switch>
        </>
      </Router>
    </GlobalProvider >
  );
};

export default App;
