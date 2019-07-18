const initState = {
	name: "Experimental Photo",
	id: "ba08f6a0-0b50-11e9-ea8a-fd2f34cdb15c",
	color: "pink",
};

// const initState = null;

const selectedCourse = (state = initState, action) => {
	switch (action.type) {
		case "SELECT":
			return action.course;
		case "DESELECT":
			return null;
		default:
			return state;
	}
};

export default selectedCourse;
