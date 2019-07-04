import React from 'react'
import { Box, Button, Text, Keyboard } from 'grommet'
import { connect } from 'react-redux'
import { compose } from 'redux'
// import Modal from "react-redux-modal-flex";
// import TypeFormComponent from "./components/adder/form";
import moment from 'moment'

import { select_course } from './../../store/actions/selectedCourseActions'
import { select_ass } from './../../store/actions/selectedAssActions'

// const appTokenKey = "appToken"; // also duplicated in Login.js

class Assignments extends React.Component {
  constructor(props) {
    super(props)
  }

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
          )
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
          )
        }
      }}
    >
      <Box
        // elevation="small"
        // round="small"
        flex="false"
        fill="horizontal"
        // background="white"
        pad={{ left: '00px', right: '00px', top: '10px', bottom: '10px' }}
      >
        {asses !== undefined &&
          asses.map(ass => {
            return (
              <Button
                hoverIndicator={true}
                focusIndicator={false}
                key={ass.id.toString()}
                disabled={ass.done ? true : false}
                onClick={() => {
                  // this.setState({
                  //   selected_ass: ass
                  // });
                  this.props.select_ass(ass)
                }}
              >
                <Box
                  pad={{ left: '10px', right: '10px' }}
                  height="xxsmall"
                  // width="350px"
                  fill="horizontal"
                  background={
                    this.props.selected_ass === null
                      ? 'transparent'
                      : this.props.selected_ass.id === ass.id
                      ? this.props.darkMode
                        ? '#4D4B5C'
                        : 'brand'
                      : 'transparent'
                  }
                  elevation={
                    this.props.selected_ass === null
                      ? ''
                      : this.props.selected_ass.id === ass.id
                      ? 'medium'
                      : ''
                  }
                  align="center"
                  flex="false"
                  justify="start"
                  direction="row"
                >
                  <Box
                    width="38px"
                    height="38px"
                    align="center"
                    justify="center"
                    direction="column"
                    // background='red'
                  >
                    <Text
                      color={this.props.darkMode ? 'light-1' : ''}
                      size="small"
                    >
                      {' '}
                      {moment(ass.dueDate.toDate()).format('MMM')}
                    </Text>

                    <Text
                      color={this.props.darkMode ? 'light-1' : ''}
                      size="medium"
                      weight="bold"
                    >
                      {' '}
                      {ass.dueDate.toDate().getDate()}
                    </Text>
                  </Box>

                  <Box
                    direction="column"
                    margin={{ left: '10px', top: '0px', bottom: '0px' }}
                  >
                    <Box direction="row" justify="start" align="center">
                      {moment(ass.dueDate.toDate()).diff(moment(), 'minutes') <
                      0 ? (
                        <Box
                          // width='xxsmall'
                          background={
                            this.props.darkMode ? 'neutral-4' : 'status-error'
                          }
                          round="xxsmall"
                          height="12px"
                          width="20px"
                          margin={{ right: '5px', vertical: '0px' }}
                          justify="center"
                          align="center"
                          pad={{ left: '3px', right: '3px', vertical: '2px' }}
                        >
                          <Text
                            size="xsmall"
                            weight="bold"
                            color="white"
                          ></Text>
                        </Box>
                      ) : null}

                      <Text
                        color={this.props.darkMode ? 'light-1' : ''}
                        weight="bold"
                        size="12"
                      >
                        {ass.name}
                      </Text>
                    </Box>

                    <Text color={this.props.darkMode ? 'light-1' : ''} size="9">
                      {courses
                        ? courses.find(obj => obj.id === ass.course)
                          ? courses.find(obj => obj.id === ass.course).name
                          : ''
                        : ''}
                    </Text>
                  </Box>
                </Box>
              </Button>
            )
          })}
      </Box>
    </Keyboard>
  )

  render() {
    const { projects, courses } = this.props

    return (
      <Box direction="column">
        <Box
          flex={false}
          tag="header"
          pad="small"
          elevation="xsmall"
          background={this.props.darkMode ? '#29324D' : 'light-1'}
        >
          <Box pad={{ left: 'small' }}>
            <h3>Assignments</h3>
          </Box>
        </Box>
        <Box
          background={this.props.darkMode ? '#29324D' : 'light-1'}
          width="medium"
          elevation="small"
          fill="vertical"
          direction="column"
          overflow="auto"
        >
          {this.props.selected_course == null ? (
            <this.AssCard courses={courses} asses={projects} />
          ) : (
            <this.AssCard
              courses={courses.filter(course => {
                return course.id === this.props.selected_course.id
              })}
              asses={projects.filter(ass => {
                return ass.course === this.props.selected_course.id
              })}
            />
          )}
        </Box>
      </Box>
    )
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
    }
  }

  return {
    darkMode: state.darkMode,
    auth: state.firebase.auth,
    projects: state.firestore.ordered['Assignments'],
    courses: state.firestore.ordered['Courses'],
    selected_course: state.selectedCourse,
    selected_ass: state.selectedAss,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    select_ass: ass => dispatch(select_ass(ass)),
    select_course: course => dispatch(select_course(course)),
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Assignments)
