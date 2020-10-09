import React from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import styles from './Layout.module.css';

const Layout = (props) => {
  return (
    <div className={styles.container}>
      <Header handleLogout={props.handleLogout} user={props.user} />
      <div className={styles.content}>{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
