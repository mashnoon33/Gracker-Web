import React from 'react'
import { Box, Grommet, Stack } from 'grommet'
import { CircleQuestion } from 'grommet-icons'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Detail from './components/detail/detail'
import SideBar from './components/sideBar/sideBar'
import Assignment from './components/assignments/assignments'

const theme = {
  global: {
    colors: {
      // brand: '#4D4B5C'
    },

    elevation: {
      light: {
        none: 'none',
        xsmall: '0px 1px 2px rgba(0, 0, 0, 0.20)',
        small: '0px 2px 4px rgba(0, 0, 0, 0.20)',
        medium: '0px 4px 8px rgba(0, 0, 0, 0.20)',
        large: '0px 8px 16px rgba(0, 0, 0, 0.20)',
        xlarge: '0px 12px 24px rgba(0, 0, 0, 0.20)',
      },
      dark: {
        none: 'none',
        xsmall: '0px 2px 2px rgba(255, 255, 255, 0.10)',
        small: '0px 4px 4px rgba(255, 255, 255, 0.10)',
        medium: '0px 6px 8px rgba(255, 255, 255, 0.10)',
        large: '0px 8px 16px rgba(255, 255, 255, 0.10)',
        xlarge: '0px 12px 24px rgba(255, 255, 255, 0.10)',
      },
    },
    font: {
      family: 'Roboto',
      size: '15x',
      height: '1px',
    },
  },
}

class App extends React.Component {
  render() {
    return (
      <Grommet theme={theme} full>
        <Box
          overflow={{
            vertical: 'hidden',
          }}
          fill
        >
          <Stack anchor="bottom-right" fill>
            <Box fill background={this.props.darkMode ? '#2f3852' : ''}>
              <Box
                direction="row"
                flex
                overflow={{
                  horizontal: 'hidden',
                }}
              >
                <SideBar></SideBar>
                <Assignment></Assignment>
                <Detail></Detail>
              </Box>
            </Box>

            <Box margin="medium">
              <Box
                pad="small"
                elevation="medium"
                background={this.props.darkMode ? '#4D4B5C' : 'brand'}
                round
              >
                <CircleQuestion size="medium"></CircleQuestion>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Grommet>
    )
  }
}

const mapStateToProps = state => {
  console.log(state.darkMode)

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

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    {
      collection: 'Users',
      doc: !props.auth.uid ? 'ddadda' : props.auth.uid,
      subcollections: [{ collection: 'Courses' }],
      storeAs: 'Courses',
      orderBy: [['name', 'asc']],
    },
    {
      collection: 'Users',
      doc: !props.auth.uid ? 'ddadda' : props.auth.uid,
      subcollections: [{ collection: 'Assignments' }],
      storeAs: 'Assignments',
      orderBy: [['dueDate', 'desc'], ['name', 'desc']],
    },
  ])
)(App)
