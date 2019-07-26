import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Summary = ({cars}) => {
  return (
    <div>
      {cars.map(car => (
        <div key={car.maxMileage}>
          {car.make} {car.model} {car.minYear} - {car.maxYear}
        </div>
      ))}

      <Link to="/">
        {' '}
        <button type="button">Link to add car</button>{' '}
      </Link>
      <Link to="/user">
        <button type="button">Link to go user form</button>
      </Link>
    </div>
  )
}

const mapState = state => {
  return {
    cars: state.cars
  }
}

export default connect(mapState)(Summary)
