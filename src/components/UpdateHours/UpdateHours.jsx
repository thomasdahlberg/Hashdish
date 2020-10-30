import React, { Component } from 'react';
import styles from './UpdateHours.module.css';
import kitchenInstance from '../../utils/axiosConfig';

const API = kitchenInstance;

function formatTime(time) {
    return [('0' + String(Math.floor(time / 100))).slice(-2),":",('0' + String(time % 100)).slice(-2)].join("");
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
            openHourList: this.props.openHours,
        };
    }

    handleCancel = (event) => {
        event.preventDefault();
        this.setState({ openHourList: this.props.openHours })
        // this.props.handleClick(event);
        // this.props.handleGetKitchen();
    }
  
    handleSubmit = async (event) => {
        event.preventDefault();
        let jsonArray = JSON.stringify(this.state.openHourList);
        let json = JSON.stringify({flags: "1", openHours: `{"country":"US","openHours":${jsonArray}}`});

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
        this.props.handleFormToggle("editHours");
        };

    render() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' , 'Saturday'];
        return(
            <section className={styles.container}>
                <form onSubmit={this.handleSubmit}>
                    <h3>Update Open Hours</h3>                    
                    {this.state.openHourList.map((blocks, idx) =>
                        <div className ={styles.day} key={days[idx]}>
                            <p>{days[idx]}</p>
                            {blocks.map((block, idx2) =>
                            <div key={idx2}>
                                <label>Open:</label>
                                <input
                                    type="time"
                                    value={formatTime(this.state.openHourList[idx][idx2][0])}
                                    onChange={(e) => {
                                        var arr = this.state.openHourList
                                        arr[idx][idx2][0] = deformatTime(e.target.value)
                                        this.setState({
                                            openHourList: arr,
                                        })   
                                    }}/>
                                <label>Close:</label>                                
                                <input
                                    type="time"
                                    value={formatTime(this.state.openHourList[idx][idx2][1])}
                                    onChange={(e) => {
                                        var arr = this.state.openHourList
                                        arr[idx][idx2][1] = deformatTime(e.target.value)
                                        this.setState({
                                            openHourList: arr,
                                        })   
                                    }}/>
                                <button className={styles.del} onClick={() => {
                                    let arr = this.state.openHourList
                                    arr[idx] = arr[idx].filter((item => item !== block))
                                    this.setState({
                                        openHourList: arr,
                                    })
                                }}>-</button>
                            </div>
                            )
                            }
                            {blocks.length === 0 ?
                                <button className={styles.add} onClick={() => {          
                                    let arr = this.state.openHourList
                                    arr[idx].push([0,0])
                                    this.setState({
                                        openHourList: arr,
                                    })
                                }}>+</button>
                                :
                                null
                            }
                        </div>
                    )}
                    <div className={styles.btns}>
                        <button>Update</button>
                    </div>
                </form>
                {/* <button className={styles.cancel} id="editHours" onClick={() => this.props.handleGetKitchen()}>Cancel</button> */}
            </section>
        )
    }  
}

export default UpdateHours;