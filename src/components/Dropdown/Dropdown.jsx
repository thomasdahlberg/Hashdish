import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Dropdown.module.css';

class Dropdown extends Component {
  state = this.getInitialState();

  getInitialState() {
    return {
      user: this.props.user,
      listOpen: false,
    };
  }

  handleDropdown = (e) => {
    e.preventDefault();
    this.state.listOpen
      ? this.setState({ listOpen: false })
      : this.setState({ listOpen: true });
  };

  handleDropdownClick = (e) => {
    e.preventDefault();
    if (e.target.id === 'logout') {
      this.props.handleLogout();
    }
    this.setState({ listOpen: false });
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <button
          className={styles.button}
          onClick={this.handleDropdown}
        >
          <i className="fa fa-bars"></i>
        </button>
        {this.state.listOpen ? (
          <div className={styles.list}>
            {this.props.user ? (
              <Fragment>
                <Link to="/menu">Menu</Link>
                <Link to="/profile">Profile</Link>
                <Link
                  to="/"
                  id="logout"
                  onClick={this.props.handleLogout}
                >
                  Log Out
                </Link>
              </Fragment>
            ) : (
              <Fragment>
                <Link to="/login">Log In</Link>
                <Link to="/signup">Sign Up</Link>
              </Fragment>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Dropdown;
