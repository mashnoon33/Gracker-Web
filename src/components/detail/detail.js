import React from "react";
import {
	Box,
	Button,
	Text,
	Calendar,
	Accordion,
	AccordionPanel,
	TextArea,
	CheckBox,
} from "grommet";
import "react-infinite-calendar/styles.css"; // Make sure to import the default stylesheet

import { CatalogOption, Alarm, Notes } from "grommet-icons";
import "@vaadin/vaadin-date-picker";
import { connect } from "react-redux";
import { compose } from "redux";
import { checkBox } from "./../../store/actions/projectActions";
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
			<Box
				align='start'
				justify='start'
				// pad='medium'
				flex='false'
				direction='column'
				width='420px'
			>
				{this.props.selected_ass !== null ? (
					<Box direction='column'>
						<Box flex={false} tag='header' pad='small' fill='horizontal' />
					</Box>
				) : null}

				{this.props.selected_ass !== null ? (
					<Box
						align='start'
						justify='start'
						gap='small'
						margin={{ left: "medium", top: "50px", bottom: "0px" }}
					>
						<Box direction='row' justify='start' align='center'>
							<Box margin={{ right: "7px" }}>
								<CheckBox
									checked={this.props.selected_ass.done}
									onChange={() => {
										console.log("Mashnoon");
										this.props.checkBox(
											this.props.selected_ass,
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

						<Box
							background={this.props.darkMode ? "#20273C" : "light-2"}
							elevation='xsmall'
							round='small'
							pad='small'
							gap='small'
							direction='column'
							align='start'
							flex={false}
						>
							<Accordion>
								<AccordionPanel
									label={
										<Box>
											<Box direction='row' gap='small'>
												<Alarm />

												<Text>
													{moment(
														this.props.selected_ass.dueDate == null
															? "2019-07-4"
															: this.props.selected_ass.dueDate.toDate()
													).format("MMMM Do, YYYY")}{" "}
												</Text>
												<Box direction='row' justify='start' align='center'>
													{moment(
														this.props.selected_ass.dueDate == null
															? Date()
															: this.props.selected_ass.dueDate.toDate()
													).diff(moment(), "minutes") < 0 ? (
														<Box
															// width='xxsmall'
															background={
																this.props.darkMode
																	? "neutral-4"
																	: "status-error"
															}
															round='xxsmall'
															height='20px'
															// width='20px'
															margin={{ right: "5px", bottom: "0px" }}
															justify='center'
															align='center'
															pad={{
																left: "3px",
																right: "3px",
																vertical: "2px",
															}}
														>
															<Text size='small' weight='bold' color='white'>
																Late by{" "}
																{moment().diff(
																	moment(
																		this.props.selected_ass.dueDate == null
																			? Date()
																			: this.props.selected_ass.dueDate.toDate()
																	),
																	"days"
																)}{" "}
																days
															</Text>
														</Box>
													) : null}
												</Box>
											</Box>
										</Box>
									}
								>
									<Calendar
										size='small'
										daysOfWeek={true}
										firstDayOfWeek={1}
										date={this.props.selected_ass.dueDate.toDate()}
									/>
								</AccordionPanel>
							</Accordion>
						</Box>
						<Box
							background={this.props.darkMode ? "#20273C" : "light-2"}
							elevation='xsmall'
							round='small'
							fill='horizontal'
							pad='small'
							height='small'
							gap='small'
							direction='column'
							align='start'
						>
							<Box direction='row' gap='small'>
								<Notes />
								<Text>Notes</Text>
							</Box>
							<TextArea size='medium' fill />
						</Box>
					</Box>
				) : null}
			</Box>
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
	};
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(Detail);
