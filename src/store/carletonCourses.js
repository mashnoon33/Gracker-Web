var initState = null;

const carletonCourses = (state = initState, action) => {
	switch (action.type) {
		case "UPDATE":
			initState = action.data;
			console.log("Recieved API data");
			console.log(action.data);
			return action.data;
		default:
			return state;
	}
};

export default carletonCourses;
