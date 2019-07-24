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
import { CirclePicker } from "react-color";

import { connect } from "react-redux";
import { compose } from "redux";
// import Modal from "react-redux-modal-flex";
// import TypeFormComponent from "./components/adder/form";
import moment from "moment";
import { Edit, Add, Calendar as CalIcon, ScheduleNew } from "grommet-icons";
import {
	checkBox,
	addAss,
	addCourse,
} from "./../../store/actions/projectActions";
import { select_course } from "./../../store/actions/selectedCourseActions";
import { select_ass } from "./../../store/actions/selectedAssActions";
import { ColorInput } from "grommet-controls";
import Masonry from "react-masonry-component";

// const appTokenKey = "appToken"; // also duplicated in Login.js

class Dashboard extends React.Component {
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

	AssView = ({ asses, courses, late }) => (
		<ResponsiveContext.Consumer>
			{size => (
				<Box
					direction='column'
					gap='small'
					margin='small'
					round='small'
					pad={{ vertical: "small" }}
					background={this.props.darkMode ? "#20273C" : "light-3"}
					width={size === "small" ? "" : "400px"}
					flex={false}
				>
					<Box
						pad={{ horizontal: "small" }}
						direction='row'
						justify='start'
						align='center'
						gap='small'
					>
						{late ? (
							<CalIcon color='accent-4' />
						) : (
							<ScheduleNew color='accent-1' />
						)}
						<Text
							size='medium'
							weight='bold'
							color={late ? "accent-4" : "accent-1"}
						>
							{late ? "Late Assignments" : "Upcoming Assignment"}
						</Text>
					</Box>
					<Box>
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
											this.props.select_course(
												courses
													? courses.find(obj => obj.id === ass.course)
														? courses.find(obj => obj.id === ass.course)
														: null
													: null
											);
										}}
									>
										{({ hover }) => (
											<Box
												pad={{
													left: "10px",
													right: "10px",
												}}
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
																	this.props.darkMode
																		? "neutral-4"
																		: "status-error"
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
																<Text
																	size='xsmall'
																	weight='bold'
																	color='white'
																/>
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
																? courses.find(obj => obj.id === ass.course)
																		.name
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
				</Box>
			)}
		</ResponsiveContext.Consumer>
	);
	AddCourseCard = ({ courses }) => (
		<ResponsiveContext.Consumer>
			{size => (
				<Box
					direction='column'
					gap='xsmall'
					margin='small'
					round='small'
					pad='small'
					background={this.props.darkMode ? "#20273C" : "light-3"}
					width={size === "small" ? "" : "400px"}
					flex={false}
				>
					<Box direction='row' justify='start' align='center' gap='small'>
						<Add color='accent-1' />
						<Text size='medium' weight='bold' color='accent-1'>
							Course
						</Text>
					</Box>

					<TextInput
						placeholder='Course Name'
						value={this.state.course_name}
						onChange={event => {
							this.setState({
								course_name: event.target.value,
							});
						}}
					/>
					<TextInput
						placeholder='Abbriviation'
						value={this.state.course_abbr}
						onChange={event => {
							this.setState({
								course_abbr: event.target.value,
							});
						}}
					/>
					<Box round='medium' direction='row' gap='small' />
					<Box align='center'>
						<CirclePicker
							color={this.state.color}
							colors={[
								"#a4262c",
								"#ca5010",
								"#986f0b",
								"#8cbd18",
								"#0b6a0b",
								"#038387",
								// "#004e8c",
								"#881798",
								// "#9b0062",
								"#7a7574",
							]}
							width='350px'
							onChange={color => {
								console.log(color);
								this.setState({
									color: color.hex,
								});
							}}
						/>
					</Box>
					<Box align='center'>
						<Button
							primary
							label='Add'
							onClick={() => {
								this.props.addCourse(
									this.state.course_name,
									this.props.auth.uid,
									this.state.course_abbr,
									this.state.color
								);
								this.setState({
									course_name: "",
									color: "#FFFFFF",
									course_abbr: "",
								});
							}}
							disabled={
								(this.state.course_name !== "") &
								(this.state.course_abbr !== "") &
								(this.state.color !== "")
									? false
									: true
							}
						/>
					</Box>
				</Box>
			)}
		</ResponsiveContext.Consumer>
	);

