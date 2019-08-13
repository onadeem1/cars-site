import React from 'react'
import Routes from './routes'
import carImage from './images/car-background.jpeg'
import Header from './components/header'
import './components/styling/app.scss'

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <img className="car-background" src={carImage} />
      <Routes />
    </div>
  )
}

export default App
