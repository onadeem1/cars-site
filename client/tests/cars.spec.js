import { expect } from 'chai'
import carReducer, { addCar, ADD_CAR } from '../store/cars'

describe('actions', () => {
  it('should create an action to add a car', () => {
    const car = { make: 'nissan', model: 'altima' }
    const expectedAction = {
      type: ADD_CAR,
      car
    }
    expect(addCar(car)).to.be.eql(expectedAction)
  })
})

describe('car reducer', () => {
  const initialState = {
    selected: {},
    cars: []
  }
  const car = { make: 'nissan', model: 'altima' }
  it('should add a car', () => {
    expect(
      carReducer(initialState, {
        type: ADD_CAR,
        car
      })
    ).to.be.eql({ selected: {}, cars: [car] })
  })
})
