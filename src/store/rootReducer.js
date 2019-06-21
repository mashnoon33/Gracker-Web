import authReducer from './authReducer'
import projectReducer from './projectReducer'
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore';
import { reducer as modal } from 'react-redux-modal-flex';


const rootReducer = combineReducers({

  project: projectReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  modal: modal({
    classContent: 'modal-content',
    animation: 'fade',
    duration: 200,
    mask: true,
    title: '',
    closeBtn: false,
    textCancel: '',
    ok: {
      text: 'OK',
      classOk: 'modal-btn-ok',
      disabled: false,
      action: () => console.log('OK clicked'),
    },
  }),
});

export default rootReducer
