import React, { Component} from 'react';
import styles from './UpdateHours.module.css';
import kitchenInstance from '../../utils/axiosConfig';
import LocalStorageService from "../../utils/localStorageService";

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
        day1: this.props.openHours[0].name,
        open1: this.props.openHours[0].openHours[0] ? this.props.openHours[0].openHours[0][0] : null,
        close1: this.props.openHours[0].openHours[0] ? this.props.openHours[0].openHours[0][1] : null,
        day2: this.props.openHours[1].name,
        open2: this.props.openHours[1].openHours[0] ? this.props.openHours[1].openHours[0][0] : null,
        close2: this.props.openHours[1].openHours[0] ? this.props.openHours[1].openHours[0][1] : null,
        day3: this.props.openHours[2].name,
        open3: this.props.openHours[2].openHours[0] ? this.props.openHours[2].openHours[0][0] : null,
        close3: this.props.openHours[2].openHours[0] ? this.props.openHours[2].openHours[0][1] : null,
        day4: this.props.openHours[3].name,
        open4: this.props.openHours[3].openHours[0] ? this.props.openHours[3].openHours[0][0] : null,
        close4: this.props.openHours[3].openHours[0] ? this.props.openHours[3].openHours[0][1] : null,
        day5: this.props.openHours[4].name,
        open5: this.props.openHours[4].openHours[0] ? this.props.openHours[4].openHours[0][0] : null,
        close5: this.props.openHours[4].openHours[0] ? this.props.openHours[4].openHours[0][1] : null,
        day6: this.props.openHours[5].name,
        open6: this.props.openHours[5].openHours[0] ? this.props.openHours[5].openHours[0][0] : null,
        close6: this.props.openHours[5].openHours[0] ? this.props.openHours[5].openHours[0][1] : null,
        day7: this.props.openHours[6].name,
        open7: this.props.openHours[6].openHours[0] ? this.props.openHours[6].openHours[0][0] : null,
        close7: this.props.openHours[6].openHours[0] ? this.props.openHours[6].openHours[0][1] : null,
      };
    }
  
    isFormValid = () => {
        return this.state.day1 &&
            this.state.day2 &&
            this.state.day3 &&
            this.state.day4 &&
            this.state.day5 &&
            this.state.day6 &&
            this.state.day7;
    };
  
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

    render() {
        const days = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6' , 'day7'];
        const dayChoices = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'];
        return(
            <section>
                <form action="" onSubmit={this.handleSubmit}>
                    {days.map((day, idx) =>
                        <div key={day}>
                            <label htmlFor={day}>Day {idx + 1}:</label>
                            <select 
                                id={day} 
                                name={day}  
                                defaultValue={this.props.openHours[idx].name}
                                onChange={this.handleChange}
                            >
                                <option name={day} value="" disabled>Choose a Day</option>
                                {dayChoices.map((choice, idx) => <option name={day} value={choice} key={idx}>{choice}</option>)}
                            </select>
                            <label htmlFor={`$open${idx+1}`}>Open:</label>
                            <input type="time" id={`open${idx+1}`} name={`open${idx+1}`} defaultValue={this.props.openHours[idx].openHours[0] ? formatTime(this.props.openHours[idx].openHours[0][0]) : null} onChange={this.handleChange}/>
                            <label htmlFor={`close${idx+1}`}>Close:</label>
                            <input type="time" id={`$close${idx+1}`} name={`close${idx+1}`} defaultValue={this.props.openHours[idx].openHours[0] ? formatTime(this.props.openHours[idx].openHours[0][1]) : null} onChange={this.handleChange}/>
                        </div>    
                    )}
                    <button disabled={!this.isFormValid()} type="submit">
                        Update Hours
                    </button>
                </form>
                <button id="editHours" onClick={this.props.handleClick}>Cancel</button>
            </section>
        )
    }  
}

export default UpdateHours;