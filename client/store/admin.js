import axios from 'axios'

/* Action Types */
const GET_LIST = 'GET_LIST'
const UPDATE_LIST = 'UPDATE_LIST'

/* Action Creators */
export const getList = cars => ({ type: GET_LIST, cars })
export const updateList = car => ({ type: UPDATE_LIST, car })

/* Thunk Creators  */
export const loadWishList = () => async dispatch => {
  try {
    const { data } = await axios.get(`/api/cars`)
    dispatch(getList(data))
  } catch (error) {
    console.error(error)
  }
}

export const updateWishList = (id, obj) => async dispatch => {
  try {
    const { data } = await axios.put(`/api/cars/${id}`, obj)
    dispatch(updateList(data))
  } catch (error) {
    console.error(error)
  }
}

/* Initial State */
const initialState = []

/* Reducer */
export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LIST:
      return state.map(car => {
        if (action.car.id !== car.id) {
          return car
        } else {
          return { ...car, ...action.car }
        }
      })

    case GET_LIST:
      return action.cars

    default:
      return state
  }
}
