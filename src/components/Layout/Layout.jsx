import React from 'react';
import Header from '../Header/Header';
import styles from './Layout.module.css';

const Layout = (props) => {
  return (
    <div className={styles.container}>
      <Header handleLogout={props.handleLogout} user={props.user} />
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

export default Layout;
