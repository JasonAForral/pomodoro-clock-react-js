"use strict";

(() => {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  const {
    Component,
    PropTypes
  } = React;

  class MyComponent extends Component {
    render() {
      return (
        <div className='compenent'>
          Hello, world! I am a CommentList.
      </div>
      );
    }
  };

  class Tomato extends Component {
    constructor(props) {
      super(props)
      this.state = {
        left: window.innerWidth / 2,
        top: window.innerHeight / 2
      }
    }

    angle(){
      return this.props.angle * Math.PI / 30;
    }

    render() {
      let divStyle = {
          left: this.state.left + (200 * Math.sin(this.angle())),
          top: this.state.top - (200 * Math.cos(this.angle())), 
        }
      return (
        <div className='tomato'>
          
        </div>
      );
    }
  };

  class AdjustButton extends Component {
    render() {
      return (
        <div className='adjustButton'>
          Adjust {this.props.sign}
        </div>
      );
    }
  };

  class Timer extends Component {
    constructor(props) {
      super(props)
      let remainingTime = 0.05 * 60000, // 2 minutes,
        targetTime = 0,
        paused = false;

      //setTimeout(() => { this.tick() }, 500)
      //setTimeout(() => { this.tick() }, 20)
      setTimeout(() => {
        this.startTimer()
      }, 20)
      this.state = {
        remainingTime,
        paused,
      }
    }

    startTimer() {
      setTimeout(() => {
        this.tick()
      }, 20)
      this.setState(_extends(this.state, {
        targetTime: Date.now() + this.state.remainingTime,
      }))
    }

    tick() {
      setTimeout(() => {
        this.tick()
      })
      if (!this.state.paused) {
        if (this.state.remainingTime > 0) {
          this.setState(_extends(this.state, {
            remainingTime: this.state.targetTime - Date.now(),
          }));
        } else {
          this.setState(_extends(this.state, {
            remainingTime: 0,
            paused: true,
          }));
        }
      }
    }

    seconds() {
      return Math.max(0, Math.floor((this.state.remainingTime / 1000) % 60))
    }
    minutes() {
      return Math.max(0, Math.floor((this.state.remainingTime / 60000) % 60))
    }

    lead(num) {
      return num >= 10 ? num : '0' + num;
    }

    showTime() {
      return this.minutes() + ':' + this.lead(this.seconds())
    }

    render() {
      let seconds = this.seconds(),
        showTime = () => this.minutes() + ':' + this.lead(seconds);

      let tomatoes = new Array(seconds).fill(0).map((tomato, index) => (
        <Tomato
          angle={index}
          key={index}
        />
      ));
      return (
        <div className='timer'>
          <h2>Timer {this.props.job} { showTime() }</h2>
          <AdjustButton sign='plus' />
          <AdjustButton sign='minus' />
          {tomatoes}
        </div>
      );
    }
  };

  class App extends Component {
    constructor(props) {
      super(props)
      let inSession = true;
      this.state = {
        inSession
      }
    }
    switchTimer() {

    }
    render() {
      return (
        <div className='pomodoro'>
          <h1>Pomodoro</h1>
          <Timer
            job='session'
            />
        </div>
      );
    }
  };

  ReactDOM.render(
    <App />,
    document.getElementById('content')
  );

})()