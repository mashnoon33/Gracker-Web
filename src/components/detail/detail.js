import React from "react";
import {
	Box,
	Button,
	Text,
	Calendar,
	Accordion,
	AccordionPanel,
	DropButton,
	TextInput,
	CheckBox,
	ResponsiveContext,
} from "grommet";
import { MaskedInput } from "grommet-controls";

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
	saveNote,
} from "./../../store/actions/projectActions";
import { select_course } from "./../../store/actions/selectedCourseActions";
import { select_ass } from "./../../store/actions/selectedAssActions";
import moment from "moment";

class Detail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			date: Date(10 - 10 - 1910),
			editing: false,
			ass_name: "",
			selected_course: { id: "" },
			dueDate: new Date(),
			prevCourse: { id: "" },
			lastSave: new Date(),
			updateDue: false,
			// course_name: "",
			// color: "#FFFFFF",
			// course_abbr: "",
		}; // You can also pass a Quill Delta here
	}

	AddAssCard = ({ courses }) => (
		<ResponsiveContext.Consumer>
			{size => (
				<Box
					direction='column'
					gap='small'
					margin='small'
					pad='small'
					width={size === "small" ? "430px" : "430px"}
					flex={false}
				>
					<Text weight='bold' color='#767376' size='14px'>
						NAME
					</Text>
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
						{this.props.courses !== undefined &&
						this.props.courses.length === 0 ? (
							<Text>Please add a course first!</Text>
						) : null}
					</div>
					<Text weight='bold' color='#767376' size='14px'>
						COURSE
					</Text>
					<div>
						{this.props.courses !== undefined &&
							this.props.courses.map(course => {
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
					<Text weight='bold' color='#767376' size='14px'>
						TIME
					</Text>
					<Box align='center'>
						<MaskedInput
							placeholderChar='_'
							mask={[/[0-2]/, /\d/, ":", /[0-5]/, /\d/]}
							placeholder='Time'
							value={moment(this.state.dueDate).format("HH:mm")}
							// onChange={({ target: { value } }) =>
							// 	this.setState({
							// 		dueDate: this.state.dueDate.setHours(value.split(":")[0]),
							// 	})
							// }
							showMask={true}
						/>
					</Box>
					<Text weight='bold' color='#767376' size='14px'>
						DAY
					</Text>
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
					<Box align='center' direction='row' gap='small' justify='end'>
						<Button
							plain
							label='Cancel'
							onClick={() => {
								if (this.state.editing) {
									this.setState({
										editing: false,
									});
								}
							}}
						/>
						<Button
							primary
							label={this.props.selected_ass === "add" ? "add" : "Update"}
							onClick={() => {
								this.props.addAss(
									this.state.ass_name,
									this.state.selected_course,
									this.props.auth.uid,
									this.state.dueDate,
									this.props.selected_ass === "add"
										? null
										: this.props.selected_ass.id,
									null,
									null
								);

								this.setState({
									editing: false,
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

	titleCard = () => {
		return (
			<Box pad='small' gap='small'>
				<Box
					direction='row'
					justify='start'
					align='start'
					margin={{ bottom: "small" }}
					width='430px'
				>
					<Box margin={{ right: "10px" }} justify='start' align='start'>
						<CheckBox
							color='brand'
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
					<Text
						size='20px'
						weight='500 '
						color={!this.props.darkMode ? "brand" : "accent-1"}
					>
						{this.props.asses
							? this.props.asses.find(
									obj => obj.id === this.props.selected_ass.id
							  )
								? this.props.asses.find(
										obj => obj.id === this.props.selected_ass.id
								  ).name
								: "Error"
							: "Error"}
					</Text>
				</Box>
				<Button plain={true} hoverIndicator={false} margin='0px'>
					<Box direction='row' gap='xsmall'>
						<Text>📕</Text>
						<Text color={this.props.darkMode ? "light-1" : ""} size='medium'>
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
					</Box>
				</Button>

				{/* <Text>
					{this.props.selected_ass == null ? "" : this.props.selected_ass.id}
				</Text>
				<Text>
					{this.props.selected_course == null
						? ""
						: this.props.selected_course.id}
				</Text> */}
				<Box direction='row' align='center'>
					<Box flex={true}>
						<DropButton
							dropContent={
								<Box background={this.props.darkMode ? "#20273C" : "light-2"}>
									<Calendar
										size='medium'
										date={this.props.selected_ass.dueDate.toDate()}
									/>
								</Box>
							}
						>
							<Box direction='row' gap='small'>
								<Text>⏰</Text>

								<Text>
									{this.props.selected_ass.dueDate.toDate()
										? moment(this.props.selected_ass.dueDate.toDate()).format(
												"MMMM Do YYYY"
										  )
										: "Select date"}
								</Text>
								{moment(this.props.selected_ass.dueDate.toDate()).diff(
									moment(),
									"minutes"
								) < 0 ? (
									<Box
										// width='xxsmall'
										background={
											this.props.darkMode ? "neutral-4" : "status-error"
										}
										round='xxsmall'
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
										<Text size='xsmall' weight='bold' color='white'>
											{" "}
											Late{" "}
										</Text>
									</Box>
								) : null}
							</Box>
						</DropButton>
					</Box>
					<Box flex={false} justify='end' direction='row' gap='small'>
						<Button
							onClick={() => {
								this.setState({
									ass_name: this.props.selected_ass.name,
									dueDate: this.props.selected_ass.dueDate.toDate(),
									selected_course: this.props.courses
										? this.props.courses.find(
												obj => obj.id === this.props.selected_ass.course
										  )
											? this.props.courses.find(
													obj => obj.id === this.props.selected_ass.course
											  )
											: null
										: null,
									editing: true,
								});
							}}
						>
							<Box
								flex={false}
								justify='center'
								align='center'
								direction='row'
								gap='small'
							>
								<Edit size='small' />
								<Text>Edit</Text>
							</Box>
						</Button>
					</Box>
				</Box>
			</Box>
		);
	};

	render() {
		if (
			(this.props.selected_ass !== null) &
			(this.props.selected_ass !== "add")
		) {
			console.log("Not your time yet");

			if (moment().diff(moment(this.state.lastSave), "miniute") > 1) {
				if (this.state.updateDue) {
					this.props.saveNote(
						this.props.selected_ass,
						this.props.auth.uid,
						this.state.text,
						this.state.timestamp
					);
					console.log("saved!");
					this.setState({
						updateDue: false,
					});
				}
				// else {
				// 	this.setState({
				// 		lastSave: new Date(),
				// 	});
				// }
			} else {
				console.log(
					"Not your time yet",
					moment().diff(moment(this.state.lastSave), "miniute")
				);
			}

			if (this.state.prevCourse.id !== this.props.selected_ass.id) {
				if (localStorage.getItem(this.props.selected_ass.id) !== null) {
					if (
						this.props.selected_ass.note !== "" &&
						moment(this.props.selected_ass.noteLastUpdated).isAfter(
							JSON.parse(localStorage.getItem(this.props.selected_ass.id)).time,
							"second"
						)
					) {
						this.setState({
							text: this.props.selected_ass.note,
						});
					} else {
						this.setState({
							text: JSON.parse(localStorage.getItem(this.props.selected_ass.id))
								.val,
						});
					}
				}
				this.setState({
					prevCourse: this.props.selected_ass,
				});
			}
		}
		if (this.props.selected_ass == null) {
			return (
				<Box
					align='center'
					justify='center'
					// flex='shrink'
					direction='column'
					flex={false}
					width='430px'
					// background='red'
				>
					<Text color='light-6' size='large'>
						Select an assignment to begin
					</Text>
				</Box>
			);
		}
		if (this.props.selected_ass === "add") {
			if (this.state.text !== "") {
				this.setState({
					text: "",
				});
			}

			return (
				<ResponsiveContext.Consumer>
					{size => (
						<Box
							align='start'
							justify='start'
							// pad='medium'

							direction='column'
							fill={size === "small" ? "horizontal" : ""}
							background={this.props.darkMode ? "#2f3852" : ""}
						>
							{this.props.selected_ass !== null ? (
								<Box direction='column' pad='small'>
									{size === "small" ? (
										<Button
											onClick={() => {
												this.props.select_ass(null);
											}}
										>
											{" "}
											<LinkPrevious />{" "}
										</Button>
									) : null}
								</Box>
							) : null}

							{this.props.selected_ass !== null ? (
								<Box fill='vertical' direction='row'>
									<Box
										align='start'
										justify='start'
										fill='horizontal'
										flex={false}
										pad={{
											horizontal: "small",
											top: "5px",
											bottom: "0px",
										}}
									>
										<this.AddAssCard />
										{/* <this.AddAssCard /> */}

										{/* <Button
										label='delete'
										color='status-critical'
										plain
										onClick={() => {
											this.props.delete_ass(
												this.props.selected_ass,
												this.props.auth.uid
											);
										}}
									/> */}
									</Box>
								</Box>
							) : null}
						</Box>
					)}
				</ResponsiveContext.Consumer>
			);
		}
		return (
			<ResponsiveContext.Consumer>
				{size => (
					<Box
						align='start'
						justify='start'
						// pad='medium'

						direction='column'
						fill={size === "small" ? "horizontal" : ""}
						background={this.props.darkMode ? "#2f3852" : ""}
					>
						{this.props.selected_ass !== null ? (
							<Box direction='column' pad='small'>
								{size === "small" ? (
									<Button
										onClick={() => {
											this.props.select_ass(null);
										}}
									>
										{" "}
										<LinkPrevious />{" "}
									</Button>
								) : null}
							</Box>
						) : null}

						{this.props.selected_ass !== null ? (
							<Box fill='vertical' direction='row'>
								<Box
									align='start'
									justify='start'
									fill='horizontal'
									flex={false}
									pad={{ horizontal: "small", top: "5px", bottom: "0px" }}
								>
									{this.state.editing ? (
										<this.AddAssCard />
									) : (
										<this.titleCard />
									)}
									{/* <this.AddAssCard /> */}

									{/* <Button
										label='delete'
										color='status-critical'
										plain
										onClick={() => {
											this.props.delete_ass(
												this.props.selected_ass,
												this.props.auth.uid
											);
										}}
									/> */}
									<Box flex={false} fill='horizontal'></Box>
								</Box>
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
		saveNote: (ass, uid, note, noteLastUpdated) =>
			dispatch(saveNote(ass, uid, note, noteLastUpdated)),
		delete_ass: (ass, uid) => dispatch(delete_ass(ass, uid)),
		addAss: (assName, course, uid, date, id, note, noteLastUpdated) =>
			dispatch(addAss(assName, course, uid, date, id, note, noteLastUpdated)),
	};
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(Detail);
