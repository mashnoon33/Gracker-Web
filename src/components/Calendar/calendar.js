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

class CalDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 0,
			height: 0,
			ass_name: "",
			selected_course: { id: "" },
			dueDate: new Date(),
			course_name: "",
			color: "#FFFFFF",
			course_abbr: "",
		};
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener("resize", this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	AssView = ({ asses, courses, late }) => (
		<ResponsiveContext.Consumer>
			{size => (
				<Box
					direction='column'
					gap='small'
					elevation='small'
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
							<ScheduleNew color='status-ok' />
						)}
						<Text
							size='medium'
							weight='bold'
							color={late ? "accent-4" : "status-ok"}
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
					// animation={{
					// 	type: "pulse",
					// 	duration: 20,
					// 	delay: 500,
					// 	size: "xsmall",
					// }}
					direction='column'
					gap='xsmall'
					elevation='small'
					margin='small'
					round='small'
					fill={size === "small" ? "horizontal" : ""}
					pad='small'
					background={this.props.darkMode ? "#20273C" : "light-3"}
					width={size === "small" ? "" : "400px"}
					flex={false}
				>
					<Box direction='row' justify='start' align='center' gap='small'>
						<Add color='status-ok' />
						<Text size='medium' weight='bold' color='status-ok'>
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
					elevation='small'
					fill={size === "small" ? "horizontal" : ""}
					round='small'
					pad='small'
					width={size === "small" ? "" : "400px"}
					background={this.props.darkMode ? "#20273C" : "light-3"}
					flex={false}
				>
					<Box direction='row' justify='start' align='center' gap='small'>
						<Add color='status-ok' />
						<Text size='medium' weight='bold' color='status-ok'>
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
						{courses !== undefined && courses.length === 0 ? (
							<Text>Please add a course first!</Text>
						) : null}
					</div>
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
												size='13px'
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
										pad={{ left: "15px", right: "10px" }}
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
													size='16px'
												>
													{ass.name}
												</Text>
											</Box>

											<Text
												color={this.props.darkMode ? "light-1" : ""}
												size='14px'
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

	Days = ({ offset }) => (
		<Box
			width='300px'
			// fill='vertical'
			height={Math.max(300, this.state.height / 2 - 70).toString() + "px"}
			// elevation='small'
			round='small'
			border='black'
			flex={false}
			margin='xsmall'
			background='#FAFAFA'
			overflow='scroll'
		>
			<Box margin='xxssmall' direction='row' align='center'>
				<Box
					round='20px'
					width='29px'
					height='29px'
					background='#DA4167'
					align='center'
					justify='center'
					margin='small'
					pad='xsmall'
				>
					<Text color='white' weight='500' size=' '>
						{" "}
						{offset}
					</Text>
				</Box>

				<Text size='20px' weight='500' color='#DA4167'>
					{offset !== 5
						? moment()
								.add(1 + offset, "days")
								.format("dddd")
						: "Weekend"}
				</Text>
				<Text size='small'>
					{" "}
					{moment()
						.add(1 + offset, "days")
						.format("MMMM Do YYYY")}
				</Text>
			</Box>
			{this.props.asses === undefined ? null : (
				<>
					<this.AssCard
						courses={this.props.courses}
						asses={this.props.asses.filter(ass => {
							return offset !== 5
								? moment(ass.dueDate.toDate()).isSame(
										moment()
											.startOf("week")
											.add(1 + offset, "days"),
										"day"
								  )
								: moment(ass.dueDate.toDate()).isBetween(
										moment()
											.startOf("week")
											.add(1 + offset, "days"),
										moment()
											.startOf("week")
											.add(2 + offset, "days"),
										null,
										"[]"
								  );
						})}
					/>
				</>
			)}
		</Box>
	);

	render() {
		return (
			<Box
				pad={{ horizontal: "small", top: "small" }}
				background={this.props.darkMode ? "#29324D" : "white"}
				fill
				overflow={{
					horizontal: "scroll",
				}}
			>
				<Box
					pad={{ top: "10px", bottom: "20px" }}
					fill='horizontal'
					tag='header'
					// pad='small'
				>
					<Box
						gridArea='header'
						justify='start'
						align='center'
						direction='row'
						margin={{
							vertical: "15px",
							left: "8px",
						}}
					>
						<Text
							color={this.props.darkMode ? "accent-1" : "brand"}
							weight='500'
							size='25px'
						>
							Calendar
						</Text>
					</Box>
				</Box>
				{/* <Box direction='row' fill='vertical' gap='xsmall'> */}
				<Masonry>
					{" "}
					{Array.from(Array(6).keys()).map(offset => {
						return <this.Days offset={offset} />;
					})}
				</Masonry>

				{/* </Box> */}
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
)(CalDashboard);
