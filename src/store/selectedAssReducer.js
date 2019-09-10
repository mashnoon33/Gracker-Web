// const initState = null;
import moment from "moment";

const initState = {
	name: "First Ass",
	color: "#8cbd18",
	id: "3b85f359-87c5-4ea6-ac90-5767a8a85122",
	dueDate: new moment(),
	course: "d4bdb020-c6cc-11e9-96f0-27fb8a060a8a",
	note: "",

	noteLastUpdated: new moment(),
};
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
