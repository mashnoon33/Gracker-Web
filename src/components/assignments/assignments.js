import React from "react";
import {
	Box,
	Button,
	Text,
	Keyboard,
	CheckBox,
	ResponsiveContext,
	TextInput,
	Calendar,
} from "grommet";
import { connect } from "react-redux";
import { compose } from "redux";
// import Modal from "react-redux-modal-flex";
// import TypeFormComponent from "./components/adder/form";
import moment from "moment";
import { Edit, Trash, LinkPrevious } from "grommet-icons";
import {
	checkBox,
	addAss,
	addCourse,
} from "./../../store/actions/projectActions";
import { select_course } from "./../../store/actions/selectedCourseActions";
import { select_ass } from "./../../store/actions/selectedAssActions";
import { ColorInput } from "grommet-controls";

// const appTokenKey = "appToken"; // also duplicated in Login.js

class Assignments extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		ass_name: "",
		selected_course: { id: "" },
		dueDate: new Date(),
		course_name: "",
		color: "#FFFFFF",
		course_abbr: "",
	};

	AssCard = ({ asses, courses }) => (
		<Keyboard
			onDown={() => {
				if (this.props.selected_ass !== null) {
					this.props.select_ass(
						asses[
							asses.indexOf(this.props.selected_ass) + 1 < asses.length
								? asses.indexOf(this.props.selected_ass) + 1
								: 0
						]
					);
				}
			}}
			onUp={() => {
				if (this.props.selected_ass !== null) {
					this.props.select_ass(
						asses[
							asses.indexOf(this.props.selected_ass) > 0
								? asses.indexOf(this.props.selected_ass) - 1
								: asses.length - 1
						]
					);
				}
			}}
		>
			<Box
				// elevation="small"
				// round="small"
				// flex='false'
				// fill='horizontal'
				fill
				// background="white"
				pad={{ left: "00px", right: "00px", top: "10px", bottom: "10px" }}
			>
				{asses !== undefined &&
					asses.map(ass => {
						return (
							<Button
								focusIndicator={false}
								key={ass.name.toString()}
								// disabled={ass.done ? true : false}
								plain
								onClick={() => {
									// this.setState({
									//   selected_ass: ass
									// });
									this.props.select_ass(ass);
								}}
							>
								{({ hover }) => (
									<Box
										pad={{ left: "10px", right: "10px" }}
										height='xxsmall'
										// width="350px"
										fill='horizontal'
										background={
											this.props.selected_ass !== null
												? this.props.selected_ass.id === ass.id
													? this.props.darkMode
														? "#4D4B5C"
														: "brand"
													: hover
													? this.props.darkMode
														? "#30384f"
														: "light-5"
													: ""
												: hover
												? this.props.darkMode
													? "#30384f"
													: "light-5"
												: ""
										}
										elevation={
											this.props.selected_ass === null
												? ""
												: this.props.selected_ass.id === ass.id
												? "medium"
												: ""
										}
										align='center'
										flex='false'
										justify='start'
										direction='row'
										key={ass.id.toString()}
									>
										<Box flex={false}>
											<CheckBox
												name={ass.id.toString()}
												checked={ass.done}
												onChange={() => {
													console.log("Mashnoon");

													this.props.checkBox(ass, this.props.auth.uid);
												}}
											/>
										</Box>
										<Box
											width='38px'
											height='38px'
											align='center'
											justify='center'
											direction='column'
											flex={false}
											// background='red'
										>
											<Text
												color={this.props.darkMode ? "light-1" : ""}
												size='small'
											>
												{" "}
												{moment(ass.dueDate.toDate()).format("MMM")}
											</Text>

											<Text
												color={this.props.darkMode ? "light-1" : ""}
												size='medium'
												weight='bold'
											>
												{" "}
												{ass.dueDate.toDate().getDate()}
											</Text>
										</Box>

										<Box
											direction='column'
											margin={{
												left: "10px",
												top: "0px",
												bottom: "0px",
											}}
											flex={false}
										>
											<Box direction='row' justify='start' align='center'>
												{moment(ass.dueDate.toDate()).diff(
													moment(),
													"minutes"
												) < 0 ? (
													<Box
														// width='xxsmall'
														background={
															this.props.darkMode ? "neutral-4" : "status-error"
														}
														round='xxsmall'
														height='12px'
														width='20px'
														margin={{
															right: "5px",
															vertical: "0px",
														}}
														justify='center'
														align='center'
														pad={{
															left: "3px",
															right: "3px",
															vertical: "2px",
														}}
													>
														<Text size='xsmall' weight='bold' color='white' />
													</Box>
												) : null}

												<Text
													color={this.props.darkMode ? "light-1" : ""}
													weight='bold'
													size='12'
												>
													{ass.name}
												</Text>
											</Box>

											<Text
												color={this.props.darkMode ? "light-1" : ""}
												size='9'
											>
												{courses
													? courses.find(obj => obj.id === ass.course)
														? courses.find(obj => obj.id === ass.course).name
														: ""
													: ""}
											</Text>
										</Box>
									</Box>
								)}
							</Button>
						);
					})}
			</Box>
		</Keyboard>
	);

	render() {
		const { projects, courses } = this.props;

		return (
			<Box
				direction='column'
				fill
				overflow={{
					horizontal: "hidden",
				}}
				pad={{ vertical: "10px" }}
				background={this.props.darkMode ? "#29324D" : "light-1"}
			>
				<Box pad={{ vertical: "small" }}>
					{this.props.selected_course !== null ? (
						<Box direction='row' align='center' gap='small'>
							<ResponsiveContext.Consumer>
								{size =>
									size !== "large" ? (
										<Box flex={false} pad={{ left: "small" }}>
											<Button
												onClick={() => {
													console.log("Back Button Pressed");
													this.props.select_course(null);
												}}
											>
												{" "}
												<LinkPrevious />{" "}
											</Button>
										</Box>
									) : null
								}
							</ResponsiveContext.Consumer>

							<Box
								flex={false}
								direction='row'
								fill='horizontal'
								align='center'
							>
								<Box
									background={this.props.selected_course.color}
									round='xxsmall'
									height='20px'
									width='10px'
									// fill='vertical'
									margin={{
										right: "10px",
										vertical: "0px",
									}}
									justify='center'
									align='center'
									pad={{
										left: "3px",
										right: "3px",
										vertical: "2px",
									}}
								/>
								<Text weight='bold'>{this.props.selected_course.name}</Text>
							</Box>
							<Box
								direction='row'
								fill='horizontal'
								flex={false}
								// width='fill'
								justify='end'
								gap='small'
							>
								<Button plain>
									{({ hover }) =>
										hover ? (
											<Edit color='status-ok' size='15px' />
										) : (
											<Edit size='15px' />
										)
									}
								</Button>
								<Button plain>
									{({ hover }) =>
										hover ? (
											<Trash color='status-error' size='15px' />
										) : (
											<Trash size='15px' />
										)
									}
								</Button>
							</Box>
						</Box>
					) : (
						<Box
							direction='row'
							align='center'
							gap='small'
							pad={{ horizontal: "small" }}
						>
							{" "}
							<h3> </h3>
						</Box>
					)}
				</Box>
				<Box
					background={this.props.darkMode ? "#29324D" : "light-1"}
					// width='medium'
					// elevation='small'
					fill='vertical'
					direction='column'
					overflow='auto'
				>
					{this.props.selected_course == null ||
					courses === undefined ||
					projects === undefined ? null : (
						<this.AssCard
							courses={courses.filter(course => {
								return course.id === this.props.selected_course.id;
							})}
							asses={projects.filter(ass => {
								return ass.course === this.props.selected_course.id;
							})}
						/>
					)}
				</Box>
			</Box>
		);
	}
}

const mapStateToProps = state => {
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
		select_ass: ass => dispatch(select_ass(ass)),
		select_course: course => dispatch(select_course(course)),
		checkBox: (ass, uid) => dispatch(checkBox(ass, uid)),
		addAss: (assName, course, uid, date) =>
			dispatch(addAss(assName, course, uid, date)),
		addCourse: (courseName, uid, abbr, color) =>
			dispatch(addCourse(courseName, uid, abbr, color)),
	};
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(Assignments);
