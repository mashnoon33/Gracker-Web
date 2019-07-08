const initState = null;
const selectedAss = (state = initState, action) => {
	switch (action.type) {
		case "SELECT_ASS":
			return action.ass;
		case "DESELECT_ASS":
			return null;
		default:
			return state;
	}
};

export default selectedAss;
