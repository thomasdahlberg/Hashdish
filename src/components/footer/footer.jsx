import React from 'react';
import styles from './footer.module.css';

const Footer = (props) => {
  return (
    <footer className={styles.container}>
      <p>Hashdish &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
