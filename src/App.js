import React from "react";
import {
	Box,
	Grommet,
	Stack,
	ResponsiveContext,
	Text,
	Button,
	Keyboard,
} from "grommet";
import { CircleQuestion } from "grommet-icons";
import { select_course } from "./store/actions/selectedCourseActions";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import { compose } from "redux";
import Detail from "./components/detail/detail";
import SideBar from "./components/sideBar/sideBar";
import Assignment from "./components/assignments/assignments";
import Dashboard from "./components/dashboard/dashboard";
import CalDashboard from "./components/Calendar/calendar";

import { withFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import LoginModal from "./components/auth/loginModal";
import { Logout, Google, StatusPlaceholder, Actions } from "grommet-icons";
import { fetchCarletonCourses } from "./store/actions/fetchCarletonCourses";
import { select_ass } from "./store/actions/selectedAssActions";

import AddCourse from "./components/course/addCourse";
import AddAssignment from "./components/assignments/AddAssignment";

const theme = {
	checkBox: {
		check: {
			radius: "20px",
		},
		// color: "#DA4167",
		border: {
			// color: "#DA4167",
		},
	},
	global: {
		breakpoints: {
			small: {
				value: 808,
			},

			medium: {
				value: 1108,
			},
			// large: {
			// 	value: 1500,
			// },
			// xlarge: {
			// 	value: 3000,
			// },
		},
		colors: {
			border: {
				dark: "rgba(255,255,255,0.07)",
				light: "rgba(0,0,0,0.07)",
			},

			// brand: '#4D4B5C'
		},
		input: {
			weight: "400",
		},

		size: {
			small: "325px",
		},

		elevation: {
			light: {
				none: "none",
				xsmall: "0px 1px 2px rgba(0, 0, 0, 0.05)",
				small: "0px 2px 4px rgba(0, 0, 0, 0.20)",
				medium: "0px 4px 8px rgba(0, 0, 0, 0.20)",
				large: "0px 8px 16px rgba(0, 0, 0, 0.20)",
				xlarge: "0px 12px 24px rgba(0, 0, 0, 0.20)",
			},
			dark: {
				none: "none",
				xsmall: "0px 2px 2px rgba(0, 0, 0, 0.05)",
				small: "0px 2px 4px rgba(0, 0, 0, 0.20)",
				medium: "0px 6px 8px rgba(0, 0, 0, 0.20)",
				large: "0px 8px 16px rgba(0, 0, 0, 0.20)",
				xlarge: "0px 12px 24px rgba(0, 0, 0, 0.20)",
			},
		},
		font: {
			family: "Rubik",
			size: "15x",
			height: "1px",
		},
	},

	calendar: {
		small: {
			fontSize: "18px",
			daySize: "47px",
		},
	},

	accordion: {
		heading: {
			level: "2",
		},
		border: {
			color: "transparent",
		},
	},
};

class App extends React.Component {
	componentWillMount() {
		this.props.fetchCarletonCourses();
	}

	render() {
		if (isEmpty(this.props.auth)) {
			return (
				<Grommet theme={theme} full>
					<Box
						fill
						align='center'
						justify='center'
						gap='small'
						background={this.props.darkMode ? "" : "white"}
					>
						<Box
							align='center'
							justify='start'
							// elevation='small'
							pad='small'
							round='small'
						>
							<Box justify='start' align='center' direction='column'>
								<Text
									color={this.props.darkMode ? "accent-1" : "brand"}
									weight='bold'
									size='5vw'
								>
									Gracker
								</Text>
							</Box>
							<Box
								animation={{
									type: "fadeIn",
									delay: 0,
									duration: 3000,
									size: "xsmall",
								}}
								flex={false}
								align='center'
								pad='large'
								justify='center'
							>
								<LoginModal />
							</Box>
						</Box>
					</Box>
				</Grommet>
			);
		}
		return (
			<Grommet theme={theme} full>
				<Keyboard
					onTab={() => {
						// console.log("comma");
						if (this.props.selected_ass === "add") this.props.select_ass(null);
						else this.props.select_ass("add");
					}}
				>
					<Box
						background={this.props.darkMode ? "#2f3852" : "FFFAFF"}
						overflow={{
							vertical: "hidden",
						}}
						fill
						animation={{
							type: "fadeIn",
							delay: 0,
							duration: 2000,
							size: "xsmall",
						}}
					>
						>
						{this.props.selected_course === "add" ? (
							<AddCourse />
						) : this.props.selected_ass === "add" ? (
							<AddAssignment></AddAssignment>
						) : (
							<ResponsiveContext.Consumer>
								{size => {
									switch (size) {
										case "large":
											return (
												<Stack anchor='bottom-right' fill>
													<Box
														fill
														background={this.props.darkMode ? "#2f3852" : ""}
													>
														<Box
															direction='row'
															flex
															overflow={{
																horizontal: "hidden",
															}}
														>
															<SideBar />
															<Assignment />
															{this.props.selected_ass == null ? (
																this.props.selected_course == null ? (
																	<Detail></Detail>
																) : (
																	<Detail></Detail>
																)
															) : (
																<Detail></Detail>
															)}
														</Box>
													</Box>

													<Box margin='medium'>
														<Box
															pad='small'
															elevation='medium'
															background={
																this.props.darkMode ? "#4D4B5C" : "brand"
															}
															round
														>
															<CircleQuestion size='medium' />
														</Box>
													</Box>
												</Stack>
											);
										case "small":
											// if (isLoaded(this.props.auth)) {
											// 	return (
											// 		<Box fill>
											// 			<Text> Loading</Text>
											// 		</Box>
											// 	);
											// }

											if (isEmpty(this.props.auth)) {
												return (
													<Box fill align='center' justify='center'>
														<LoginModal />
													</Box>
												);
											}

											return this.props.selected_ass !== null ? (
												<Box
													fill
													background={this.props.darkMode ? "#2f3852" : ""}
												>
													<Box
														direction='row'
														flex
														overflow={{
															horizontal: "hidden",
														}}
													>
														<Detail />
													</Box>
												</Box>
											) : this.props.selected_course == null ? (
												<Box fill='vertical' background='red	'>
													{" "}
													<Dashboard />
												</Box>
											) : this.props.selected_course === "Calendar" ? (
												<Box fill='vertical' background='red	'>
													{" "}
													<CalDashboard />
												</Box>
											) : this.props.selected_ass == null ? (
												<Assignment />
											) : (
												<Box
													fill
													background={this.props.darkMode ? "#2f3852" : ""}
												>
													<Box
														direction='row'
														flex
														overflow={{
															horizontal: "hidden",
														}}
													>
														<Detail />
													</Box>
												</Box>
											);

										case "medium":
											return (
												<Stack anchor='bottom-right' fill>
													<Box
														fill

														// background={this.props.darkMode ? "#2f3852" : ""}
													>
														<Box
															direction='row'
															flex
															overflow={{
																horizontal: "hidden",
															}}
														>
															<Assignment />
														</Box>
													</Box>

													<Box margin='medium'>
														<Box
															pad='small'
															elevation='medium'
															background={
																this.props.darkMode ? "#4D4B5C" : "brand"
															}
															round
														>
															<CircleQuestion size='medium' />
														</Box>
													</Box>
												</Stack>
											);

										default:
											return null;
									}
								}}
							</ResponsiveContext.Consumer>
						)}
					</Box>
				</Keyboard>
			</Grommet>
		);
	}
}

const mapStateToProps = state => {
	console.log(state.darkMode);

	if (state.firestore.data === undefined || state.firestore.data.length === 0) {
		return {
			darkMode: state.darkMode,
			auth: state.firebase.auth,
			projects: state.projects,
			selected_course: state.selectedCourse,
			selected_ass: state.selectedAss,
		};
	}

	return {
		darkMode: state.darkMode,
		auth: state.firebase.auth,
		projects: state.firestore.ordered["Assignments"],
		courses: state.firestore.ordered["Courses"],
		selected_course: state.selectedCourse,
		selected_ass: state.selectedAss,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchCarletonCourses: () => dispatch(fetchCarletonCourses()),
		select_course: course => dispatch(select_course(course)),
		select_ass: ass => dispatch(select_ass(ass)),
	};
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	firestoreConnect(props => [
		{
			collection: "Users",
			doc: !props.auth.uid ? "ddadda" : props.auth.uid,
			subcollections: [{ collection: "Courses" }],
			storeAs: "Courses",
			orderBy: [["name", "asc"]],
		},
		{
			collection: "Users",
			doc: !props.auth.uid ? "ddadda" : props.auth.uid,
			subcollections: [{ collection: "Assignments" }],
			storeAs: "Assignments",
			orderBy: [["dueDate", "asc"], ["name", "desc"]],
		},
		{
			collection: "Users",
			doc: !props.auth.uid ? "ddadda" : props.auth.uid,
			subcollections: [{ collection: "Exams" }],
			storeAs: "Exams",
			orderBy: [["dueDate", "desc"], ["name", "desc"]],
		},
	])
)(App);
