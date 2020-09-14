import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import styles from './layout.module.css';

const Layout = (props) => {
    return(
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout;