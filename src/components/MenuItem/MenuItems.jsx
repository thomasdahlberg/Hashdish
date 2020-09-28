import React from 'react';
import styles from './MenuItems.module.css';

const MenuItems = (props) => {
    return(
        <div className={styles.container}>
            <section className={styles.item}>
                <div className={styles.title}>
                    <h2>Soft Pretzel</h2>
                    <img src="./pretzel.jpg" alt="menu item"/>
                </div>
                <div className={styles.description}>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
                <div className={styles.price}>
                    <p>$8.99</p>
                    <div className={styles.admin}>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MenuItems;