// const initState = {
// 	name: "Programming Languages",
// 	id: "d4bdb020-c6cc-11e9-96f0-27fb8a060a8a",
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
