import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

// Pages
import Profile from './pages/rest_profile';
import Menu from './pages/rest_menu';

// Components
import Layout from './components/layout/layout';

function App() {
  return (
    <div className="App-Outer-Container">
      <Layout>
        <Switch>
          <Route exact path="/" render={() => 
            <h1>Home Page Content</h1>
          }/>
          <Route exact path="/profile" render={() =>
            <Profile />
          }/>
          <Route exact path="/menu" render={() =>
            <Menu />
          }/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
