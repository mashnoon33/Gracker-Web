// const initState = {
// 	name: "Programming Languages",
// 	id: "1437a500-c17b-11e9-a65c-5be77eef1b31",
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
