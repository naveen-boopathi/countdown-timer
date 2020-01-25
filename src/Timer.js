import React, { Fragment } from 'react';

export default class Timer extends React.Component {
    state = {
        target: this.setTargetDate(),
        currentTime: new Date(),
        countdown: ''
    }
    componentDidMount() {
        this.targetDate = this.setTargetDate();
        this.startTimer();  
    }
    componentWillUnmount() {
        this.stopTimer();
    }
    setTargetDate() {
        let newDate = new Date();
        let targetDateInMilliSeconds = newDate.setHours(17, 0, 0, 0)
        let targetDate = new Date(targetDateInMilliSeconds);
        return targetDate;
    }
    msToTime(s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;
        return hrs + ':' + mins + ':' + secs;
      }
    calculateCountdownTimer(targetTime) {
        let currentTime = new Date();
        let countdownTimer = (this.state.target - currentTime);
        let convertedTime = this.msToTime(countdownTimer);
        this.setState({countdown: convertedTime, currentTime: currentTime})
    }
    startTimer() {
        let newDate = new Date();
        let targetTimeInMilliseconds = newDate.setHours(17, 0, 0, 0);
        this.targetTime = new Date(targetTimeInMilliseconds);
        this.myTimer = setInterval(() => {
            this.calculateCountdownTimer(this.targetTime);  
        }, 1000)
    }
    stopTimer() {
        clearInterval(this.myTimer);
    }
    render() {
        return <div>
            <p><b>Target Time: </b>{this.state.target.toLocaleTimeString()}</p>
            <p><b>Current Timer: </b>{this.state.currentTime.toLocaleTimeString()}</p>
            <p><b>Countdown Timer: </b>{this.state.countdown}</p>
        </div>
    }
}