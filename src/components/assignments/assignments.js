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
				<Button
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
				</Button>
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
											<Box
												direction='row'
												width='260px'
												justify='start'
												align='center'
											>
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
													truncate={true}
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
				width='360px'
				flex={false}
				background={this.props.darkMode ? "#29324D" : "light-1"}
				border={{
					color: "border",

					side: "right",
				}}
			>
				<Box pad={{ vertical: "small" }}>
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
										margin={{
											left: " small",
											top: "medium",
											bottom: "small",
										}}
									>
										<Box
											// flex={false}
											// background='red'
											fill='horizontal'
											direction='row-responsive'
											align='center'
										>
											<Box
												background={this.props.selected_course.color}
												round='xxsmall'
												width='12px'
												height='25px'
												flex={false}
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
											<Box flex={false} width='300px'>
												<Text weight='500px' size='20px' color='brand'>
													{this.props.selected_course.name}
												</Text>
											</Box>
										</Box>
									</Box>
								</Box>
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
