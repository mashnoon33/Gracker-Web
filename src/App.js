import React from "react";
import {
  Box,
  Button,
  Grommet,
  Text,     
  Keyboard,
  Calendar,
  DropButton,
  Stack
} from "grommet";
import { Add, CatalogOption, Alarm, CircleQuestion } from "grommet-icons";
import '@vaadin/vaadin-date-picker';
// import { Notification } from "grommet-icons";
// import { logout } from "./helpers/auth";
// import { db, firebaseAuth } from "./config/firebase";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
// import Modal from "react-redux-modal-flex";
// import Auth from "./components/auth/Auth";
// import TypeFormComponent from "./components/adder/form";

import firebase from 'firebase/app';
import moment from "moment";
import SelectSearch from "react-select-search";
import LoginModal from "./components/auth/loginModal"
import AddAssignment from "./components/assignments/AddAssignment";
import { select_course } from "./store/actions/selectedCourseActions"
import { select_ass } from "./store/actions/selectedAssActions"


// const appTokenKey = "appToken"; // also duplicated in Login.js

const theme = {
  global: {
    colors: {
      // brand: '#4D4B5C'

    },

    elevation: {
      "light": {
        "none": "none",
        "xsmall": "0px 1px 2px rgba(0, 0, 0, 0.20)",
        "small": "0px 2px 4px rgba(0, 0, 0, 0.20)",
        "medium": "0px 4px 8px rgba(0, 0, 0, 0.20)",
        "large": "0px 8px 16px rgba(0, 0, 0, 0.20)",
        "xlarge": "0px 12px 24px rgba(0, 0, 0, 0.20)"
      },
      "dark": {
        "none": "none",
        "xsmall": "0px 2px 2px rgba(255, 255, 255, 0.10)",
        "small": "0px 4px 4px rgba(255, 255, 255, 0.10)",
        "medium": "0px 6px 8px rgba(255, 255, 255, 0.10)",
        "large": "0px 8px 16px rgba(255, 255, 255, 0.10)",
        "xlarge": "0px 12px 24px rgba(255, 255, 255, 0.10)"
      }
    },
    font: {
      family: "Roboto",
      size: "15x",
      height: "1px"
    },
   
  }
};




class App extends React.Component {
  
  constructor(props) {

    super(props);
    this.state = {
      // selected_adder: { name: "fuck you" },
      selected_course: null,
      selected_ass: null,

    };

    
  }
  
  

  

  AssCard = ({ asses, courses, tf }) => (
    
    <Keyboard
      onDown={() => {
        if (this.props.selected_ass !== null) {
          this.props.select_ass(asses[asses.indexOf(this.props.selected_ass) + 1 < asses.length ? asses.indexOf(this.props.selected_ass) + 1 : 0])
        }
      }}
      onUp={() => {
        if (this.props.selected_ass !== null) {
          this.props.select_ass(asses[asses.indexOf(this.props.selected_ass) > 0 ? asses.indexOf(this.props.selected_ass) - 1 : asses.length - 1])
        }
      }}
    >

    <Box
      // elevation="small"
      // round="small"
      flex="false"
      fill='horizontal'

      // background="white"
      pad={{ left: "00px", right: "00px", top: "10px", bottom: "10px" }}
    >
      {asses!== undefined &&
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
                pad={{ left: "10px", right: "10px" }}

                height="xxsmall"
                // width="350px"
                fill='horizontal'
                background={this.props.selected_ass === null ? 'transparent' : this.props.selected_ass.id === ass.id ? this.props.darkMode ? '#4D4B5C' :  'brand' : 'transparent'}
                elevation={this.props.selected_ass === null ? '' : this.props.selected_ass.id === ass.id ? 'medium' : ''}


                align="center"
                flex="false"
                justify="start"
                direction="row"

              >

                {/* {
                  this.props.selected_ass === null ? null : this.props.selected_ass.id === ass.id ? <Box width='3px' elevation='small' fill='vertical'  background='light-3'> </Box> :null
                } */}

                {/* <CheckBox
                  checked={ass.done}
                // label="interested?"
                // onChange={(event) => setChecked(event.target.ch   ecked)}
                /> */}
                <Box
                  width='38px'
                  height='38px'
                  align="center"
                  justify='center'
                  direction='column'
                  // background='red'
                >

                  <Text color= {this.props.darkMode ? 'light-1' :  '' }size='small'
                    
                  >                      {moment(ass.dueDate.toDate()).format('MMM')}

                    </Text>


                  <Text color= {this.props.darkMode ? 'light-1' :  '' }size='medium' weight='bold'   >                                           {ass.dueDate.toDate().getDate()}


                    </Text>
                  

                    

                </Box>

              

                <Box
                  direction="column"
                  margin={{ left: "10px", top: "0px", bottom: "0px" }}
                >
                  <Box direction='row' justify="start"
                    align='center' >
                    
                    {moment(ass.dueDate.toDate()).diff(moment(), 'minutes') < 0 ? <Box
                      
                      // width='xxsmall'
                      background={this.props.darkMode ? 'neutral-4' : 'status-error'}
                      round='xxsmall'
                      height='12px'
                      width='20px'
                      margin={{ right: "5px", vertical: "0px" }}
                      justify="center"
                      align='center'
                      pad={{ left: "3px", right: "3px", vertical: "2px" }}


                    >
                      <Text color= {this.props.darkMode ? 'light-1' :  '' }size='xsmall' weight='bold' color='white'>

                                                </Text>
                    </Box> : null
                    }

                    <Text color= {this.props.darkMode ? 'light-1' :  '' }weight="bold" size="12">
                      {ass.name}
                    </Text>

                   
                </Box>


                  <Text color= {this.props.darkMode ? 'light-1' :  '' }size="9">
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
    </Keyboard>
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
      // Dashboard
        focusIndicator={false}
        hoverIndicator={true}

        onClick={() => {
          // this.setState({
          //   selected_course: null,
          //   selected_ass: null
          // });

          this.props.select_course(null)
          this.props.select_ass(null)



        }}
      >
        <Box
          height="xxsmall"
          width="400px"
          background={this.props.selected_course === null ? this.props.darkMode ? '#4D4B5C' :  'brand' : "transparent"}
          elevation={this.props.selected_course === null ? 'medium' : ''}
          align="start"
          flex="false"
          justify="center"
        >
          <Box
            direction="column"
          margin={{ left: "20px", top: "0px", bottom: "0px" }}
          >
            <Text color= {this.props.darkMode ? 'light-1' :  '' }weight="bold" size="12">
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
                // this.setState({
                //   selected_course: course,
                //                     selected_ass: null
                // });
                this.props.select_course(course)
                this.props.select_ass(null)
                
              }}
            >
              <Box
                height="xxsmall"
                width="400px"
                background={this.props.selected_course === null ? 'transparent' :  this.props.selected_course.id === course.id? this.props.darkMode ? '#4D4B5C' :  'brand': 'transparent' }
                elevation={this.props.selected_course === null ? '' : this.props.selected_course.id === course.id ? 'medium' : ''}

