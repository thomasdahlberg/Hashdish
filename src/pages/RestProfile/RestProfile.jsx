import React from 'react';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UpdateHours from '../../components/UpdateHours/UpdateHours';
import UpdatePhoto from '../../components/UpdatePhoto/UpdatePhoto';
import styles from './RestProfile.module.css';

function profileTime(timeArr) {
    let timeStringArr = []
    for(var time of timeArr) {
        var start = [String((Math.floor(time[0] / 100) % 12 === 0) ? 12 : Math.floor(time[0] / 100) % 12),":",('0' + String(time[0] % 100)).slice(-2), (time[0] / 100 >= 12) ? ' PM' : ' AM'].join("")
        var end = [String((Math.floor(time[1] / 100) % 12 === 0) ? 12 : Math.floor(time[1] / 100) % 12),":",('0' + String(time[1] % 100)).slice(-2), (time[0] / 100 >= 12) ? ' PM' : ' AM'].join("")
        timeStringArr.push(`${start} - ${end}`)
    }
    return timeStringArr.join(', ')
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

var STORAGE_URL = 'https://homecookimages.blob.core.windows.net/'
if (process.env.NODE_ENV === 'production') {
    STORAGE_URL = 'https://hashdish.blob.core.windows.net/'
}

class Profile extends Component {

    componentWillUnmount = () => {
        if(this.props.editProfPhoto) {
            this.props.handleFormToggle("editProfPhoto");
        }
        if(this.props.editHours) {
            this.props.handleFormToggle("editHours");
        }
    }

    render() {
        return(
            <div>
                {this.props.myKitchen === null ?  <Redirect to="/" />
                :
                <section className={styles.container}>
                    <div className={styles.infocont}>
                        <div className={styles.title}>
                            <h1>{this.props.myKitchen.name}</h1>
                            <h2>{this.props.myKitchen.address}</h2>
                            <h2>tel: {this.props.myKitchen.phoneNumber}</h2>
                        </div>
                        {this.props.editProfPhoto ? 
                            <UpdatePhoto
                                handleFormToggle={this.props.handleFormToggle}
                                handleGetKitchen={this.props.handleGetKitchen}
                                handleClick={this.props.handleClick}
                            />
                            :
                            <div className={styles.logo}>
                                <img src={`${STORAGE_URL}pictures/${this.props.myKitchen.pictureKey}.jpg`} alt="restaurant logo"/>
                                <div className={styles.edit}>
                                    <button id="editProfPhoto" onClick={this.props.handleClick}>Update Photo</button>
                                </div>
                            </div>
                        }        
                    </div>
                    {this.props.editHours ? 
                        <UpdateHours
                            openHours={this.props.openHours} 
                            handleClick={this.props.handleClick}
                            handleFormToggle={this.props.handleFormToggle}
                            handleGetKitchen={this.props.handleGetKitchen}
                        />
                    :
                        <div className={styles.info}>
                            <h3>Open Hours</h3>                    
                            {DAYS.map((DAY, idx) =>
                                <div className={styles.day}> 
                                    <p key={idx}>{DAY}:</p>
                                    <p className={styles.hours}>{this.props.openHours[idx]?.length > 0 ? `${profileTime(this.props.openHours[idx])}` : "Closed"}</p>
                                </div>
                            )}
                            <div className={styles.edit}>
                                <button id="editHours" onClick={this.props.handleClick}>Edit</button>
                            </div>
                        </div>    
                    }
                </section>
                }
            </div>
        )
    }
}

export default Profile;