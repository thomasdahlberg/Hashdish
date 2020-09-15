import React from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return(
        <header className={styles.container}>
            <div className={styles.title}>
                <Link exact to="/"><h1>Hashdish</h1></Link>
                <em><h2>Restaurant Manager</h2></em>
            </div>
            <ul className={styles.nav}>
                <li><Link exact to="/menu">Menu</Link></li>
                <li><Link exact to="/profile">Profile</Link></li>
                <li><Link exact to="/">Logout</Link></li>
            </ul>
        </header>
    )
}

export default Header;