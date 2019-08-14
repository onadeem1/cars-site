import React from 'react'
import history from '../../history'
import checkImage from '../../images/check-mark.png'
import '../styling/thanks.scss'

const Thanks = () => (
  <div className="thanks-page">
    <div className="thanks-page-container">
      <div className="check-container">
        <img className="check-image" src={checkImage} />
      </div>
      <div className="confirmed-text-container">
        <div className="confirmed-text">Confirmed!</div>
        <div className="confirmed-details-text">
          We got your request, we'll send you an email when we find a match.
        </div>
      </div>
      <div className="thanks-button-container">
        <button
          className="red-btn"
          onClick={() => history.push('/')}
          type="button"
        >
          Thank You!
        </button>
      </div>
    </div>
  </div>
)

export default Thanks
