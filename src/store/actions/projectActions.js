import firebase from "firebase";
import moment from "moment";

const uuidv1 = require("uuid/v1");

export const addAss = (assName, course, uid, date, uuid) => {
	var ass = {
		name: assName,
		id: uuid === null ? uuidv1() : uuid,
		hide: false,
		dueDate: date,
		done: false,
		course: course.id,
	};

	return (dispatch, getState, { getFirestore, getFirebase }) => {
		console.log("UID   :  " + uid);
		const firestore = getFirestore();
		firestore
			.collection("Users")
			.doc(uid)
			.collection("Assignments")
			.doc(ass.id)
			.set(ass)
			.then(() => {
				if (uuid === null) {
					ass.dueDate = moment(ass.dueDate);
					console.log("Mash is sexy a f");
					dispatch({ type: "SELECT_ASS", ass });
				} else {
					console.log("MAtt is sexy a f");

					dispatch({ type: "CREATE_PROJECT_SUCCESS" });
				}
			})
			.catch(err => {
				dispatch({ type: "CREATE_PROJECT_ERROR" }, err);
			});
	};
};

export const addCourse = (courseName, uid, abbr, color) => {
	var course = {
		abbr: abbr,
		color: color,
		id: uuidv1(),
		name: courseName,
	};

	return (dispatch, getState, { getFirestore, getFirebase }) => {
		console.log("UID   :  " + uid);
		const firestore = getFirestore();
		firestore
			.collection("Users")
			.doc(uid)
			.collection("Courses")
			.doc(course.id)
			.set(course)
			.then(() => {
				dispatch({ type: "SELECT", course });
			})
			.catch(err => {
				dispatch({ type: "CREATE_COURSE_ERROR" }, err);
			});
	};
};

export const delete_ass = (ass, uid) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		firestore
			.collection("Users")
			.doc(uid)
			.collection("Assignments")
			.doc(ass.id)
			.delete()
			.then(() => {
				dispatch({ type: "DELETE_ASS_SUCCESS" });
			})
			.catch(err => {
				dispatch({ type: "CREATE_ASS_ERROR" }, err);
			});
	};
};

export const delete_course = (course, uid, asses) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();

		for (var index in asses) {
			if (asses[index].course === course.id) {
				firestore
					.collection("Users")
					.doc(uid)
					.collection("Assignments")
					.doc(asses[index].id)
					.delete();
			}
		}
		firestore
			.collection("Users")
			.doc(uid)
			.collection("Courses")
			.doc(course.id)
			.delete()
			.then(() => {
				dispatch({ type: "DELETE_COURSE_SUCCESS" });
			})
			.catch(err => {
				dispatch({ type: "CREATE_COURSE_ERROR" }, err);
			});
	};
};

export const checkBox = (ass, uid) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		firestore
			.collection("Users")
			.doc(uid)
			.collection("Assignments")
			.doc(ass.id)
			.update({
				done: !ass.done,
			});
	};
};

export const changeDate = (ass, uid, date) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		firestore
			.collection("Users")
			.doc(uid)
			.collection("Assignments")
			.doc(ass.id)
			.update({
				dueDate: date,
			});
	};
};
