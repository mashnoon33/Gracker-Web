// const initState = {
// 	name: "Painting",
// 	id: "879d5c8a-093b-4de0-8bd9-438c61fcc233",
// 	color: "red",
// 	location: "Boliou 163",
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
