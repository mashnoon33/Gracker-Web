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
import { CirclePicker } from "react-color";
import moment from "moment";
import { Edit, Trash, LinkPrevious, Add } from "grommet-icons";
import {
	checkBox,
	addAss,
	addCourse,
	delete_course,
} from "./../../store/actions/projectActions";
import { select_course } from "./../../store/actions/selectedCourseActions";
import { select_ass } from "./../../store/actions/selectedAssActions";

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
				console.log("down");
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
				// pad={{ left: "00px", right: "00px", top: "10px", bottom: "10px" }}
			>
				<Box fill='horizontal' pad={{ bottom: "medium" }}>
					{this.props.selected_course !== null ? (
						<>
							<Box
								pad={{ left: "small", top: "medium", bottom: "xsmall" }}
								direction='row'
								align='center'
								gap='small'
							>
								<>
									<Box width='30px'>
										<Box
											round='50px'
											border={{
												color: this.props.selected_course.color,
												size: "3px",
											}}
											height='15px'
											width='15px'
											margin={{
												right: "2px",
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
									</Box>
									<Text size='22px'>{this.props.selected_course.name}</Text>
								</>
							</Box>
							<Box
								pad={{ left: "small", bottom: "small" }}
								direction='row'
								align='center'
								gap='small'
							>
								<Box width='20px'>
									<Text size='16px'>🏫</Text>
								</Box>
								<Text size='16px'>{this.props.selected_course.location}</Text>
							</Box>
							<Box
								pad={{ left: "small", bottom: "small" }}
								direction='row'
								gap='small'
							>
								<Box width='20px'>
									<Text size='16px'>🕐</Text>
								</Box>
								<Box pad={{ left: "" }} direction='column' gap='small'>
									{Array.from(Array(6).keys()).map(day => {
										return this.props.selected_course.schedule[day][
											"selected"
										] ? (
											<Text size='16px'>
												{moment()
													.day(day + 1 >= 8 ? 0 : day + 1)
													.format("dddd") +
													" : " +
													this.props.selected_course.schedule[day]["start"] +
													" - " +
													this.props.selected_course.schedule[day]["end"]}
											</Text>
										) : null;
									})}
								</Box>
							</Box>
						</>
					) : (
						<Box
							pad={{ left: "small", top: "medium" }}
							direction='row'
							align='center'
							gap='small'
						>
							<></>
						</Box>
					)}
				</Box>
				{/* <Button
					focusIndicator={false}
					// disabled={ass.done ? true : false}
					plain
					onClick={() => {
						this.props.select_ass("add");
					}}
				>
					{({ hover }) => (
						<Box
							pad={{ left: "10px", right: "10px" }}
							height='xxsmall'
							// width="350px"
							fill='horizontal'
							align='center'
							flex='false'
							justify='start'
							direction='row'
						>
							<Box
								width='38px'
								height='38px'
								align='center'
								justify='center'
								direction='column'
								flex={false}
								// background='red'
							>
								<Add />
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
								<Text>Add New Assignment</Text>
							</Box>
						</Box>
					)}
				</Button> */}
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
										// background='red'
										// width='500px'
										fill='horizontal'
										border={{
											side: "bottom",
										}}
										background={
											this.props.selected_ass !== null
												? this.props.selected_ass.id === ass.id
													? this.props.darkMode
														? "#4D4B5C"
														: "brand"
													: hover
													? this.props.darkMode
														? "#322f40"
														: "light-1"
													: ""
												: hover
												? this.props.darkMode
													? "#30384f"
													: "light-1"
												: ""
										}
										// background='brand'

										pad='small'
										// margin={{ vertical: "xsmall" }}
										align='center'
										flex='false'
										justify='start'
										direction='row'
										key={ass.id.toString()}
									>
										<Box
											// flex={false}
											// margin={{
											// 	right: "xsmall",
											// }}
											width='30px'
											flex={false}
										>
											<CheckBox
												name={ass.id.toString()}
												checked={ass.done}
												onChange={() => {
													this.props.checkBox(ass, this.props.auth.uid);
												}}
											/>
										</Box>

										<Box
											direction='column'
											gap='5px'
											margin={{
												left: "10px",
												top: "0px",
												bottom: "0px",
											}}
											flex={false}
										>
											<Text size='16' truncate={true}>
												{ass.name}
											</Text>

											<Box direction='row' justify='start' align='center'>
												<Box
													// width='xxsmall'
													// background={
													// 	moment(ass.dueDate.toDate()).diff(
													// 		moment(),
													// 		"minutes"
													// 	) < 0
													// 		? this.props.darkMode
													// 			? "neutral"
													// 			: "#FDEDF0"
													// 		: "#EDF6FD"
													// }
													border
													background={this.props.darkMode ? "" : "#EDEFF3"}
													round='xxsmall'
													margin={{
														right: "5px",
														vertical: "0px",
													}}
													justify='center'
													align='center'
													pad='5px'
												>
													<Text
														size='xsmall'
														weight='bold'
														color={
															moment(ass.dueDate.toDate()).diff(
																moment(),
																"minutes"
															) < 0
																? this.props.darkMode
																	? "status-error"
																	: "status-error"
																: "#2196F3"
														}
													>
														{" "}
														{moment(ass.dueDate.toDate()).format(
															"DD MMM, YYYY"
														)}
													</Text>
												</Box>

												<Box
													// width='xxsmall'
													background={this.props.darkMode ? "" : "#EDEFF3"}
													border
													round='xxsmall'
													margin={{
														right: "5px",
														vertical: "0px",
													}}
													justify='center'
													direction='row'
													align='center'
													pad='5px'
												>
													<Box
														round='50px'
														background={
															courses
																? courses.find(obj => obj.id === ass.course)
																	? courses.find(obj => obj.id === ass.course)
																			.color
																	: ""
																: ""
														}
														height='10px'
														width='10px'
														margin={{
															right: "10px",
														}}
														justify='center'
														align='center'
														pad={{
															left: "3px",
															right: "3px",
															vertical: "2px",
														}}
													/>
													<Text weight='bold' size='xsmall'>
														{courses
															? courses.find(obj => obj.id === ass.course)
																? courses.find(obj => obj.id === ass.course)
																		.name
																: ""
															: ""}
													</Text>
												</Box>
											</Box>
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
				border={{
					color: "border",

					side: "right",
				}}
				width='400px'
			>
				<Box pad={{ vertical: "" }}>
					{this.props.selected_course !== null ? (
						<Box direction='row' align='center' gap='small'>
							<ResponsiveContext.Consumer>
								{size =>
									size !== "large" && size !== "xlarge" ? (
										<Box flex={false} pad={{ left: "small" }}>
											<Button
												onClick={() => {
													console.log("Back Button Pressed");
													this.props.select_course(null);
													this.props.select_ass(null);
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
								// flex={false}
								direction='row'
								fill='horizontal'
								align='center'
							>
								<Box
									fill='horizontal'
									tag='header'
									// pad='small'
								>
									<Box
										justify='start'
										align='center'
										direction='row'
										// margin={{
										// 	left: " small",
										// 	top: "medium",
										// 	bottom: "small",
										// }}
									></Box>
								</Box>
							</Box>
						</Box>
					) : (
						<Box
							direction='row'
							align='center'
							gap='small'
							pad={{ horizontal: "small" }}
						></Box>
					)}
				</Box>
				<Box
					// background={this.props.darkMode ? "#29324D" : "red"}
					// width='medium'
					// elevation='small'
					// pad='medium'
					fill='vertical'
					direction='column'
					overflow='auto'
				>
					{courses === undefined || projects === undefined ? null : (
						<this.AssCard
							courses={
								this.props.selected_course == null
									? courses
									: courses.filter(course => {
											return course.id === this.props.selected_course.id;
									  })
							}
							asses={
								this.props.selected_course == null
									? projects
									: projects.filter(ass => {
											return ass.course === this.props.selected_course.id;
									  })
							}
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
		delete_course: (course, uid, asses) =>
			dispatch(delete_course(course, uid, asses)),
	};
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(Assignments);
