import React from "react";
import {
	Box,
	Button,
	Text,
	Calendar,
	Accordion,
	AccordionPanel,
	DropButton,
	TextArea,
	CheckBox,
	ResponsiveContext,
} from "grommet";
import "react-infinite-calendar/styles.css"; // Make sure to import the default stylesheet

import { CatalogOption, Alarm, Notes, LinkPrevious } from "grommet-icons";
import { connect } from "react-redux";
import { compose } from "redux";
import { checkBox, delete_ass } from "./../../store/actions/projectActions";
import { select_course } from "./../../store/actions/selectedCourseActions";
import { select_ass } from "./../../store/actions/selectedAssActions";
import moment from "moment";

class Detail extends React.Component {
	state = {
		date: Date(10 - 10 - 1910),
	};

	render() {
		if (this.props.selected_ass == null) {
			return (
				<Box
					align='center'
					justify='center'
					// flex='shrink'
					direction='column'
					flex={false}
					width='420px'
					// background='red'
				>
					<Text color='light-6' size='large'>
						Select an assignment to begin
					</Text>
				</Box>
			);
		}
		return (
			<ResponsiveContext.Consumer>
				{size => (
					<Box
						align='start'
						justify='start'
						// pad='medium'
						flex={false}
						direction='column'
						fill={size === "small" ? "horizontal" : ""}
						width='430px'
						background={this.props.darkMode ? "#2f3852" : ""}
					>
						{this.props.selected_ass !== null ? (
							<Box direction='column' pad='small'>
								{size === "small" ? (
									<Button
										onClick={() => {
											console.log("Back Button Pressed");
											this.props.select_ass(null);
										}}
									>
										{" "}
										<LinkPrevious />{" "}
									</Button>
								) : null}

								<Box flex={false} tag='header' pad='small' fill='horizontal' />
							</Box>
						) : null}

						{this.props.selected_ass !== null ? (
							<Box
								align='start'
								justify='start'
								gap='small'
								fill='horizontal'
								// background='red'
								pad={{ horizontal: "medium", top: "20px", bottom: "0px" }}
							>
								<Box direction='row' justify='start' align='center'>
									<Box margin={{ right: "7px" }}>
										<CheckBox
											checked={
												this.props.asses
													? this.props.asses.find(
															obj => obj.id === this.props.selected_ass.id
													  )
														? this.props.asses.find(
																obj => obj.id === this.props.selected_ass.id
														  ).done
														: true
													: true
											}
											onChange={() => {
												this.props.checkBox(
													this.props.asses.find(
														obj => obj.id === this.props.selected_ass.id
													),
													this.props.auth.uid
												);
											}}
										/>
									</Box>
									<Text size='xxlarge' weight='bold '>
										{this.props.selected_ass.name}
									</Text>
								</Box>

								<Button
									plain={true}
									hoverIndicator={true}
									icon={<CatalogOption size='medium' />}
									margin='0px'
									label={
										<Text
											color={this.props.darkMode ? "light-1" : ""}
											size='medium'
										>
											{this.props.courses
												? this.props.courses.find(
														obj => obj.id === this.props.selected_ass.course
												  )
													? this.props.courses.find(
															obj => obj.id === this.props.selected_ass.course
													  ).name
													: ""
												: ""}
										</Text>
									}
									onClick={() => {
										this.props.select_course(
											this.props.courses.find(
												obj => obj.id === this.props.selected_ass.course
											)
										);
									}}
								/>
								<DropButton
									dropContent={
										<Box
											background={this.props.darkMode ? "#20273C" : "light-2"}
										>
											<Calendar
												size='medium'
												date={this.props.selected_ass.dueDate.toDate()}
											/>
										</Box>
									}
								>
									<Box direction='row' gap='small'>
										<Alarm />

										<Text>
											{this.props.selected_ass.dueDate.toDate()
												? moment(
														this.props.selected_ass.dueDate.toDate()
												  ).format("MMMM Do YYYY")
												: "Select date"}
										</Text>
									</Box>
								</DropButton>
								<Button
									label='delete'
									color='status-critical'
									plain
									onClick={() => {
										this.props.delete_ass(
											this.props.selected_ass,
											this.props.auth.uid
										);
									}}
								/>
							</Box>
						) : null}
					</Box>
				)}
			</ResponsiveContext.Consumer>
		);
	}
}

const mapStateToProps = state => {
	if (state.firestore.data === undefined || state.firestore.data.length === 0) {
		return {
			firestore: state.firestore,
			darkMode: state.darkMode,
			auth: state.firebase.auth,
			asses: state.projects,
			selected_course: state.selectedCourse,
			selected_ass: state.selectedAss,
		};
	}

	return {
		firestore: state.firestore,
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
		delete_ass: (ass, uid) => dispatch(delete_ass(ass, uid)),
	};
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(Detail);
