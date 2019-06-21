import React, { Component } from "react";
import { connect } from "react-redux";
import { Edit } from "grommet-icons";

import { Box, Button, Grommet, TextInput } from "grommet";
import { createProject } from "../../store/actions/projectActions";
import firebase from 'firebase/app';

export class AddAssignment extends Component {
  
  constructor(props) {
    super(props);
  }

  state = {
    name: "New Course",
    course: "Dummy COURSE 110",
    dueDate: firebase.firestore.Timestamp.fromDate(new Date())
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createProject(this.state, this.props.auth.uid);
  };
  render() {
    const { name } = this.state.name;

    return (
      <Box direction="row" width="350px" flex="false">
        <TextInput
          placeholder="type here"
          // type="search"
          value={name}
          onChange={event => this.setState({ name: event.target.value })}
        />
        <Button
          icon={<Edit/>}
          // label="Edit"
          onClick={this.handleSubmit}
        />
     </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}


const mapDispatchToProps = dispatch => {
  return {
    createProject: (project,uid) => dispatch(createProject(project,uid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAssignment);
