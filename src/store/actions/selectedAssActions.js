export const select_ass = ass => {
	return dispatch => {
		if (null) {
			dispatch({ type: "DESELECT_ASS", ass });
		} else {
			dispatch({ type: "SELECT_ASS", ass });
		}
	};
};
