import React, { Fragment } from 'react';

export default class Timer extends React.Component {
    state = {
        target: this.setTargetDate(),
        currentTime: new Date(),
        countdown: ''
    }
    componentDidMount() {
        this.startTimer();  
    }
    componentWillUnmount() {
        this.stopTimer();
    }
    setTargetDate() {
        this.targetDate = new Date(2020, 3, 27, 6, 0, 0);
        return this.targetDate.valueOf();
    }
    dhms(t) {
        let cd = 24*60*60*1000,
        ch = 60*60*1000,
        cs = 60*1000,
        // cms = 1000,
        d = Math.floor(t/cd),
        h = Math.floor((t - d * cd) / ch),
        m = Math.round((t - d * cd - h * ch) / cs),
        // s = Math.floor((t - d * cd - h * ch - m * cs) / cms),
        pad = function (n) { return n < 10 ? '0' + n : n; };
        // if (s === 60) {
        //     m++;
        //     s = 0;
        // }
        if (m === 60) {
            h++;
            m = 0;
        }
        if (h === 24) {
            d++;
            h = 0;
        }
        return d + " days " + pad(h) + " hours " + pad(m) + " minutes"
        // return d + " days " + pad(h) + " hours " + pad(m) + " minutes " + pad(s) + " seconds"
    }
    calculateCountdownTimer(targetTime) {
        let currentTime = new Date();
        let countdownTimer = (this.state.target - currentTime.valueOf());
        let convertedTime = this.dhms(countdownTimer);
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
            <p><b>Wedding Day: </b>{this.targetDate.toLocaleString()}</p>
            <p><b>Time Remaining: </b>{this.state.countdown}</p>
        </div>
    }
}