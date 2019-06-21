import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore, applyMiddleware, compose} from "redux";
import rootReducer from "./store/rootReducer";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/firebase'

import * as serviceWorker from './serviceWorker';

const store = createStore(rootReducer,
    compose(
        applyMiddleware(ReduxThunk.withExtraArgument({ getFirebase, getFirestore })),
        reactReduxFirebase(fbConfig, {attachAuthIsReady:true}), // redux binding for firebase
        reduxFirestore(fbConfig) // redux bindings for firestore
    )
);
console.log(store.firebaseAuthIsReady);

store.firebaseAuthIsReady.then(() => {
    console.log(store.firebaseAuthIsReady);

    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
    serviceWorker.register();

})

