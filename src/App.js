import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

// Pages
import Profile from './pages/RestProfile/RestProfile';
import Menu from './pages/RestMenu/RestMenu';
import Login from './pages/Login/Login';

// Components
import Layout from './components/Layout/Layout';
import LocalStorageService from './utils/localStorageService';

class App extends Component {
  state = this.getInitialState();

  getInitialState() {
    return {
      menuItemForm: false,
      user: LocalStorageService.getAuthToken() ? true : false,
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    if (e.target.id === 'addMenuItem') {
      this.handleMenuItemFormToggle();
    } else return;
  };

  handleMenuItemFormToggle = () => {
    if (this.state.menuItemForm) {
      this.setState({ menuItemForm: false });
    } else {
      this.setState({ menuItemForm: true });
    }
  };

  handleLogout = () => {
    LocalStorageService.clearToken();
    this.setState({user: false});
  };

  handleSignupOrLogin = () => {
    this.setState({user: LocalStorageService.getAuthToken() ? true : false});
  }

  render() {
    return (
      <div className="App-Outer-Container">
        <Layout handleLogout={this.handleLogout} user={this.state.user}>
          <Switch>
            <Route exact path="/" render={() => <h1>Home Page Content</h1>} />
            <Route exact path="/profile" render={() => 
              LocalStorageService.getAuthToken() ? 
              <Profile />
                :
              <Redirect to='/login' />
            }/>
            <Route
              exact
              path="/menu"
              render={() =>
                LocalStorageService.getAuthToken() ?  
                <Menu
                  menuItemForm={this.state.menuItemForm}
                  handleClick={this.handleClick}
                />
                  :
                <Redirect to='/login' />
            }/>
            <Route exact path="/login" render={({ history }) => 
              <Login history={ history } handleSignupOrLogin={this.handleSignupOrLogin}/>
            }/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
