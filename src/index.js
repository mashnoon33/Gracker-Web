import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/rootReducer'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { createFirestoreInstance, getFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
import firebase from './config/firebase'
import 'firebase/database'

import * as serviceWorker from './serviceWorker'
const rrfConfig = {}

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(ReduxThunk.withExtraArgument({ getFirebase, getFirestore }))
  )
)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
}

ReactDOM.render(
  <Provider store={store}>
    {' '}
    <ReactReduxFirebaseProvider {...rrfProps}>
      {' '}
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
)
serviceWorker.register()
