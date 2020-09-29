import React, { Component} from 'react';
import styles from './UpdateHours.module.css';
import kitchenInstance from '../../utils/axiosConfig';
import LocalStorageService from "../../utils/localStorageService";

class UpdateHours extends Component {
    state = this.getInitialState();
  
    getInitialState() {
      return {
        day1: {
            name: null,
            openHours: []
            },
        day2: {
            name: null,
            openHours: []
            },
        day3: {
            name: null,
            openHours: []
            },
        day4: {
            name: null,
            openHours: []
            },
        day5: {
            name: null,
            openHours: []
            },
        day6: {
            name: null,
            openHours: []
            },
        day7: {
            name: null,
            openHours: []
            },
      };
    }
  
    isFormValid = () => {
      return this.state.email && this.state.password;
    };
  
    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value,
      });
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
                                defaultValue=""
                                onChange={this.handleChange}
                            >
                                <option name={day} value="" disabled>Choose a Day</option>
                                {dayChoices.map((choice, idx) => <option name={day} value={choice} key={idx}>{choice}</option>)}
                            </select>
                            <label htmlFor={`${day}Open`}>Open:</label>
                            <input type="time" id={`${day}Open`} name={`${day}Open`}/>
                            <label htmlFor={`${day}Close`}>Close:</label>
                            <input type="time" id={`${day}Close`} name={`${day}Close`}/>

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