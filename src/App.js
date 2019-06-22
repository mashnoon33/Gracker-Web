import React from "react";
import {
  Box,
  Button,
  Grommet,
  Text,
  FormField,
  TextInput,
  Select
} from "grommet";
import { Add } from "grommet-icons";

// import { Notification } from "grommet-icons";
// import { logout } from "./helpers/auth";
// import { db, firebaseAuth } from "./config/firebase";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
// import Modal from "react-redux-modal-flex";
// import Auth from "./components/auth/Auth";
// import TypeFormComponent from "./components/adder/form";

import {
  spinnerWhileLoading,
  renderIfEmpty
} from "./components/loadingSpinner";
import moment from "moment";
import SelectSearch from "react-select-search";
import LoginModal from "./components/auth/loginModal"
import AddAssignment from "./components/assignments/AddAssignment";

// const appTokenKey = "appToken"; // also duplicated in Login.js

const theme = {
  global: {
    colors: {
      //  brand: '#000000',
    },
    font: {
      family: "Roboto",
      size: "15x",
      height: "1px"
    }
  }
};




class App extends React.Component {
  state = {
    
    selected_adder: { name: "fuck you" },
    selected_course: null
    // doitOnce: false
  };

  CourseCard = ({ asses, courses, tf }) => (
    <Box
      elevation="small"
      round="small"
      flex="false"
      background="white"
      pad={{ left: "10px", right: "10px", top: "10px", bottom: "10px" }}
    >
      {asses!== undefined &&
        asses.map(ass => {
          return (
            <Button
              key={ass.id.toString()}
              onClick={() => {
                console.log("Test 1");
              }}
            >
              <Box
                height="xxsmall"
                width="350px"
                background="transparent"
                align="start"
                flex="false"
                justify="center"
              >
                <Box
                  direction="column"
                  margin={{ left: "10px", top: "0px", bottom: "0px" }}
                >
                  <Text weight="bold" size="12">
                    {ass.name}
                  </Text>

                  {/* <Text size="9">{moment(ass.dueDate.toDate()).format('MMMM Do YYYY')}</Text> */}

                  <Text size="9">
                    {courses
                      ? courses.find(obj => obj.id === ass.course)
                        ? courses.find(obj => obj.id === ass.course).name
                        : ""
                      : ""}
                  </Text>
                </Box>
              </Box>
            </Button>
          );
        })}
    </Box>
  );

  CourseList = ({  courses }) => (
    <Box
      // elevation="small"
      round="small"
      flex="false"
      fill='horizontal'
      // background="white"
      // pad={{ left: "20px", right: "0px", top: "10px", bottom: "0px" }}
    >

      <Button
        
        onClick={() => {
          console.log("Dashboard");
          this.state.selected_course = null;
          this.forceUpdate()

        }}
      >
        <Box
          height="xxsmall"
          width="400px"
          background={this.state.selected_course === null ? 'brand' : "transparent"}
          elevation={this.state.selected_course === null ? 'medium' : ''}
          align="start"
          flex="false"
          justify="center"
        >
          <Box
            direction="column"
          margin={{ left: "20px", top: "0px", bottom: "0px" }}
          >
            <Text weight="bold" size="12">
              Dashboard
            </Text>

            {/* <Text size="9">{moment(ass.dueDate.toDate()).format('MMMM Do YYYY')}</Text> */}


          </Box>
        </Box>
      </Button>
      
      {courses !== undefined &&
        courses.map(course => {
          return (
            <Button
              key={course.id.toString()}
              onClick={() => {
                this.state.selected_course = course;
                console.log(course.name);
                this.forceUpdate()

                
              }}
            >
              <Box
                height="xxsmall"
                width="400px"
                background={this.state.selected_course === null ? 'transparent' :  this.state.selected_course.id === course.id? 'brand': 'transparent' }
                elevation={this.state.selected_course === null ? '' : this.state.selected_course.id === course.id ? 'medium' : ''}

                align="start"
                flex="false"
                justify="center"
              >
                <Box
                  direction="column"
                  margin={{ left: "20px", top: "0px", bottom: "0px" }}
                >
                  <Text weight="bold" size="12">
                    {course.name}
                  </Text>

                  {/* <Text size="9">{moment(ass.dueDate.toDate()).format('MMMM Do YYYY')}</Text> */}

                 
                </Box>
              </Box>
            </Button>
          );
        })}
    </Box>
  );

