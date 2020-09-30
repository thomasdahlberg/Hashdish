import React from 'react';
import { Redirect } from 'react-router-dom';
import UpdateHours from '../../components/UpdateHours/UpdateHours';
import styles from './RestProfile.module.css';

function profileTime(time) {
    if(time < 1200) {
        if(time < 1000) {
            let newTime = [String(time).slice(0,1),":",String(time).slice(1)," AM"].join("")
            return newTime;
        } else {
            let newTime = [String(time).slice(0,2),":",String(time).slice(2)," AM"].join("")
            return newTime;
        }
    } else if(time < 1300) {
        let newTime = [String(time).slice(0,2),":",String(time).slice(2)," PM"].join("")
        return newTime;
    } else {
        let adjust = time - 1200;
        if(adjust < 1000) {
            let newTime = [String(adjust).slice(0,1),":",String(adjust).slice(1)," PM"].join("")
            return newTime;
        } else {
            let newTime = [String(adjust).slice(0,2),":",String(adjust).slice(2)," PM"].join("")
            return newTime;
        }
    }
}

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
                    <UpdateHours
                        openHours={props.myKitchen.openHours} 
                        handleClick={props.handleClick}
                    />
                    :
                    <section className={styles.info}>
                        {props.myKitchen.openHours.map(({name, openHours}, idx) => 
                            openHours[0] ? <p key={idx}>{name}: {profileTime(openHours[0][0])} - {profileTime(openHours[0][1])}</p> : null
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