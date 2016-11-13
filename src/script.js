"use strict";

const spread = Object.assign

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

class TomatoCanFull extends Component {
  render() {
    return (
      <div className='tomato-can-full'>
      </div>
    );
  }
};


class Tomato extends Component {
  render() {
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
    let remainingTime = 5.05 * 60000, // 2 minutes,
      targetTime = 0,
      paused = false;

    this.state = {
      remainingTime,
      paused,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.tick()
    }, 50)
    this.setState({
      targetTime: Date.now() + this.state.remainingTime,
    })
  }


  tick() {
    const {
      paused,
      remainingTime,
      targetTime
    } = this.state

    if (!paused) {
      setTimeout(() => {
        this.tick()
      })

      if (remainingTime > 0) {
        this.setState({
          remainingTime: targetTime - Date.now(),
        });
      } else {
        this.setState({
          remainingTime: 0,
          paused: true,
        });
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
    const seconds = this.seconds(),
      minutes = this.minutes(),
      showTime = () => this.minutes() + ':' + this.lead(seconds);

    const tomatoes = new Array(seconds).fill(0).map((tomato, index) => (
      <Tomato
        angle={index * 6}
        key={index}
        />
    ))

    const tomatoCans = new Array(minutes).fill(0).map((can, index) => (
      <TomatoCanFull key={index} />
    ))
    
    return (
      <div className='timer'>
        <h2>Timer {this.props.job} {showTime()}</h2>
        <AdjustButton sign='plus' />
        <AdjustButton sign='minus' />
        {tomatoCans}
        <div className='tomato-can-full'>
          <div className='tomato-can'>
          {tomatoes}
          </div>
        </div>
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
