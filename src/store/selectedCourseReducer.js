// const initState = {
// 	name: "allalla",
// 	id: "c70063f0-bbbf-11e9-a393-0d53508d062c",
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
