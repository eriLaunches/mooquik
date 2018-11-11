import {createStore, applyMiddleware} from 'redux'
import axios from 'axios'
import {reducer} from './reducer'
import loggingMiddleware from 'redux-logger' // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk' // https://github.com/gaearon/redux-thunk


const configureStore = () => {
  return createStore(reducer,  applyMiddleware (
  thunkMiddleware,
  loggingMiddleware
  )
  )
}

export default configureStore
