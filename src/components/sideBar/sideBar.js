import React from "react";
import { Box, Button, Text } from "grommet";
import { connect } from "react-redux";
import { compose } from "redux";
import LoginModal from "./../auth/loginModal";
import { select_course } from "./../../store/actions/selectedCourseActions";
import { select_ass } from "./../../store/actions/selectedAssActions";
import { Sidebar } from "./grommetSideBar";

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
						elevation={this.props.selected_course === null ? "medium" : ""}
						align='start'
						flex='false'
						justify='center'
					>
						<Box
							direction='column'
							margin={{ left: "20px", top: "0px", bottom: "0px" }}
						>
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
											? "medium"
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
			<Button onClick={() => {}}>
				<Box
					height='xxsmall'
					fill='horizontal'
					align='start'
					flex='false'
					justify='center'
				>
					<Box
						direction='row'
						margin={{ left: "20px", top: "0px", bottom: "0px" }}
						gap='10px'
						align='center'
					>
						{/* <Add size='small'/> */}
						<Text
							color={this.props.darkMode ? "dark-3" : "dark-3"}
							weight='bold'
							size='12'
						>
							New Course
						</Text>
					</Box>
				</Box>
			</Button>
		</Box>
	);

	render() {
		const { courses } = this.props;

		return (
			<Box
				background={this.props.darkMode ? "#20273C" : "light-2"}
				elevation='small'
				align='center'
				direction='column'
				overflow='auto'
				flex={false}
				fill='vertical'
			>
				<Box
					pad={{ left: "20px", right: "20px", bottom: "0px" }}
					fill='horizontal'
					tag='header'
					// pad='small'
				>
					<LoginModal />
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
							hoverIndicator={true}
							onClick={() => {}}
						>
							<Box
								height='xxsmall'
								fill='horizontal'
								align='start'
								flex='false'
								justify='center'
							>
								<Box
									direction='row'
									margin={{ left: "20px", top: "0px", bottom: "0px" }}
								>
									<Text
										color={this.props.darkMode ? "dark-3" : "dark-3"}
										weight='bold'
										size='12'
									>
										Settings
									</Text>
								</Box>
							</Box>
						</Button>
					</Box>
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
	};
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(SideBar);
