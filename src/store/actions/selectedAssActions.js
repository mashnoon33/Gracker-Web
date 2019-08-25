export const select_ass = ass => {
	return dispatch => {
		if (ass == null) {
			dispatch({ type: "DESELECT_ASS", ass });
		}
		if (ass === "add") {
			dispatch({ type: "SELECT_ADD", ass });
		} else {
			dispatch({ type: "SELECT_ASS", ass });
		}
	};
};
