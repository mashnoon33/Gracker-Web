import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./config/style.css";

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/rootReducer";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import {
	createFirestoreInstance,
	getFirestore,
	reduxFirestore,
} from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import firebase from "./config/firebase";
import "firebase/database";
import WebFont from "webfontloader";

import * as serviceWorker from "./serviceWorker";
const rrfConfig = {};

WebFont.load({
	google: {
		families: ["Rubik", "sans-serif"],
	},
});

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(
			ReduxThunk.withExtraArgument({ getFirebase, getFirestore })
		),
		reduxFirestore(firebase)
		// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance,
};

ReactDOM.render(
	<Provider store={store}>
		{" "}
		<ReactReduxFirebaseProvider {...rrfProps}>
			{" "}
			<div
			// style={{
			// 	backgroundColor: "#FFFAFF",
			// }}
			>
				<App />
			</div>
		</ReactReduxFirebaseProvider>
	</Provider>,
	document.getElementById("root")
);
serviceWorker.unregister();
