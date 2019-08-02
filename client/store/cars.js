import axios from 'axios'
import history from '../history'

/* Action Types */
const ADD_CAR = 'ADD_CAR'
const SELECT_CAR = 'SELECT_CAR'
const UPDATE_CAR = 'UPDATE_CAR'
const REMOVE_CAR = 'REMOVE_CAR'

/* Action Creators */
export const addCar = car => ({type: ADD_CAR, car})
export const selectCar = carKey => ({type: SELECT_CAR, carKey})
export const updateCar = car => {
  return {type: UPDATE_CAR, car}
}
export const removeCar = carKey => ({type: REMOVE_CAR, carKey})

/* Thunk Creators */
export const finalSubmit = (user, cars) => async () => {
  let res
  try {
    res = await axios.post(`/api/cars`, {user, cars})
    if (res.status === 201) history.push('/thanks')
  } catch (error) {
    console.error(error)
  }
}

/* Initial State */
const initialState = {
  selected: {},
  cars: [
    {
      make: 'Nissan',
      model: 'Altima',
      minYear: 1999,
      maxYear: 2007,
      minBudget: 2000,
      maxBudget: 5000,
      maxMileage: 25000,
      zip: 11801,
      carKey: 'lksdjflkjdslfjds'
    },
    {
      make: 'Nissan',
      model: 'sentraa',
      minYear: 1999,
      maxYear: 2007,
      minBudget: 2000,
      maxBudget: 5000,
      maxMileage: 25000,
      zip: 10003,
      carKey: 'jdjdjdjdjdjdkjdk'
    }
  ]
}

/* Reducer */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CAR:
      return {...state, cars: [...state.cars, action.car]}

    case SELECT_CAR:
      return {
        ...state,
        selected: state.cars.filter(car => car.carKey === action.carKey)[0]
      }

    case REMOVE_CAR:
      return {
        ...state,
        cars: state.cars.filter(car => {
          if (car.carKey === action.carKey) return false
          else return true
        })
      }

    case UPDATE_CAR:
      return {
        ...state,
        cars: state.cars.map(car => {
          if (car.carKey === action.car.carKey) {
            return {...car, ...action.car}
          } else return car
        }),
        selected: {}
      }
    default:
      return state
  }
}
