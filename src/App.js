import React from 'react';
import Layout from './components/layout/layout';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App-Outer-Container">
      <Layout>
        <Switch>
          <Route exact path="/" render={() => 
            <h1>Home Page Content</h1>
          }/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
