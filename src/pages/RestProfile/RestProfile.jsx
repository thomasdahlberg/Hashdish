import React from 'react';
import styles from './RestProfile.module.css';

const Profile = (props) => {
    return(
        <div className={styles.container}>
            <section className={styles.header}>
                <img className={styles.logo} src="./art-box-logo.svg" alt="restaurant logo"/>
                <div className={styles.title}>
                    <h1>Restaurant Name</h1>
                    <h2>123 Test Street, Redwood, WA 12345</h2>
                </div>
            </section>
            <section className={styles.info}>
                <h3>Hours: Tuesday - Sunday 12pm - 10pm</h3>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </section>
            <section className={styles.gallery}>
                <img src="./rest1.jpg" alt="1"/>
                <img src="./rest2.jpg" alt="2"/>
                <img src="./rest3.jpg" alt="3"/>
            </section>
        </div>
    )
}

export default Profile;