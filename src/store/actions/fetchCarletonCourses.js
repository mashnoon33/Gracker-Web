var _ = require("lodash");

export const fetchCarletonCourses = () => {
	return dispatch => {
		return fetch(
			"https://api.apify.com/v2/datasets/ogrtBwPCvfGA9xSGx/items?format=json&simplified=1"
		)
			.then(response => response.json())
			.then(jsonData => {
				// jsonData is parsed json object received from url'

				dispatch({ type: "UPDATE", data: _.uniqBy(jsonData, "value") });
			})
			.catch(error => {
				// handle your errors here
				console.log("FUCKED API data");

				console.error(error);
				return null;
			});
	};
};
