import axios from 'axios'
import history from '../history'

/* ACTION TYPES */
const ADD_CAR = 'ADD_CAR'

/* ACTION CREATORS */
export const addCar = car => ({type: ADD_CAR, car})

/* REDUCER */
export default function(state = [], action) {
  switch (action.type) {
    case ADD_CAR:
      return [...state, action.car]
    default:
      return state
  }
}

/* THUNK CREATORS EXTRA FOR NOW */

export const finalSubmit = (user, cars) => async dispatch => {
  let res
  try {
    res = await axios.post(`/api/cars`, {user, cars})
    if (res.status === 201) history.push('/thanks')
    console.log(res)
  } catch (error) {
    console.error(error)
  }
}

// export const auth = (email, password, method) => async dispatch => {
//   let res
//   try {
//     res = await axios.post(`/auth/${method}`, {email, password})
//   } catch (authError) {
//     return dispatch(getUser({error: authError}))
//   }

//   try {
//     dispatch(getUser(res.data))
//     history.push('/home')
//   } catch (dispatchOrHistoryErr) {
//     console.error(dispatchOrHistoryErr)
//   }
// }
