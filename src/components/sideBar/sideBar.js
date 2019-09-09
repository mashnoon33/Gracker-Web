import React from "react";
import { Box, Button, Text, ResponsiveContext, Grid } from "grommet";
import { connect } from "react-redux";
import { compose } from "redux";
import LoginModal from "./../auth/loginModal";
import { Offline, Online } from "react-detect-offline";

import { select_course } from "./../../store/actions/selectedCourseActions";
import { select_ass } from "./../../store/actions/selectedAssActions";
import { Sidebar } from "./grommetSideBar";
import { Logout, Google, StatusPlaceholder, Actions, Add } from "grommet-icons";

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
						height='35px'
						background={
							this.props.selected_course == null
								? this.props.darkMode
									? "brand"
									: "brand"
								: hover
								? this.props.darkMode
									? "#30384f"
									: "light-5"
								: ""
						}
						// elevation={this.props.selected_course === null ? "xsmall" : ""}
						align='start'
						flex={false}
						justify='center'
					>
						<Box
							direction='row'
							margin={{ left: "medium", top: "0px", bottom: "0px" }}
							gap='small'
						>
							<Box
								background={
									this.props.selected_course == null
										? this.props.darkMode
											? "#FFFAFF"
											: "#FFFAFF"
										: "brand"
								}
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
								color={
									this.props.selected_course == null
										? this.props.darkMode
											? "#FFFAFF"
											: "#FFFAFF"
										: "#0A0908"
								}
								weight='500'
								size='16px'
							>
								Dashboard
							</Text>
						</Box>
					</Box>
				)}
			</Button>

			<Button
				focusIndicator={false}
				plain
				onClick={() => {
					this.props.select_course("Calendar");
					this.props.select_ass(null);
				}}
			>
				{({ hover }) => (
					<Box
						height='35px'
						background={
							this.props.selected_course === "Calendar"
								? this.props.darkMode
									? "brand"
									: "brand"
								: hover
								? this.props.darkMode
									? "#30384f"
									: "light-5"
								: ""
						}
						// elevation={this.props.selected_course === null ? "xsmall" : ""}
						align='start'
						flex={false}
						justify='center'
					>
						<Box
							direction='row'
							margin={{ left: "medium", top: "0px", bottom: "0px" }}
							gap='small'
						>
							<Box
								background={"grey"}
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
								// color={
								// 	this.props.selected_course == null
								// 		? this.props.darkMode
								// 			? "#FFFAFF"
								// 			: "#FFFAFF"
								// 		: "#0A0908"
								// }
								weight='500'
								size='16px'
							>
								Calendar
							</Text>
						</Box>
					</Box>
				)}
			</Button>

			<Box>
				<Text
					margin={{
						top: "medium",
						left: "medium",
						bottom: " medium",
					}}
					weight='bold'
					color='#767376'
					size='14px'
				>
					COURSES
				</Text>
			</Box>

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
									height='35px'
									align='start'
									flex='false'
									justify='center'
								>
									<Box
										direction='Row'
										margin={{
											left: "medium",
										}}
										gap='small'
										width='280px'
									>
										<Box
											background={
												this.props.selected_course !== null
													? this.props.selected_course.id === course.id
														? this.props.darkMode
															? course.color
															: "#FFFAFF"
														: course.color
													: course.color
											}
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
											color={
												this.props.selected_course !== null
													? this.props.selected_course.id === course.id
														? this.props.darkMode
															? "#FFFAFF"
															: "#FFFAFF"
														: ""
													: " "
											}
											weight='500'
											size='16px'
											truncate={true}
										>
											{course.name}
										</Text>
									</Box>
								</Box>
							)}
						</Button>
					);
				})}

			<Button
				focusIndicator={false}
				plain
				onClick={() => {
					this.props.select_course("add");
					this.props.select_ass(null);
				}}
			>
				{({ hover }) => (
					<Box
						height='35px'
						// background={
						// 	this.props.selected_course == null
						// 		? this.props.darkMode
						// 			? "#4D4B5C"
						// 			: "brand"
						// 		: hover
						// 		? this.props.darkMode
						// 			? "#30384f"
						// 			: "brand"
						// 		: ""
						// }
						// elevation={this.props.selected_course === null ? "xsmall" : ""}
						align='start'
						flex={false}
						justify='center'
					>
						<Box
							direction='row'
							margin={{ left: "medium", top: "0px", bottom: "0px" }}
							gap='small'
						>
							<Add size='16px' />
							<Text
								// color={
								// 	this.props.selected_course == null
								// 		? this.props.darkMode
								// 			? "#FFFAFF"
								// 			: "#FFFAFF"
								// 		: "#0A0908"
								// }
								weight='500'
								size='16px'
								color='grey'
							>
								Add New Course
							</Text>
						</Box>
					</Box>
				)}
			</Button>
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
						border={{
							color: "border",

							side: "right",
						}}
						background={this.props.darkMode ? "#20273C" : "#F4EFF4"}
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
								justify='start'
								align='center'
								direction='row'
								margin='medium'
							>
								<Text
									color={this.props.darkMode ? "accent-1" : "brand"}
									weight='bold'
									size='25px'
								>
									Gracker
								</Text>
							</Box>
						</Box>
						<Box fill>
							<Box flex overflow='auto'>
								{courses === undefined ? null : (
									<this.CourseList courses={courses} />
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
