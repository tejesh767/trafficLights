import {Component} from 'react'
import PedestrianButton from '../PedestrianButton'
import './index.css'

const GreenLight = ({isActive}) => (
  <div className={`light green ${isActive ? 'active' : ''}`} />
)

const YellowLight = ({isActive}) => (
  <div className={`light yellow ${isActive ? 'active' : ''}`} />
)

const RedLight = ({isActive}) => (
  <div className={`light red ${isActive ? 'active' : ''}`} />
)

class TrafficLight extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentLight: 'green',
      pedestrianRequest: false,
      timer: 10,
      pedestrianWait: false,
    }
    this.handleLightChange = this.handleLightChange.bind(this)
    this.handlePedestrianRequest = this.handlePedestrianRequest.bind(this)
  }

  componentDidMount() {
    this.lightInterval = setInterval(this.handleLightChange, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.lightInterval)
  }

  handleLightChange() {
    const {currentLight, timer, pedestrianRequest, pedestrianWait} = this.state

    if (timer > 0) {
      this.setState(prevState => ({timer: prevState.timer - 1}))
    } else {
      switch (currentLight) {
        case 'green':
          if (pedestrianRequest) {
            this.setState({
              currentLight: 'yellow',
              timer: 3,
              pedestrianWait: true,
            })
          } else {
            this.setState({currentLight: 'yellow', timer: 3})
          }
          break
        case 'yellow':
          if (pedestrianRequest && pedestrianWait) {
            this.setState({
              currentLight: 'red',
              timer: 7,
              pedestrianWait: false,
            })
          } else {
            this.setState({currentLight: 'red', timer: 7})
          }
          break
        case 'red':
          if (pedestrianRequest) {
            this.setState({timer: 5, pedestrianRequest: false})
          } else {
            this.setState({currentLight: 'green', timer: 10})
          }
          break
        default:
          break
      }
    }
  }

  handlePedestrianRequest() {
    const {currentLight} = this.state
    if (currentLight === 'green' || currentLight === 'yellow') {
      this.setState({pedestrianRequest: true})
    } else if (currentLight === 'red') {
      this.setState({timer: 5})
    }
  }

  render() {
    const {currentLight, timer, pedestrianRequest} = this.state
    return (
      <div className="traffic-light-container">
        <div className="traffic-light">
          <GreenLight isActive={currentLight === 'green'} />
          <YellowLight isActive={currentLight === 'yellow'} />
          <RedLight isActive={currentLight === 'red'} />
        </div>

        <div className="timer">Time Remaining: {timer}s</div>

        <PedestrianButton
          onClick={this.handlePedestrianRequest}
          pedestrianRequest={pedestrianRequest}
        />
      </div>
    )
  }
}

export default TrafficLight
