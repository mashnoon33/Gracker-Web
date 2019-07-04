import React from 'react'
import { Box, Button, Text, Calendar, DropButton } from 'grommet'
import { CatalogOption, Alarm } from 'grommet-icons'
import '@vaadin/vaadin-date-picker'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { select_course } from './../../store/actions/selectedCourseActions'
import { select_ass } from './../../store/actions/selectedAssActions'
import moment from 'moment'

class Detail extends React.Component {
  render() {
    return (
      <Box
        align="start"
        justify="start"
        // pad='medium'
        direction="column"
        width="medium"
      >
        {this.props.selected_ass !== null ? (
          <Box direction="column">
            <Box flex={false} tag="header" pad="small" fill="horizontal"></Box>
          </Box>
        ) : null}

        {this.props.selected_ass !== null ? (
          <Box
            align="start"
            justify="start"
            gap="xsmall"
            margin={{ left: 'medium', top: '50px', bottom: '0px' }}
          >
            <Text size="xxlarge" weight="bold ">
              {this.props.selected_ass.name}
            </Text>

            <Box direction="row" justify="start" align="center">
              {moment(this.props.selected_ass.dueDate.toDate()).diff(
                moment(),
                'minutes'
              ) < 0 ? (
                <Box
                  // width='xxsmall'
                  background={
                    this.props.darkMode ? 'neutral-4' : 'status-error'
                  }
                  round="xxsmall"
                  height="20px"
                  // width='20px'
                  margin={{ right: '5px', bottom: '10px' }}
                  justify="center"
                  align="center"
                  pad={{ left: '3px', right: '3px', vertical: '2px' }}
                >
                  <Text
                    color={this.props.darkMode ? 'light-1' : ''}
                    size="small"
                    weight="bold"
                    color="white"
                  >
                    Late by{' '}
                    {moment().diff(
                      moment(this.props.selected_ass.dueDate.toDate()),
                      'days'
                    )}{' '}
                    days
                  </Text>
                </Box>
              ) : null}
            </Box>

            <DropButton
              dropContent={
                <Box background={this.props.darkMode ? '#20273C' : 'light-2'}>
                  <Calendar
                    size="medium"
                    date={this.props.selected_ass.dueDate.toDate()}
                  />
                </Box>
              }
            >
              <Box direction="row" gap="small">
                <Alarm />

                <Text>
                  {this.props.selected_ass.dueDate.toDate()
                    ? moment(this.props.selected_ass.dueDate.toDate()).format(
                        'MMMM Do YYYY'
                      )
                    : 'Select date'}
                </Text>
              </Box>
            </DropButton>

            <Button
              plain={true}
              hoverIndicator={true}
              icon={<CatalogOption size="medium" />}
              margin="0px"
              label={
                <Text
                  color={this.props.darkMode ? 'light-1' : ''}
                  size="medium"
                >
                  {this.props.courses
                    ? this.props.courses.find(
                        obj => obj.id === this.props.selected_ass.course
                      )
                      ? this.props.courses.find(
                          obj => obj.id === this.props.selected_ass.course
                        ).name
                      : ''
                    : ''}
                </Text>
              }
              onClick={() => {
                this.props.select_course(
                  this.props.courses.find(
                    obj => obj.id === this.props.selected_ass.course
                  )
                )
              }}
            />
          </Box>
        ) : null}
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
)(Detail)
