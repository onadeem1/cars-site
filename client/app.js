import React from 'react'
import Routes from './routes'
import carImage from './images/car-background.jpeg'
import './components/styling/app.scss'

const App = () => {
  return (
    <div className="app-container">
      <img className="car-background" src={carImage} />
      <Routes />
    </div>
  )
}

export default App
