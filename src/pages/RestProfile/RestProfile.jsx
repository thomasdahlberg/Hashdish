import React from 'react';
import { Redirect } from 'react-router-dom';
import UpdateHours from '../../components/UpdateHours/UpdateHours';
import UpdatePhoto from '../../components/UpdatePhoto/UpdatePhoto';
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

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const Profile = (props) => {
    return(
        <div>
            {props.myKitchen === null ?  <Redirect to="/" />
            :
            <div className={styles.container}>
                <section className={styles.header}>
                {props.editProfPhoto ? 
                    <UpdatePhoto
                        handleFormToggle={props.handleFormToggle}
                        handleClick={props.handleClick}
                    />
                    :
                    <div className={styles.logo}>
                        <img src="./art-box-logo.svg" alt="restaurant logo"/>
                        <div className={styles.edit}>
                            <button id="editProfPhoto" onClick={props.handleClick}>Edit</button>
                        </div>
                    </div>
                }
                    <div className={styles.title}>
                        <h1>{props.myKitchen.name}</h1>
                        <h2>{props.myKitchen.address}</h2>
                        <h2>{props.myKitchen.phoneNumber}</h2>
                    </div>
                </section>
                {props.editHours ? 
                    <UpdateHours
                        openHours={props.openHours} 
                        handleClick={props.handleClick}
                        handleFormToggle={props.handleFormToggle}
                    />
                    :
                    <section className={styles.info}>
                        {DAYS.map((DAY, idx) => 
                            <p key={idx}>{DAY}: {props.openHours[idx].length > 0 ? `${profileTime(props.openHours[idx][0])} - ${profileTime(props.openHours[idx][1])}` : "Closed"}</p>
                        )}
                        <div className={styles.edit}>
                            <button id="editHours" onClick={props.handleClick}>Edit</button>
                        </div>
                    </section>
                }
            </div>
            }
        </div>
    )
}

export default Profile;