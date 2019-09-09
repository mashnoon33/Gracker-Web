// const initState = null;
import moment from "moment";

const initState = {
	name: "First Ass",
	color: "#8cbd18",
	id: "4f1797e0-c778-11e9-9976-739cc2b84607",
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
