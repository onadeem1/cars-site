import axios from 'axios'
import history from '../history'
import {setLoadingFalse, setLoadingTrue} from './loading'

/* Action Types */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/* Action Creators */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/* Initial State */
const defaultUser = {}

/* Thunk Creators */
export const me = () => async dispatch => {
  try {
    dispatch(setLoadingTrue())
    const res = await axios.get('/api/admin/me')
    dispatch(getUser(res.data || defaultUser))
    dispatch(setLoadingFalse())
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/api/admin/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/admin')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/api/admin/logout')
    dispatch(removeUser())
    history.push('/admin')
  } catch (err) {
    console.error(err)
  }
}

/* Reducer */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user

    case REMOVE_USER:
      return defaultUser

    default:
      return state
  }
}