	AddAssCard = ({ courses }) => (
		<ResponsiveContext.Consumer>
			{size => (
				<Box
					direction='column'
					gap='small'
					margin='small'
					round='small'
					pad='small'
					width={size === "small" ? "" : "400px"}
					background={this.props.darkMode ? "#20273C" : "light-3"}
					flex={false}
				>
					<Box direction='row' justify='start' align='center' gap='small'>
						<Add color='accent-1' />
						<Text size='medium' weight='bold' color='accent-1'>
							Assignment
						</Text>
					</Box>
					<TextInput
						placeholder='Assignment Name'
						value={this.state.ass_name}
						onChange={event => {
							this.setState({
								ass_name: event.target.value,
							});
						}}
					/>
					<div>
						{courses !== undefined &&
							courses.map(course => {
								return (
									<Button
										margin='xsmall'
										// focusIndicator={false}
										onClick={() => {
											this.setState({
												selected_course: course,
											});
										}}
									>
										<Box
											background={
												this.state.selected_course.id === course.id
													? course.color
													: this.props.darkMode
													? "#20273C"
													: "light-3"
											}
											pad='xsmall'
											round='small'
											flex={false}
										>
											<Text
												size='15px'
												color={
													this.state.selected_course.id === course.id
														? "white"
														: course.color
												}
												weight='bold'
											>
												{" "}
												{course.name}
											</Text>
										</Box>
									</Button>
								);
							})}
					</div>
					<Box align='center'>
						<Calendar
							date={this.state.dueDate}
							onSelect={date => {
								this.setState({
									dueDate: new Date(date),
								});
							}}
						/>
					</Box>
					<Box align='center'>
						<Button
							primary
							label='Add'
							onClick={() => {
								this.props.addAss(
									this.state.ass_name,
									this.state.selected_course,
									this.props.auth.uid,
									this.state.dueDate
								);
								this.setState({
									ass_name: "",
									selected_course: { id: "" },
									dueDate: new Date(),
								});
							}}
							disabled={
								(this.state.ass_name !== "") &
								(this.state.selected_course.id !== "")
									? false
									: true
							}
						/>
					</Box>
				</Box>
			)}
		</ResponsiveContext.Consumer>
	);

	Stats = (asses, courses) => (
		<ResponsiveContext.Consumer>
			{size => (
				<Box
					direction='column'
					gap='small'
					margin='small'
					round='small'
					// pad='small'
					background={this.props.darkMode ? "#20273C" : "light-3"}
					width={size === "small" ? "" : "400px"}
					flex={false}
					height='small'
				>
					<Box
						height='50%'
						pad='small'
						round={{ size: "small", corner: "top" }}
					>
						<Text size='large'>
							{" "}
							{asses !== undefined ? asses.length : ""}{" "}
						</Text>
					</Box>
				</Box>
			)}
		</ResponsiveContext.Consumer>
	);

	render() {
		const { asses, courses } = this.props;

		return (
			<Box
				background={this.props.darkMode ? "#29324D" : "light-1"}
				fill
				overflow={{
					horizontal: "hidden",
				}}
			>
				<Masonry>
					{/* {asses !== undefined ? (
						<this.Stats courses={courses} asses={asses} />
					) : null} */}
					{asses !== undefined ? (
						<div>
							<this.AssView
								courses={courses}
								asses={asses.filter(ass => {
									return (
										moment(ass.dueDate.toDate()).diff(moment(), "minutes") > 0
									);
								})}
								late={false}
							/>

							<this.AssView
								courses={courses}
								asses={asses.filter(ass => {
									return (
										moment(ass.dueDate.toDate()).diff(moment(), "minutes") <
											0 && !ass.done
									);
								})}
								late={true}
							/>
						</div>
					) : null}
					<this.AddCourseCard courses={courses} />
					<this.AddAssCard courses={courses} />
				</Masonry>
			</Box>
		);
	}
}

const mapStateToProps = state => {
	if (state.firestore.data === undefined || state.firestore.data.length === 0) {
		return {
			darkMode: state.darkMode,
			auth: state.firebase.auth,
			asses: state.projects,
			selected_course: state.selectedCourse,
			selected_ass: state.selectedAss,
		};
	}

	return {
		darkMode: state.darkMode,
		auth: state.firebase.auth,
		asses: state.firestore.ordered["Assignments"],
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
)(Dashboard);
