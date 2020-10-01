import React, { Component } from 'react';
import styles from './UpdateHours.module.css';
import kitchenInstance from '../../utils/axiosConfig';

const API = kitchenInstance;

function formatTime(time) {
    if(time < 1000){
      let newTime = [0,String(time).slice(0,1),":",String(time).slice(1)].join("");
      return newTime;
    } else {
      let newTime = [String(time).slice(0,2),":",String(time).slice(2)].join("");
      return newTime;
    }
}

function deformatTime(time) {
    let newTime = time.slice(0,2) + time.slice(3)
    if(newTime[0] === '0'){
        newTime = newTime.slice(1);
    }
    return Number(newTime);
}

class UpdateHours extends Component {
    constructor(props){
        super(props)
        this.state = this.getInitialState();
    }
  
    getInitialState() {
      return {
          open1: this.props.openHours[0][0],
          close1:this.props.openHours[0][1],
          open2: this.props.openHours[1][0],
          close2:this.props.openHours[1][1],
          open3: this.props.openHours[2][0],
          close3:this.props.openHours[2][1],
          open4: this.props.openHours[3][0],
          close4:this.props.openHours[3][1],
          open5: this.props.openHours[4][0],
          close5:this.props.openHours[4][1],
          open6: this.props.openHours[5][0],
          close6:this.props.openHours[5][1],
          open7: this.props.openHours[6][0],
          close7:this.props.openHours[6][1],
      };
    }
  
  
    handleChange = (event) => {
        if(event.target.name.includes("open") || event.target.name.includes("close")){
            this.setState({
                [event.target.name]: deformatTime(event.target.value)
            });
        } else {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        let hourArray = [];
        for(let i = 1; i < 8; i++){
            let element = this.state[`open${i}`] ? [this.state[`open${i}`], this.state[`close${i}`]] : [];
            hourArray.push(element);
        }
        let jsonArray = JSON.stringify(hourArray);
        let json = JSON.stringify({flags: "1", openHours: `{"openHours":${jsonArray}}`});
        console.log(json);

        await API.patch(`/kitchen`, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
          .then(function (response) {
            if (response.status === 200) {
              console.log(response.data);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        this.props.handleFormToggle();
        };

    render() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' , 'Saturday'];
        return(
            <section className={styles.container}>
                <form onSubmit={this.handleSubmit}>
                    <h3>Update Open Hours</h3>
                    {days.map((day, idx) =>
                        <div className ={styles.day} key={day}>
                            <label>{day}</label>
                            <label htmlFor={`$open${idx+1}`}>Open:</label>
                            <input type="time" id={`open${idx+1}`} name={`open${idx+1}`} defaultValue={this.props.openHours[idx] ? formatTime(this.props.openHours[idx][0]) : null} onChange={this.handleChange}/>
                            <label htmlFor={`close${idx+1}`}>Close:</label>
                            <input type="time" id={`$close${idx+1}`} name={`close${idx+1}`} defaultValue={this.props.openHours[idx] ? formatTime(this.props.openHours[idx][1]) : null} onChange={this.handleChange}/>
                        </div>    
                    )}
                    <div className={styles.btns}>
                        <button type="submit">Update</button>
                        <button className={styles.cancel} id="editHours" onClick={this.props.handleClick}>Cancel</button>
                    </div>
                </form>
            </section>
        )
    }  
}

export default UpdateHours;