import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

// Pages
import Profile from './pages/RestProfile/RestProfile';
import Menu from './pages/RestMenu/RestMenu';
import Login from './pages/Login/Login';

// Components
import Layout from './components/Layout/Layout';

// Utilities
import LocalStorageService from './utils/localStorageService';
import kitchenInstance from './utils/axiosConfig';

const API = kitchenInstance;

class App extends Component {
  state = this.getInitialState();

  getInitialState() {
    return {
      addMenuItem: false,
      selectedMenuItem: null,
      user: LocalStorageService.getAuthToken() ? true : false,
      myKitchen: null,
      menuItems: null,
      menuCats: null,
      openHours: [],
      editHours: false,
      editProfPhoto: false,
    };
  }
  // Data Handlers
  handleGetKitchen = async () => {
    let response = await API.get('/kitchen/me');
    let data = response.data;
    let kitchen = {
      address: data.address,
      cuisine: data.cuisine,
      email: data.email,
      flags: data.flags,
      kitchenId: data.kitchenId,
      name: data.name,
      openHours: JSON.parse(data.openHoursDefinition).openHours,
      phoneNumber: data.phoneNumber,
      pictureKey: data.pictureKey,
    };
    this.handleOpenHoursSort(kitchen.openHours);
    this.handleGetMenuItems(kitchen.kitchenId);
    this.setState({
      myKitchen: kitchen,
    });
  };

  handleOpenHoursSort = (openHours) => {
    this.setState({
      openHours,
    });
  };

  handleGetMenuItems = async (id) => {
    let response = await API.get(`menus/${id}`);
    let data = response.data;
    this.setState({ menuItems: data});
    this.handleGetMenuCategories(data);
  }

  handleGetMenuCategories = (arr) => {
    let catArr = arr.map(el => el.category);
    let uniqueCatsArr = [...new Set(catArr)];
    this.setState({ menuCats: uniqueCatsArr});
  }

  handleMenuItemDelete = async (e) => {
    e.preventDefault();
    console.log(e.target.id);
    try {
      await API.delete(`/kitchen/menu/${e.target.id}`).then(response => {
        if (response.status === 200) {
          console.log(response);
          this.handleGetKitchen();
        }
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  handleMenuItemEdit = async (idx) => {
    this.setState({
      addMenuItem: true,
      selectedMenuItem: this.state.menuItems[idx],
    });
  }

  // DOM Handlers
  handleClick = (e) => {
    e.preventDefault();
    if (e.target.id) {
      this.handleFormToggle(e.target.id);
    } else return;
  };

  handleFormToggle = (id) => {
    if (id === 'addMenuItem') {
      this.setState({
        selectedMenuItem: null
      })
    }
    if (this.state[id]) {
      this.setState({ [id]: false });
    } else {
      this.setState({ [id]: true });
    }
  };

  // Login/Logout Handlers
  handleLogout = () => {
    LocalStorageService.clearToken();
    this.setState({
      user: false,
      myKitchen: null,
    });
  };

  handleSignupOrLogin = () => {
    this.handleGetKitchen();
    LocalStorageService.getAuthToken()
      ? this.setState({ user: true })
      : this.setState({ user: false });
  };

  // Lifecycle Hooks

  componentDidMount = async () => {
    await this.handleGetKitchen();
  };

  render() {
    return (
      <div className="App-Outer-Container">
        <Layout handleLogout={this.handleLogout} user={this.state.user}>
          <Switch>
            <Route exact path="/" render={() => <h1>Home Page Content</h1>} />
            <Route
              exact
              path="/profile"
              render={() =>
                LocalStorageService.getAuthToken() ? (
                  <Profile
                    myKitchen={this.state.myKitchen}
                    openHours={this.state.openHours}
                    editHours={this.state.editHours}
                    editProfPhoto={this.state.editProfPhoto}
                    handleGetKitchen={this.handleGetKitchen}
                    handleClick={this.handleClick}
                    handleFormToggle={this.handleFormToggle}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/menu"
              render={() =>
                LocalStorageService.getAuthToken() ? (
                  <Menu
                    menuCats={this.state.menuCats}
                    menuItems={this.state.menuItems}
                    menuItemForm={this.state.addMenuItem}
                    selectedMenuItem={this.state.selectedMenuItem}
                    handleClick={this.handleClick}
                    handleFormToggle={this.handleFormToggle}
                    handleMenuItemEdit={this.handleMenuItemEdit}
                    handleMenuItemDelete={this.handleMenuItemDelete}
                    handleGetKitchen={this.handleGetKitchen}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/login"
              render={({ history }) => (
                <Login
                  history={history}
                  handleSignupOrLogin={this.handleSignupOrLogin}
                />
              )}
            />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
