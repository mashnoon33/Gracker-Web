import React from "react";
import { Box, Button, Text, ResponsiveContext, Grid } from "grommet";
import { connect } from "react-redux";
import { compose } from "redux";
import LoginModal from "./../auth/loginModal";
import { Offline, Online } from "react-detect-offline";

import { select_course } from "./../../store/actions/selectedCourseActions";
import { select_ass } from "./../../store/actions/selectedAssActions";
import { Sidebar } from "./grommetSideBar";
import { Logout, Google, StatusPlaceholder, Actions } from "grommet-icons";

class SideBar extends React.Component {
	constructor(props) {
		super(props);
	}

	CourseList = ({ courses }) => (
		<Box flex='false' fill='horizontal'>
			<Button
				focusIndicator={false}
				plain
				onClick={() => {
					this.props.select_course(null);
					this.props.select_ass(null);
				}}
			>
				{({ hover }) => (
					<Box
						height='xxsmall'
						background={
							this.props.selected_course == null
								? this.props.darkMode
									? "#4D4B5C"
									: "brand"
								: hover
								? this.props.darkMode
									? "#30384f"
									: "light-5"
								: ""
						}
						elevation={this.props.selected_course === null ? "xsmall" : ""}
						align='start'
						flex={false}
						justify='center'
					>
						<Box
							direction='row'
							margin={{ left: "20px", top: "0px", bottom: "0px" }}
							gap='small'
						>
							<Box
								background={this.props.darkMode ? "white" : "black"}
								round='xxsmall'
								height='12px'
								width='10px'
								fill='vertical'
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
							<Text
								color={this.props.darkMode ? "light-1" : ""}
								weight='bold'
								size='12'
							>
								Dashboard
							</Text>
						</Box>
					</Box>
				)}
			</Button>

			{courses !== undefined &&
				courses.map(course => {
					return (
						<Button
							plain
							focusIndicator={false}
							key={course.id.toString()}
							onClick={() => {
								this.props.select_course(course);
								this.props.select_ass(null);
							}}
						>
							{({ hover }) => (
								// TODO: Add Hover highlight background for darkmdode!
								<Box
									height='xxsmall'
									background={
										this.props.selected_course !== null
											? this.props.selected_course.id === course.id
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
										this.props.selected_course === null
											? ""
											: this.props.selected_course.id === course.id
											? "xsmall"
											: ""
									}
									align='start'
									flex='false'
									justify='center'
								>
									<Box
										direction='Row'
										margin={{
											left: "20px",
											top: "0px",
											bottom: "0px",
											right: "10px",
										}}
										gap='small'
									>
										<Box
											background={course.color}
											round='xxsmall'
											height='12px'
											width='10px'
											fill='vertical'
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
										<Text
											color={this.props.darkMode ? "light-1" : ""}
											weight='bold'
											size='12'
										>
											{course.name}
										</Text>
									</Box>
								</Box>
							)}
						</Button>
					);
				})}
		</Box>
	);

	render() {
		const { courses } = this.props;
		this.props.courses
			? this.props.courses.length > 0
				? select_course(courses[0])
				: select_course(courses[0])
			: select_course(null);

		return (
			<ResponsiveContext.Consumer>
				{size => (
					<Box
						background={this.props.darkMode ? "#20273C" : "light-3"}
						elevation='small'
						align='center'
						direction='column'
						overflow='auto'
						width={size === "large" ? "300px" : ""}
						flex={size === "large" ? false : true}
						fill={size === "large" ? "" : "horizontal"}
					>
						<Box
							pad={{ vertical: "10px" }}
							fill='horizontal'
							tag='header'
							// pad='small'
						>
							<Box
								gridArea='header'
								justify='start'
								align='center'
								direction='row'
							>
								<Button
									icon={
										<StatusPlaceholder
											color={this.props.darkMode ? "accent-1" : "status-ok"}
										/>
									}
								/>
								<Text
									color={this.props.darkMode ? "accent-1" : "status-ok"}
									weight='bold'
									size='large'
								>
									Gracker
								</Text>
							</Box>
						</Box>
						<Box fill>
							<Box flex overflow='auto'>
								{courses === undefined || courses.length === 0 ? null : (
									<this.CourseList
										courses={courses[0].Courses ? courses[0].Courses : courses}
									/>
								)}
							</Box>

							<Box flex={false} pad='small'>
								{/* {
                      courses === undefined || courses.length === 0 ? null :
                        <this.Adder courses={courses[0].Courses ? courses[0].Courses : courses} />
                    } */}
							</Box>

							<Box fill='horizontal' direction='column' gap='small'>
								<Button
									focusIndicator={false}
									// hoverIndicator={true}
									onClick={() => {}}
								>
									<Box fill='horizontal' flex='false' justify='center'>
										<Box
											direction='row'
											fill='horizontal'

											// margin={{ left: "20px", top: "0px", bottom: "0px" }}
										>
											<LoginModal />
										</Box>
									</Box>
								</Button>
							</Box>
						</Box>
					</Box>
				)}
			</ResponsiveContext.Consumer>
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
	};
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(SideBar);
