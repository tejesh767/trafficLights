const PedestrianButton = ({onClick, pedestrianRequest}) => (
  <button
    className={`pedestrian-button ${pedestrianRequest ? 'active' : ''}`}
    onClick={onClick}
    type="button"
  >
    Pedestrian Crossing
  </button>
)

export default PedestrianButton
