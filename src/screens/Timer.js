import styled from 'styled-components/native';

const React = require('react');


const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const Buttonstyle = styled.View`
    font-size: 1.1rem;
    font-weight: 500; 
    outline: none;
    border: 1px solid #fff;
    background-color: #fff;
    color: #778bdd;
    border-radius: 6px;
    outline: none;
    width: 20px;
    height: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    -webkit-transition: all 0.25s ease-out;
    -moz-transition: all 0.25s ease-out;
    transition: all 0.25s ease-out;
    margin: 7px;
`;

const SvgPlay = () => (
    <svg width="55" height="55" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M37.5 6.25C20.25 6.25 6.25 20.25 6.25 37.5C6.25 54.75 20.25 68.75 37.5 68.75C54.75 68.75 68.75 54.75 68.75 37.5C68.75 20.25 54.75 6.25 37.5 6.25ZM31.25 51.5625L50 37.5L31.25 23.4375V51.5625ZM12.5 37.5C12.5 51.2812 23.7188 62.5 37.5 62.5C51.2812 62.5 62.5 51.2812 62.5 37.5C62.5 23.7188 51.2812 12.5 37.5 12.5C23.7188 12.5 12.5 23.7188 12.5 37.5Z" fill="#FFF9F9"/>
    </svg>

);
const SvgPause = () => (
    <svg width="55" height="55" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M6.25 37.5C6.25 20.25 20.25 6.25 37.5 6.25C54.75 6.25 68.75 20.25 68.75 37.5C68.75 54.75 54.75 68.75 37.5 68.75C20.25 68.75 6.25 54.75 6.25 37.5ZM34.375 50H28.125V25H34.375V50ZM37.5 62.5C23.7188 62.5 12.5 51.2812 12.5 37.5C12.5 23.7188 23.7188 12.5 37.5 12.5C51.2812 12.5 62.5 23.7188 62.5 37.5C62.5 51.2812 51.2812 62.5 37.5 62.5ZM46.875 50H40.625V25H46.875V50Z" fill="white"/>
    </svg>

);

