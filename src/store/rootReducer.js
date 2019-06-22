import authReducer from './authReducer'
import projectReducer from './projectReducer'
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore';
// import { reducer as modal } from 'react-redux-modal-flex';


const rootReducer = combineReducers({

  projects: projectReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
 
});

export default rootReducer
