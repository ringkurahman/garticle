import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import './css/style.css'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'

import Reducers from './store/reducers/rootReducer'
const store = applyMiddleware(promiseMiddleware)(createStore)



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store(
      Reducers,
      window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

