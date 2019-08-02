import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import carImage from '../../images/car-background.jpeg'
import { selectCar, removeCar } from '../../store'
import '../styling/summary.scss'

const Summary = props => {
  const handleClick = carKey => {
    props.selectCar(carKey)
  }

  return (
    <div className="summary-page">
      <img className="car-background" src={carImage} />
      <div className="summary-page-container">
        <div className="summary-headline">Add up to 3 vehicles</div>
        {props.cars &&
          props.cars.map(car => (
            <div className="car-btn-container" key={car.carKey}>
              <Link to={{ pathname: '/update', state: { car } }}>
                <button
                  onClick={() => handleClick(car.carKey)}
                  className="car-btn"
                  type="button"
                >
                  {car.make.toUpperCase()} {car.model.toUpperCase()}{' '}
                  {car.minYear} - {car.maxYear}
                </button>
              </Link>
              <div className="remove-btn-container">
                <button
                  onClick={() => props.removeCar(car.carKey)}
                  className="remove-btn"
                  type="button"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        {props.cars &&
          props.cars.length < 3 && (
            <div className="summary-add-btn-container">
              <Link to="/">
                <button className="next-btn" type="button">
                  Add Another Vehicle
                </button>
              </Link>
            </div>
          )}

        <div className="summary-next-btn-container">
          <Link to="/user">
            <button className="next-btn" type="button">
              NEXT
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    cars: state.cars.cars
  }
}

const mapDispatch = { selectCar, removeCar }

export default connect(mapState, mapDispatch)(Summary)
