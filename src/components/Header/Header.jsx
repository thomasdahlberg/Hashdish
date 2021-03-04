import React, { Fragment } from 'react';
import Media from 'react-media';
import Dropdown from '../Dropdown/Dropdown';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = (props) => {
  let nav = props.user ? (
    <Fragment>
      <li>
        <Link to="/menu">Menu</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to="/" onClick={props.handleLogout}>
          Log Out
        </Link>
      </li>
    </Fragment>
  ) : (
    <Fragment>
      <li>
        <Link to="/login">Log In</Link>
      </li>
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>
    </Fragment>
  );

  return (
    <header className={styles.container}>
      <Media queries={{ small: '(max-width: 799px)' }}>
        {(matches) =>
          matches.small ? (
            <Fragment>
              <div className={styles.mobile}>
                <Link to="/">
                  <h1>Hashdish</h1>
                </Link>
                <h2>Restaurant Manager</h2>
              </div>
              <Dropdown
                user={props.user}
                handleLogout={props.handleLogout}
              />
            </Fragment>
          ) : (
            <Fragment>
              <div className={styles.title}>
                <Link to="/">
                  <h1>Hashdish</h1>
                </Link>
                <h2>Restaurant Manager</h2>
              </div>
              <ul className={styles.nav}>{nav}</ul>
            </Fragment>
          )
        }
      </Media>
    </header>
  );
};

export default Header;
