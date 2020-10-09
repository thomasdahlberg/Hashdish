import React, { Fragment } from 'react';
import styles from './header.module.css';
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
    </Fragment>
  );

  return (
    <header className={styles.container}>
      <div className={styles.title}>
        <Link to="/">
          <h1>Hashdish</h1>
        </Link>
        <em>
          <h2>Restaurant Manager</h2>
        </em>
      </div>
      <ul className={styles.nav}>{nav}</ul>
    </header>
  );
};

export default Header;
