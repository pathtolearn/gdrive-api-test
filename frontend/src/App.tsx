import * as React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import 'jquery'
import 'bootstrap'
import Home from './components/Home'

import { configureStore } from './shared/redux/ConfigureStore'
import { initialState } from './shared/reducers/Reducers'

// Configuring Redux Store
const store = configureStore(initialState)

window['React'] = React

render(
  <Provider store={store}>
    <Router>
      <Home />
    </Router>
  </Provider>,
  document.getElementById('main')
)
