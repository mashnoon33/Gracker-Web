const initState =
	localStorage.getItem("dark") == null
		? false
		: JSON.parse(localStorage.getItem("dark"));

if (localStorage.getItem("dark") == null) {
	localStorage.setItem("dark", JSON.stringify(false));
}

const darkModeReducer = (state = initState, action) => {
	console.log("this works as well");
	console.log(action.type);

	switch (action.type) {
		case "TURN_ON":
			localStorage.setItem("dark", JSON.stringify(true));
			return true;
		case "TURN_OFF":
			localStorage.setItem("dark", JSON.stringify(false));
			return false;
		default:
			return state;
	}
};

export default darkModeReducer;
