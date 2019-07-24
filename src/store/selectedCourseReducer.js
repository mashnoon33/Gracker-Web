// const initState = {
// 	name: "Experimental Photo",
// 	id: "def77960-ac12-11e9-9c19-e59daa39b1d6",
// 	color: "#8cbd18",
// };

const initState = null;

const selectedCourse = (state = initState, action) => {
	switch (action.type) {
		case "SELECT":
			return action.course;
		case "DESELECT":
			return null;
		case "DELETE_COURSE_SUCCESS":
			return null;
		default:
			return state;
	}
};

export default selectedCourse;
