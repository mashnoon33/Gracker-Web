export const createProject = (project, uid) => {
	return (dispatch, getState, { getFirestore, getFirebase }) => {
		console.log("UID   :  " + uid);
		const firestore = getFirestore();
		firestore
			.collection("Users")
			.doc(uid)
			.collection("Assignments")
			.add({
				...project,
			})
			.then(() => {
				dispatch({ type: "CREATE_PROJECT_SUCCESS" });
			})
			.catch(err => {
				dispatch({ type: "CREATE_PROJECT_ERROR" }, err);
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
