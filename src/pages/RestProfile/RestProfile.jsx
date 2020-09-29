import React from 'react';
import { Redirect } from 'react-router-dom';
import UpdateHours from '../../components/UpdateHours/UpdateHours';
import styles from './RestProfile.module.css';

const Profile = (props) => {
    return(
        <div>
            {props.myKitchen === null ?  <Redirect to="/" />
            :
            <div className={styles.container}>
                <section className={styles.header}>
                    <div className={styles.logo}>
                        <img src="./art-box-logo.svg" alt="restaurant logo"/>
                        <div className={styles.edit}>
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    </div>
                    <div className={styles.title}>
                        <h1>{props.myKitchen.name}</h1>
                        <h2>{props.myKitchen.address}</h2>
                        <h2>{props.myKitchen.phoneNumber}</h2>
                    </div>
                </section>
                {props.editHours ? 
                    <UpdateHours handleClick={props.handleClick}/>
                    :
                    <section className={styles.info}>
                        {props.myKitchen.openHours.map(({name, openHours}, idx) => 
                            <p key={idx}>{name}: {openHours[0]}</p>
                        )}
                        <div className={styles.edit}>
                            <button id="editHours" onClick={props.handleClick}>Edit</button>
                            <button>Delete</button>
                        </div>
                    </section>
                }
                <section className={styles.gallery}>
                    <img src="./rest1.jpg" alt="1"/>
                    <img src="./rest2.jpg" alt="2"/>
                    <img src="./rest3.jpg" alt="3"/>
                </section>
            </div>
            }
        </div>
    )
}

export default Profile;