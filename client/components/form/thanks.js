import React from 'react'
import carImage from '../../images/car-background.jpeg'
import checkImage from '../../images/check-mark.png'
import '../styling/thanks.scss'

const App = () => (
  <div className="thanks-page">
    <img className="car-background" src={carImage} />
    <div className="thanks-page-container">
      <div className="check-container">
        <img className="check-image" src={checkImage} />
      </div>
      <div className="confirmed-text-container">
        <div className="confirmed-text">Confirmed!</div>
        <div className="confirmed-details-text">
          We got your request, we'll send you an email<br />when we find a
          match.
        </div>
      </div>
      <div className="thanks-button-container">
        <button className="next-btn" type="submit">
          Thank You!
        </button>
      </div>
    </div>
  </div>
)

export default App
