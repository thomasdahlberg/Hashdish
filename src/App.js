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
import Signup from './pages/Signup/Signup';

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
      delMenu: "",
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
    this.setState({ menuItems: data });
    this.handleGetMenuCategories(data);
  };

  handleGetMenuCategories = (arr) => {
    let catArr = arr.map((el) => el.category);
    let uniqueCatsArr = [...new Set(catArr)];
    this.setState({ menuCats: uniqueCatsArr });
  };

  handleMenuItemDelete = async (e) => {
    e.preventDefault();
    console.log(e.target.id);
    try {
      await API.delete(`/kitchen/menu/${e.target.id}`).then((response) => {
        if (response.status === 200) {
          console.log(response);
          this.handleGetKitchen();
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  handleMenuItemEdit = async (idx) => {
    this.setState({
      selectedMenuItem: this.state.menuItems[idx],
    });
  };

  handleMenuItemUpdate = async (idx, state) => {
    let menu = this.state.menuItems[idx]
    await API.patch(`/kitchen/menu/${menu.menuId}`, Object.assign(menu, {
      name: state.name,
      description: state.description,
      price: state.price,
      optionDefinitions: JSON.stringify(state.optionDefinitions),
    })).then(async (response) => {
        if (response.status === 200) {
            console.log(response);
            if (state.image.startsWith('data:image/jpeg;base64')) {
              await API.patch(`/kitchen/menu/picture/${menu.menuId}`, {data: state.image.split(',')[1]}).then((response) => {
                if (response.status === 200) {
                    this.setState({
                      selectedMenuItem: null,
                    });
                    console.log(response);
                }
              });
            }            
        }
    });
  }

  handleMenuItemCancel = async (idx) => {
    this.setState({
      selectedMenuItem: null,
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
    if (this.state[id]) {
      this.setState({ [id]: false });
    } else {
      this.setState({ [id]: true });
    }
  };

  handleDelMenu = (e) => {
    this.setState({ delMenu: e.target.id})
  }

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
              exact path="/profile"
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
              exact path="/menu"
              render={() =>
                LocalStorageService.getAuthToken() ? (
                  <Menu
                    menuCats={this.state.menuCats}
                    menuItems={this.state.menuItems}
                    menuItemForm={this.state.addMenuItem}
                    delMenu={this.state.delMenu}
                    selectedMenuItem={this.state.selectedMenuItem}
                    handleDelMenu={this.handleDelMenu}
                    handleClick={this.handleClick}
                    handleFormToggle={this.handleFormToggle}
                    handleMenuItemEdit={this.handleMenuItemEdit}
                    handleMenuItemUpdate={this.handleMenuItemUpdate}
                    handleMenuItemDelete={this.handleMenuItemDelete}
                    handleMenuItemCancel={this.handleMenuItemCancel}
                    handleGetKitchen={this.handleGetKitchen}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact path="/login"
              render={({ history }) => (
                <Login
                  history={history}
                  handleSignupOrLogin={this.handleSignupOrLogin}
                />
              )}
            />
            <Route
              exact path="/signup"
              render={({ history }) => (
                <Signup
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