   Adder = ({ courses }) => (
     <Box>
       
       <Box
         width="medium"
         align="center"
         justify='start'
         flex="false"
         gap="small"
         pad={{ left: "20px", right: "00px", top: "00px", bottom: "00px" }}

         background="white"
         elevation="small"
         wrap="true"
         direction="row"
         round={{ size: "small", corner: "top" }}
       >

        <Add></Add>
         <h4>New Assignments</h4>

         </Box>
       
      {/* <Box
        width="medium"
        align="center"
        flex="false"
        background="brand"
        elevation="xsmall"
        wrap="true"
        round={{ size: "small", corner: "top" }}
      >
        <div style={{ padding: "10px" }}>
          {courses &&
            courses.map(course => {
              return (
              
              this.state.selected_adder.name === course.name? (
                  <Button key={course.id} margin="xxsmall" primary color={this.state.selected_adder.name === course.name ? "accent-1" : "white"} label={course.name} onClick={() => {
                    this.state.selected_adder = course
                    this.forceUpdate()
                }} />
                ) : (
                    <Button key={course.id} margin="xxsmall" color={this.state.selected_adder.name === course.name ? "accent-1" : "white"} label={course.name} onClick={() => {
                      this.state.selected_adder = course

                      this.forceUpdate()

                    }} />
                  )
              );
            })}
        </div>
      </Box> */}

      <Box
        width="medium"
        align="center"
        flex="false"
        background="white"
        elevation="xsmall"
        wrap="true"
        round={{ size: "small", corner: "bottom" }}
      >
        <Box margin="small">
          <AddAssignment></AddAssignment>
        </Box>
      </Box>
    </Box>
  );

  render() {
    console.log(this.props.courses)


    const { projects, auth, courses } = this.props;
    // const { options, value } = this.state;

    return (
      <Grommet theme={theme} full>
        <Box fill>
          <Box
            direction="row"
            flex
            overflow={{
              horizontal: "hidden"
            }}
          >
            <Box
              width="400px"
              background="light-2"
              elevation="small"
              align="center"
              // gap="medium"
              // justify="center"
              direction="column"
              overflow="auto"
            >
              <Box fill>
                <Box flex={false} tag="header" pad="small">
                  <LoginModal></LoginModal>
                </Box>
                
                <Box flex overflow="auto">

                  {
                    courses === undefined || courses.length === 0 ? null :
                      <this.CourseList courses={courses[0].Courses ? courses[0].Courses : courses} />
                  }
                </Box>

                <Box flex={false}  pad="small">
                  {
                    courses === undefined || courses.length === 0 ? null :
                      <this.Adder courses={courses[0].Courses ? courses[0].Courses : courses} />
                  }


          </Box>
              </Box>
              {/* <Auth></Auth> */}
              {/* <Adder></Adder> */}

              {/* <Modal></Modal> */}

              {/* <AddAssignment></AddAssignment> */}



            

              
              {/* 
              <RaisedButton
                backgroundColor="#a4c639"
                labelColor="#ffffff"
                label="Sign Out"
                onClick={this.handleLogout}
              /> */}
            </Box>
            <Box flex align="center" justify="center">
              {
                this.state.selected_course == null ? <this.CourseCard courses={courses} asses={projects} />
                  : <this.CourseCard courses={courses.filter( (course) => {
                    return course.id === this.state.selected_course.id;
                  })} asses={projects.filter( (ass) => {
                    return ass.course === this.state.selected_course.id;
                  })} />
}
            </Box>
          </Box>

          {/* <Box
            direction="row"
            alignSelf="start"
            align="center"
            width="full"
            height="70px"
            justify="between"
            background="brand"
            pad={{ left: "medium", right: "small", vertical: "small" }}
            elevation="medium"
            style={{ zIndex: "1" }}
          >
            <TypeFormComponent></TypeFormComponent>
          </Box> */}
        </Box>
      </Grommet>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.firestore.data)
  console.log(state.firestore.ordered)


  if (state.firestore.data === undefined || state.firestore.data.length === 0)  {
    return {
      auth: state.firebase.auth,
      projects: state.projects
    };
  }

  return {
    auth: state.firebase.auth,
    projects: state.firestore.ordered['Assignments'],
    courses: state.firestore.ordered['Courses']
  };
};

// export default connect(mapStateToProps)(App)

export default compose(
  connect(mapStateToProps),
  // connect(({ firebase: { auth } }) => ({ auth })),
  // spinnerWhileLoading(['projects']),
  firestoreConnect(props => [
    {
      collection: "Users",
      doc: !props.auth.uid ? "ddadda" : props.auth.uid,
      subcollections: [{ collection: "Courses" }],
      storeAs: 'Courses'
    },
    {
      collection: "Users",
      doc: !props.auth.uid ? "ddadda" : props.auth.uid,
      subcollections: [{ collection: "Assignments" }],
      storeAs: 'Assignments'
    }
   
  ]),
  firestoreConnect(props => [
    
  ])
  // renderIfEmpty(['auth'], <p>Nothing Found</p>)
)(App);
