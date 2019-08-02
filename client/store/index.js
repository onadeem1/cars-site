import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import cars from './cars'
import admin from './admin'
import login from './login'
import loading from './loading'

const reducer = combineReducers({ cars, admin, login, loading })

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './cars'
export * from './admin'
export * from './login'
export * from './loading'
