import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

// Pages
import Profile from './pages/rest_profile/rest_profile';
import Menu from './pages/rest_menu/rest_menu';

// Components
import Layout from './components/layout/layout';

class App extends Component {
  state = this.getInitialState();

  getInitialState(){
    return {
      menuItemForm: false
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    if(e.target.id === "addMenuItem") {
      this.handleMenuItemFormToggle();
    } else return;
  }

  handleMenuItemFormToggle = () => {
    if(this.state.menuItemForm) {
      this.setState({menuItemForm: false});
    } else {
      this.setState({menuItemForm: true});
    }
  }

  render(){
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
              <Menu 
                menuItemForm = {this.state.menuItemForm}
                handleClick = {this.handleClick}
              />
            }/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
