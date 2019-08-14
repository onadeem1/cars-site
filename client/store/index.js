import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import cars from './cars'
import adminPanel from './admin-panel'
import auth from './auth'
import loading from './loading'
import error from './error'
import notifications from './notifications'

const reducer = combineReducers({
  cars,
  adminPanel,
  auth,
  loading,
  error,
  notifications
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './cars'
export * from './admin-panel'
export * from './auth'
export * from './loading'
export * from './error'
export * from './notifications'
