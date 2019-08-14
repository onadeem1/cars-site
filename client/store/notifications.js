import axios from 'axios'
import { fetchFailure, resetError } from './error'

/* Action Types */
const SUCCESS = 'SUCCESS'
const LOADING = 'LOADING'
const FAIL = 'FAIL'
const RESET = 'RESET'

/* Action Creators */
export const success = () => ({ type: SUCCESS })
export const loading = () => ({ type: LOADING })
export const fail = () => ({ type: FAIL })
export const resetNotifications = () => ({ type: RESET })

export const sendNotification = values => async dispatch => {
  dispatch(loading())
  dispatch(resetError())
  try {
    const res = await axios.post(`/api/notifications`, values)
    if (res.status === 200) {
      dispatch(success())
    }
  } catch (error) {
    dispatch(fetchFailure(error))
    dispatch(fail())
  }
}

/* Initial State */
const initialState = null

/* Reducer */
export default function(state = initialState, action) {
  switch (action.type) {
    case SUCCESS:
      return SUCCESS
    case LOADING:
      return LOADING
    case FAIL:
      return FAIL
    case RESET:
      return initialState
    default:
      return state
  }
}
