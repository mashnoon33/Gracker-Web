import React, { createRef, Component } from "react";
import {
	Box,
	Button,
	Text,
	Calendar,
	MaskedInput,
	AccordionPanel,
	CheckBox,
	TextInput,
	Stack,
	ResponsiveContext,
} from "grommet";
import { CirclePicker } from "react-color";
import { addCourse } from "./../../store/actions/projectActions";

import {
	CatalogOption,
	Alarm,
	Notes,
	LinkPrevious,
	Add,
	Edit,
} from "grommet-icons";
import { connect } from "react-redux";
import { compose } from "redux";
import {
	checkBox,
	delete_ass,
	addAss,
} from "./../../store/actions/projectActions";
import { select_course } from "./../../store/actions/selectedCourseActions";
import { select_ass } from "./../../store/actions/selectedAssActions";
import moment from "moment";
import "react-quill/dist/quill.core.css"; // ES6
import ReactQuill from "react-quill"; // ES6

class AddCourse extends React.Component {
	targetRef = createRef();

	state = {
		course_name: "",
		color: "#FFFFFF",
		course_abbr: "",
		suggestions: [],
		location: "",
		schedule: [
			{ start: null, end: null, selected: false },
			{ start: null, end: null, selected: false },
			{ start: null, end: null, selected: false },
			{ start: null, end: null, selected: false },
			{ start: null, end: null, selected: false },
			{ start: null, end: null, selected: false },
			{ start: null, end: null, selected: false },
		],
	};
	render() {
		return (
			<Box
				// background={this.props.darkMode ? "#2f3852" : "FFFAFF"}
				overflow={{
					vertical: "hidden",
				}}
				fill
				animation={{
					type: "fadeIn",
					delay: 0,
					duration: 1000,
					size: "xsmall",
				}}
			>
				<Stack anchor='top-right' fill>
					<Box
						fill
						// background={this.props.darkMode ? "#2f3852" : "FFFAFF"}
						align='center'
						justify='start'
					>
						<Box
							align='center'
							justify='start'
							flex
							overflow={{
								horizontal: "hidden",
							}}
						>
							<Box
								fill='vertical'
								align='center'
								justify='start'
								gap='small'
								// background='#FFFAFF'
								pad={{ top: "xlarge" }}
							>
								<ResponsiveContext.Consumer>
									{size => (
										<Box
											direction='column'
											gap='xsmall'
											align='center'
											justify='start'
											margin='small'
											fill='vertical'
											pad='small'
											// background={this.props.darkMode ? "#FFFAFF" : "#FFFAFF"}
											width={size === "small" ? "" : "550px"}
										>
											<Box
												direction='row'
												justify='start'
												align='center'
												gap='small'
											>
												<Add color='status-ok' />
												<Text size='medium' weight='bold' color='status-ok'>
													Course
												</Text>
											</Box>

											<TextInput
												ref={this.targetRef}
												placeholder='Course Name'
												dropHeight='large'
												value={this.state.course_name}
												suggestions={this.state.suggestions}
												// plain={false}
												onChange={event => {
													this.setState({
														course_name: event.target.value,
													});
													var suggestions = this.props.carletonCourses.filter(
														course => {
															return course.label
																.toLowerCase()
																.includes(event.target.value.toLowerCase());
														}
													);

													console.log(suggestions);
													this.setState({
														suggestions: suggestions,
													});
												}}
												onSelect={event => {
													console.log("select", event);
													this.setState({
														course_name: event.suggestion.label,
													});
												}}
											/>

											<TextInput
												ref={this.targetRef}
												placeholder='Location'
												dropHeight='large'
												value={this.state.location}
												onChange={event => {
													this.setState({
														location: event.target.value,
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
													width='500px'
													onChange={color => {
														console.log(color);
														this.setState({
															color: color.hex,
														});
													}}
												/>
											</Box>
											<Box align='start' margin={{ top: "large" }} flex={false}>
												{Array.from(Array(6).keys()).map(day => {
													return (
														<Box gap='small' flex={false} direction='row'>
															<CheckBox
																checked={this.state.schedule[day].selected}
																onChange={bool => {
																	this.state.schedule[day].selected = !this
																		.state.schedule[day].selected;
																	this.setState({});
																}}
															/>
															<Text>
																{moment()
																	.day(day + 1 >= 8 ? 0 : day + 1)
																	.format("dddd")}
															</Text>
															<MaskedInput
																mask={[
																	{
																		length: [1, 2],
																		regexp: /^1[1-2]$|^[0-9]$/,
																		placeholder: "hh",
																	},
																	{ fixed: ":" },
																	{
																		length: 2,
																		regexp: /^[0-5][0-9]$|^[0-9]$/,
																		placeholder: "mm",
																	},
																]}
																value={
																	this.state.schedule[day].start == null
																		? ""
																		: this.state.schedule[day].start
																}
																onChange={event => {
																	this.state.schedule[day].start =
																		event.target.value;
																	this.forceUpdate();
																}}
															/>
															<MaskedInput
																mask={[
																	{
																		length: [1, 2],
																		regexp: /^1[1-2]$|^[0-9]$/,
																		placeholder: "hh",
																	},
																	{ fixed: ":" },
																	{
																		length: 2,
																		regexp: /^[0-5][0-9]$|^[0-9]$/,
																		placeholder: "mm",
																	},
																]}
																value={
																	this.state.schedule[day].end == null
																		? ""
																		: this.state.schedule[day].end
																}
																onChange={event => {
																	this.state.schedule[day].end =
																		event.target.value;
																	this.forceUpdate();
																}}
															/>
														</Box>
													);
												})}
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
															this.state.color,
															this.state.schedule,
															this.state.location
														);
														this.setState({
															course_name: "",
															color: "#FFFFFF",
															course_abbr: "",
														});
													}}
													disabled={
														(this.state.course_name !== "") &
														(this.state.color !== "")
															? false
															: true
													}
												/>
											</Box>
										</Box>
									)}
								</ResponsiveContext.Consumer>
							</Box>
						</Box>
					</Box>

					<Box margin='medium'>
						<Box
							pad='small'
							// background={this.props.darkMode ? "#4D4B5C" : "#ebe4eb"}
							round='small'
						>
							<Button
								onClick={() => {
									this.props.select_course(null);
								}}
							>
								<Box direction='row' gap='small'>
									<Text>Close</Text>
								</Box>
							</Button>
						</Box>
					</Box>
				</Stack>
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
			carletonCourses: state.carletonCourses,
		};
	}

	return {
		darkMode: state.darkMode,
		auth: state.firebase.auth,
		projects: state.firestore.ordered["Assignments"],
		courses: state.firestore.ordered["Courses"],
		selected_course: state.selectedCourse,
		selected_ass: state.selectedAss,
		carletonCourses: state.carletonCourses,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		select_ass: ass => dispatch(select_ass(ass)),
		select_course: course => dispatch(select_course(course)),
		addCourse: (courseName, uid, abbr, color, schedule, location) =>
			dispatch(addCourse(courseName, uid, abbr, color, schedule, location)),
	};
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(AddCourse);