                align="start"
                flex="false"
                justify="center"
              >
                <Box
                  direction="column"
                  margin={{ left: "20px", top: "0px", bottom: "0px" }}
                >
                  <Text color= {this.props.darkMode ? 'light-1' :  '' }weight="bold" size="12">
                    {course.name}
                  </Text>


                 
                </Box>
              </Box>
            </Button>
          );
        })}
    </Box>
  );

  


  render() {


    const { projects, auth, courses, darkMode } = this.props;
    // const { options, value } = this.state;

    return (
      <Grommet theme={theme} full>
        <Box overflow={{
          vertical: "hidden"
        }} fill>
        <Stack anchor='bottom-right' fill>
        <Box fill background={this.props.darkMode ? '#2f3852' : ""}> 
          <Box
            direction="row"
            flex
            overflow={{
              horizontal: "hidden"
            }}
          >
            <Box
              width="350px"
              background={this.props.darkMode ? '#20273C'  : "light-2"}
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
                    {/* {
                      courses === undefined || courses.length === 0 ? null :
                        <this.Adder courses={courses[0].Courses ? courses[0].Courses : courses} />
                    } */}


          </Box>
              </Box>
              {/* <Auth></Auth> */}
              {/* <Adder></Adder> */}

              {/* <Modal></Modal> */}

              {/* <AddAssignment></AddAssignment> */}
              <Box background='status-error' fill='horizontal' height='xsmall'></Box>



            

              
              {/* 
              <RaisedButton
                backgroundColor="#a4c639"
                labelColor="#ffffff"
                label="Sign Out"
                onClick={this.handleLogout}
              /> */}
            </Box>

            <Box direction='column'>
              <Box flex={false} tag="header" pad="small" elevation='xsmall'
                background={this.props.darkMode ? '#29324D' : "light-1"}

              >
                <Box pad={{ left: "small" }}
                >
                  <h3>
                    Assignments
                </h3>
                </Box>
              </Box>
              <Box
                background={this.props.darkMode ? '#29324D' : "light-1"}
                width="medium"
                elevation="small"
                fill='vertical'
                // align="center"
                // gap="medium"
                // justify="center"
                direction="column"
                overflow="auto"
              >



                {
                  this.props.selected_course == null ? <this.AssCard courses={courses} asses={projects} />
                    : <this.AssCard courses={courses.filter((course) => {
                      return course.id === this.props.selected_course.id;
                    })} asses={projects.filter((ass) => {
                      return ass.course === this.props.selected_course.id;
                    })} />
                }
              </Box>
            </Box>
            
            
                {/* Details */}
            <Box align="start" justify="start" 
              // pad='medium'
              direction='column'

              width='medium'

              // flex={ this.props.selected_ass !== null ? 'full': 'shrink'}
            >
              {this.props.selected_ass !== null ?

                <Box direction='column' >
                  <Box flex={false} tag="header" pad="small" fill='horizontal' 

                  >
                   
                  </Box>
                </Box> : null}
              
              {this.props.selected_ass !== null ?
                <Box align="start" justify="start" gap='xsmall' margin={{ left: "medium", top: "50px", bottom: "0px" }}>

                  <Text size='xxlarge' weight='bold '>
                    {this.props.selected_ass.name}
                    </Text>


                  <Box direction='row' justify="start"
                    align='center' >

                    {moment(this.props.selected_ass.dueDate.toDate()).diff(moment(), 'minutes') < 0 ? <Box

                      // width='xxsmall'
                      background={this.props.darkMode ? 'neutral-4' : 'status-error'}
                      round='xxsmall'
                      height='20px'
                      // width='20px'
                      margin={{ right: "5px", bottom: "10px" }}
                      justify="center"
                      align='center'
                      pad={{ left: "3px", right: "3px", vertical: "2px" }}


                    >
                      <Text color={this.props.darkMode ? 'light-1' : ''} size='small' weight='bold' color='white'>
                        Late by  {moment().diff(moment(this.props.selected_ass.dueDate.toDate()), 'days')} days
                      </Text>
                    </Box> : null
                    }
</Box>
                 
{/* 
                  <Button
                    plain={true}
                    hoverIndicator={true}
                    icon={<Alarm size='medium' />}
                    margin='0px'
                    label=

                    {<Text color= {this.props.darkMode ? 'light-1' :  '' }size='medium'>
                      {moment(this.props.selected_ass.dueDate.toDate()).format('MMMM Do YYYY')}
                    </Text>}

                    onClick={() => {
                    

                    }}

                  /> */}

                  <DropButton
                    dropContent={
                      <Box background={this.props.darkMode ? '#20273C' : "light-2"} >
                        <Calendar size='medium' date={this.props.selected_ass.dueDate.toDate()
                        }
                        // onSelect={this.props.selected_ass.dueDate = firebase.firestore.Timestamp.fromDate(new Date())}

                        />
                    </Box> 
                    
                    }
                  >
                    <Box direction="row" gap="small">
                      <Alarm   />

                      <Text>
                        {this.props.selected_ass.dueDate.toDate() ? moment(this.props.selected_ass.dueDate.toDate()).format('MMMM Do YYYY') : "Select date"}
                      </Text>
                    </Box>
                  </DropButton>
            
                  <Button
                    plain={true}
                    hoverIndicator={true}
                    icon={<CatalogOption size='medium' />}
                    margin='0px'
                    label={<Text color= {this.props.darkMode ? 'light-1' :  '' }size='medium'>
                      {courses
                        ? courses.find(obj => obj.id === this.props.selected_ass.course)
                          ? courses.find(obj => obj.id === this.props.selected_ass.course).name
                          : ""
                        : ""}
                    </Text>}
                    
                    onClick={() => {
                      this.props.select_course(courses.find(obj => obj.id === this.props.selected_ass.course))



                    }}
                    
                  />





</Box> :null
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
            
            <Box margin='medium'>

              <Box pad='small' elevation='medium' background={this.props.darkMode ? '#4D4B5C' : "brand"} round>
                <CircleQuestion size='medium'></CircleQuestion>

              </Box>
           </Box>

          </Stack>
          </Box>
      </Grommet>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.darkMode)


  if (state.firestore.data === undefined || state.firestore.data.length === 0)  {
    return {
      darkMode: state.darkMode,
      auth: state.firebase.auth,
      projects: state.projects,
      selected_course: state.selectedCourse,
      selected_ass: state.selectedAss


    };
  }

  return {
    darkMode:state.darkMode,
    auth: state.firebase.auth,
    projects: state.firestore.ordered['Assignments'],
    courses: state.firestore.ordered['Courses'],
    selected_course: state.selectedCourse,
        selected_ass: state.selectedAss


  };
};

const mapDispatchToProps = dispatch => {
  return {
    select_ass: (ass) => dispatch(select_ass(ass)),
    select_course: (course) => dispatch(select_course(course)),
  };
};



// export default connect(mapStateToProps)(App)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  // connect(({ firebase: { auth } }) => ({ auth })),
  // spinnerWhileLoading(['projects']),
  firestoreConnect(props => [
    {
      collection: "Users",
      doc: !props.auth.uid ? "ddadda" : props.auth.uid,
      subcollections: [{ collection: "Courses" }],
      storeAs: 'Courses',
      orderBy: [
        ['name', 'asc'],
      ]
    },
    {
      collection: "Users",
      doc: !props.auth.uid ? "ddadda" : props.auth.uid,
      subcollections: [{ collection: "Assignments" }],
      storeAs: 'Assignments',
      orderBy: [
        ['dueDate', 'desc'],
        ['name', 'desc']
      ],

    }
   
  ]),
  firestoreConnect(props => [
    
  ])
  // renderIfEmpty(['auth'], <p>Nothing Found</p>)
)(App);
