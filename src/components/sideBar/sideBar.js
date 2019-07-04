import React from 'react'
import { Box, Button, Text } from 'grommet'
import { connect } from 'react-redux'
import { compose } from 'redux'
import LoginModal from './../auth/loginModal'

import { select_course } from './../../store/actions/selectedCourseActions'
import { select_ass } from './../../store/actions/selectedAssActions'

class SideBar extends React.Component {
  constructor(props) {
    super(props)
  }

  CourseList = ({ courses }) => (
    <Box round="small" flex="false" fill="horizontal">
      <Button
        focusIndicator={false}
        hoverIndicator={true}
        onClick={() => {
          this.props.select_course(null)
          this.props.select_ass(null)
        }}
      >
        <Box
          height="xxsmall"
          width="400px"
          background={
            this.props.selected_course === null
              ? this.props.darkMode
                ? '#4D4B5C'
                : 'brand'
              : 'transparent'
          }
          elevation={this.props.selected_course === null ? 'medium' : ''}
          align="start"
          flex="false"
          justify="center"
        >
          <Box
            direction="column"
            margin={{ left: '20px', top: '0px', bottom: '0px' }}
          >
            <Text
              color={this.props.darkMode ? 'light-1' : ''}
              weight="bold"
              size="12"
            >
              Dashboard
            </Text>
          </Box>
        </Box>
      </Button>

      {courses !== undefined &&
        courses.map(course => {
          return (
            <Button
              focusIndicator={false}
              hoverIndicator={true}
              key={course.id.toString()}
              onClick={() => {
                this.props.select_course(course)
                this.props.select_ass(null)
              }}
            >
              <Box
                height="xxsmall"
                width="400px"
                background={
                  this.props.selected_course === null
                    ? 'transparent'
                    : this.props.selected_course.id === course.id
                    ? this.props.darkMode
                      ? '#4D4B5C'
                      : 'brand'
                    : 'transparent'
                }
                elevation={
                  this.props.selected_course === null
                    ? ''
                    : this.props.selected_course.id === course.id
                    ? 'medium'
                    : ''
                }
                align="start"
                flex="false"
                justify="center"
              >
                <Box
                  direction="column"
                  margin={{ left: '20px', top: '0px', bottom: '0px' }}
                >
                  <Text
                    color={this.props.darkMode ? 'light-1' : ''}
                    weight="bold"
                    size="12"
                  >
                    {course.name}
                  </Text>
                </Box>
              </Box>
            </Button>
          )
        })}
    </Box>
  )

  render() {
    const { courses } = this.props

    return (
      <Box
        width="350px"
        background={this.props.darkMode ? '#20273C' : 'light-2'}
        elevation="small"
        align="center"
        direction="column"
        overflow="auto"
      >
        <Box fill>
          <Box flex={false} tag="header" pad="small">
            <LoginModal></LoginModal>
          </Box>

          <Box flex overflow="auto">
            {courses === undefined || courses.length === 0 ? null : (
              <this.CourseList
                courses={courses[0].Courses ? courses[0].Courses : courses}
              />
            )}
          </Box>

          <Box flex={false} pad="small">
            {/* {
                      courses === undefined || courses.length === 0 ? null :
                        <this.Adder courses={courses[0].Courses ? courses[0].Courses : courses} />
                    } */}
          </Box>
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
)(SideBar)
