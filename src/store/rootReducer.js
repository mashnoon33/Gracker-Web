import darkModeReducer from "./darkModeReducer";
import projectReducer from "./projectReducer";
import selectedCourse from "./selectedCourseReducer";
import selectedAss from "./selectedAssReducer";
import carletonCourses from "./carletonCourses";

import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

// import { reducer as modal } from 'react-redux-modal-flex';

const rootReducer = combineReducers({
	darkMode: darkModeReducer,
	projects: projectReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer,
	carletonCourses: carletonCourses,

	selectedCourse: selectedCourse,
	selectedAss: selectedAss,
});

export default rootReducer;
