const initState = null;

// const initState = {
// 	name: "First Ass",
// 	color: "#8cbd18",
// 	id: "10a34bf0-c181-11e9-a65c-5be77eef1b31",
// 	dueDate: new moment(),
// 	course: "1437a500-c17b-11e9-a65c-5be77eef1b31",
// };
const selectedAss = (state = initState, action) => {
	switch (action.type) {
		case "SELECT_ASS":
			console.log("This triggered");
			console.log(action.ass);

			return action.ass;
		case "SELECT_ADD":
			return "add";
		case "DESELECT_ASS":
			return null;
		case "DELETE_ASS_SUCCESS":
			return null;
		default:
			return state;
	}
};

export default selectedAss;