class Timer extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            timerOn: false,
            timerStart: 0,
            timerTime: 1500000,
            timerInitial: 1500000,
            timerShortRestInitial:300000,
            timerLongRestInitial:300000,
            timerState: 'study',
            settingRounds: {
                currentRound: 0,
                roundsBeforeLongBreakInitial: 5,
                totalStudyRoundsGoal: 5
            }
        };
    }
    startTimer = () => {
        this.setState({
            timerOn: true
        });
        this.timer = setInterval(() => {
            const newTime = this.state.timerTime- 1000;
            if (newTime >= 0) {
                this.setState({
                    timerTime: newTime
                });
            } else {
                if (this.state.timerState === 'study') {
                    if (this.state.settingRounds.currentRound % this.state.settingRounds.roundsBeforeLongBreakInitial
                    === 3) {
                        this.setState(prevState =>({
                            timerState: "longBreak",
                            timerTime: this.state.timerLongRestInitial,
                            settingRounds : {
                                ...prevState.settingRounds,
                                currentRound: this.state.settingRounds.currentRound + 1
                            }
                        }));
                        alert("Break Time");
                    } else {
                        this.setState(prevState=>({
                            timerState: "shortRest",
                            timerTime: this.state.timerShortRestInitial,
                            settingRounds : {
                                ...prevState.settingRounds,
                                currentRound: this.state.settingRounds.currentRound + 1
                            }
                        }));
                        alert("Break Time");
                    }
                } else {
                    this.setState({
                        timerState: 'study',
                        timerTime: this.state.timerInitial
                    });
                    alert("Back to Work");
                }
            }
        },1000)
    };
    stopTimer = () => {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
    };
    resetTimer = () => {
        if (this.state.timerOn === false) {
            this.setState({
                timerTime: this.state.timerStart
            });
        }
    };
    adjustTimer = (input, state) => {
        const { timerState, timerTime, timerOn, timerInitial, timerShortRestInitial, timerLongRestInitial } = this.state;
        const max = 216000000;
            if (state === "study" && (!timerOn || timerState !== 'study')) {
                // if (input === "incHours" && timerTime + 3600000 < max) {
                //     this.setState({timerInitial: timerInitial + 3600000});
                // } else if (input === "decHours" && timerInitial - 3600000 >= 0) {
                //     this.setState({timerInitial: timerInitial - 3600000});
                // } else
                if (input === "incMinutes" && timerInitial + 60000 < max) {
                    this.setState(
                        {
                            timerInitial: timerInitial + 60000,
                        });
                    if (timerState ==='study') {
                        this.setState(
                            {
                                timerTime: this.state.timerInitial + 60000,
                                timerStart: this.state.timerInitial + 60000
                            });
                    }
                } else if (input === "decMinutes" && timerInitial - 60000 >= 0) {
                    this.setState({
                        timerInitial: timerInitial - 60000,
                    });
                    if (timerState ==='study') {
                        this.setState(
                            {
                                timerTime: this.state.timerInitial - 60000,
                                timerStart: this.state.timerInitial - 60000
                            });
                    }

                }
                // } else if (input === "incSeconds" && timerInitial + 1000 < max) {
                //     this.setState({timerInitial: timerInitial + 1000});
                // } else if (input === "decSeconds" && timerInitial - 1000 >= 0) {
                //     this.setState({timerInitial: timerInitial - 1000});
                // }
            } else if (state === "shortRest" && (!timerOn || timerState !== 'shortRest')) {
                if (input === "incMinutes" && timerShortRestInitial + 60000 < max) {
                    this.setState(
                        {
                            timerShortRestInitial: timerShortRestInitial + 60000,
                        });
                    if (timerState ==='shortRest') {
                        this.setState(
                            {
                                timerTime: this.state.timerShortRestInitial + 60000,
                                timerStart: this.state.timerShortRestInitial + 60000
                            });
                    }
                } else if (input === "decMinutes" && timerShortRestInitial - 60000 >= 0) {
                    this.setState({
                        timerShortRestInitial: timerShortRestInitial - 60000,
                    });
                    if (timerState ==='shortRest') {
                        this.setState(
                            {
                                timerTime: this.state.timerShortRestInitial - 60000,
                                timerStart: this.state.timerShortRestInitial - 60000
                            });
                    }
                }
            } else if (state === "longRest" && (!timerOn || timerState !== "longRest" )) {
                if (input === "incMinutes" && timerLongRestInitial + 60000 < max) {
                    this.setState(
                        {
                            timerLongRestInitial: timerLongRestInitial + 60000,
                        });

                    if (timerState ==='longRest') {
                        this.setState(
                            {
                                timerTime: this.state.timerLongRestInitial + 60000,
                                timerStart: this.state.timerLongRestInitial + 60000
                            });
                    }
                } else if (input === "decMinutes" && timerLongRestInitial - 60000 >= 0) {
                    this.setState({
                        timerLongRestInitial: timerLongRestInitial - 60000,
                    });
                    if (timerState ==='longRest') {
                        this.setState(
                            {
                                timerTime: this.state.timerLongRestInitial - 60000,
                                timerStart: this.state.timerLongRestInitial - 60000
                            });
                    }
                }
            } else if (state === "round") {
                if (input === "incRound") {
                    this.setState(prevState => ({
                        settingRounds :{
                            ...prevState.settingRounds,
                            roundsBeforeLongBreakInitial: this.state.settingRounds.roundsBeforeLongBreakInitial + 1
                        }
                    }))
                } else {
                    this.setState(prevState => ({
                        settingRounds :{
                            ...prevState.settingRounds,
                            roundsBeforeLongBreakInitial: this.state.settingRounds.roundsBeforeLongBreakInitial - 1
                        }
                    }))
                }
            } else if (state === "goal") {
                if (input === "incGoal") {
                    this.setState(prevState => ({
                        settingRounds :{
                            ...prevState.settingRounds,
                            totalStudyRoundsGoal: this.state.settingRounds.totalStudyRoundsGoal + 1
                        }
                    }))
                } else {
                    this.setState(prevState => ({
                        settingRounds :{
                            ...prevState.settingRounds,
                            totalStudyRoundsGoal: this.state.settingRounds.totalStudyRoundsGoal - 1
                        }
                    }))
                }
            }
    };

    render() {
        const { timerTime, timerStart, timerOn, timerInitial, timerShortRestInitial, timerLongRestInitial, settingRounds } = this.state;
        let seconds = ("0" + (Math.floor((timerTime/ 1000) % 60) % 60)).slice(-2);
        let minutes = ("0" + Math.floor((timerTime/ 60000) % 60)).slice(-2);

        let studyLength = ("0" + Math.floor((timerInitial/ 60000) % 60)).slice(-2);
        let shortRestLength = ("0" + Math.floor((timerShortRestInitial/ 60000) % 60)).slice(-2 );
        let longRestLength = ("0" + Math.floor((timerLongRestInitial/ 60000) % 60)).slice(-2 );

        let round = settingRounds.currentRound % settingRounds.roundsBeforeLongBreakInitial;
        let roundPerSession = settingRounds.roundsBeforeLongBreakInitial;
        let currentRound = settingRounds.currentRound;
        let goal = settingRounds.totalStudyRoundsGoal;
        return (
          <Container>
            <div style={{flex: 'auto', margintop: '1vh', textalign: 'center'}} className="Countdown-timer">
                <div style={{position: 'sticky', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="container">
                    
                    <div style={{color: '#778bdd', width: '90%', display: 'flex', margin: '1 auto',height: '200px', flexDirection: 'column', alignItems: 'center',justifyContent: 'center', marginTop: '10px', padding: '0', border: '10px solid #778bdd',borderRadius: '6px',fontSize: '5rem',fontWeight: '700'}} className="Countdown-time">
                        {minutes} : {seconds}
                    </div>
                    {timerOn === false && (timerStart === 0 || timerTime === timerStart) && (
                        <button style={{display: 'inline-block', top: '63%', borderColor: 'Transparent', backgroundColor: 'Transparent', position: 'absolute', padding: '1em 1em',   justifyContent: 'left', alignItems: 'center'}}
                            className="Button-start" onClick={this.startTimer}>
                            <SvgPlay className="SvgPlay"/>
                        </button>
                    )}
                    {timerOn === true && timerTime >= 1000 && (
                        <button style={{display: 'inline-block', top: '63%', borderColor: 'Transparent', backgroundColor: 'Transparent', position: 'absolute', padding: '1em 1em',   justifyContent: 'left', alignItems: 'center'}}
                            className="Button-stop" onClick={this.stopTimer}>
                            <SvgPause/>
                        </button>
                    )}
                    {timerOn === false &&
                    (timerStart !== 0 && timerStart !== timerTime && timerTime !== 0) && (
                        <button style={{display: 'inline-block', top: '63%', borderColor: 'Transparent', backgroundColor: 'Transparent', position: 'absolute', padding: '1em 1em',   justifyContent: 'left', alignItems: 'center'}}
                            className="Button-start" onClick={this.startTimer}>
                            <SvgPlay className="SvgPlay"/>
                        </button>
                    )}
                </div>
                
                <div>
                    
                    <div style={{display: 'flex', justifyContent: 'right',color: '#778bdd'}} className="container1">
                    <div style={{display: 'table', tableLayout: 'auto', padding: '1em 1em',  marginTop: '9px', justifyContent: 'center', alignItems: 'center'}} className="goal-setting">
                    <div style={{display: 'grid', padding: '0.5em 1em', textalign: 'center', gridtemplatecolumns: ' 0.8fr 1fr', justifyContent: 'right', alignItems: 'center'}} className="adjustGoal">
                        <p>Round</p>
                        <div className="goal-container">
                        
                        <div style={{display: 'inline-flex', margin:  '0.4em 1em'}} className="adjustGoalContainer">
                            <Buttonstyle button onClick={() => this.adjustTimer("decRound", "round")}>-</Buttonstyle>
                            <div style={{fontsize: '20px', fontweight: '700'}} className="setTime">{round}/</div>
                            <div style={{fontsize: '20px', fontweight: '700'}} className="setTime">{roundPerSession} </div>
                            <Buttonstyle button onClick={() => this.adjustTimer("incRound",  "round")}>+</Buttonstyle>
                        </div>
                        </div>
                    </div>
                    <div style={{display: 'grid', padding: '0.5em 1em', textalign: 'center', gridtemplatecolumns: ' 0.8fr 1fr', justifyContent: 'right', alignItems: 'center'}}  className="adjustGoal">
                        <p> Goals</p>
                        <div style={{ display: 'grid', gridtemplatecolumns: 'auto auto auto', alignItems: 'center', justifyContent: 'center'}} className="goal-container">
                        
                        <div style={{display: 'inline-flex', margin:  '0.4em 1em'}} className="adjustGoalContainer">
                            <Buttonstyle button onClick={() => this.adjustTimer("deccGoal", "goal")}>-</Buttonstyle>
                            <div style={{fontsize: '20px', fontweight: '700'}} className="setTime">{currentRound}/</div>
                            <div style={{fontsize: '20px', fontweight: '700'}} className="setTime">{goal} </div>
                            <Buttonstyle button onClick={() => this.adjustTimer("inGoal", "goal")}>+</Buttonstyle>
                        </div>
                        </div>
                    </div>
                </div>

                    <div style={{display: 'table', tableLayout: 'auto', padding: '1em 1em',marginTop: '9px', alignItems: 'center', justifyContent: 'center'}} className="container-adjustment">
                        <div style={{display: 'grid', padding: '0.5em 1em', textalign: 'center', gridtemplatecolumns: ' 0.8fr 1fr', justifyContent: 'right', alignItems: 'center'}} className="adjustTimeOutsideContainer">
                            <div style={{display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: '0.4em 1em'}} className="adjustTime">
                                <p> Focus  Time</p>
                                <div style={{display: 'inline-flex', margin:  '0.4em 1em'}} className="adjustTimeContainer">
                                    <Buttonstyle button onClick={() => this.adjustTimer("decMinutes", "study")}>-</Buttonstyle>
                                    <div style={{fontsize: '20px', fontweight: '700'}} className="setTime">{studyLength} </div>
                                    <Buttonstyle button onClick={() => this.adjustTimer("incMinutes", "study")}>+</Buttonstyle>
                                </div>
                                <p> mins </p>
                            </div>
                            <div style={{display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: '0.4em 1em'}} className="adjustTime">
                                <p>Short Break</p>
                                <div style={{display: 'inline-flex', margin:  '0.4em 1em'}} className="adjustTimeContainer">
                                    <Buttonstyle button onClick={() => this.adjustTimer("decMinutes", "shortRest")}>-</Buttonstyle>
                                    <div style={{fontsize: '20px', fontweight: '700'}} className="setTime">{shortRestLength} </div>
                                    <Buttonstyle button onClick={() => this.adjustTimer("incMinutes", "shortRest")}>+</Buttonstyle>
                                </div>
                                <p> mins </p>
                            </div>
                            <div style={{display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: '0.4em 1em'}} className="adjustTime">
                                <p>Long Break</p>
                                <div style={{display: 'inline-flex', margin:  '0.4em 1em'}} className="adjustTimeContainer">
                                    <Buttonstyle button onClick={() => this.adjustTimer("decMinutes", "longRest")}>-</Buttonstyle>
                                    <div style={{fontsize: '20px', fontweight: '700'}} className="setTime">{longRestLength} </div>
                                    <Buttonstyle button onClick={() => this.adjustTimer("incMinutes", "longRest")}>+</Buttonstyle>
                                </div>
                                <p> mins </p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
          </Container>
        );
    }
}
export default Timer;