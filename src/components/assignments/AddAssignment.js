import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Next } from 'grommet-icons'

import { Box, Button, Form, FormField, TextInput } from 'grommet'
import { createProject } from '../../store/actions/projectActions'
import firebase from 'firebase/app'

export class AddAssignment extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    name: 'New Course',
    course: 'Dummy COURSE 110',
    dueDate: firebase.firestore.Timestamp.fromDate(new Date()),
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    console.log('Ass submit')
  }
  render() {
    const { name } = this.state.name

    return (
      <Box direction="row" width="400" flex="false">
        <Form>
          <Box direction="row">
            <TextInput
              color="white"
              required="true"
              // width='large'
              width="large"
              placeholder="type here"
              // type="search"
              value={name}
              onChange={event => this.setState({ name: event.target.value })}
            />
            <Button
              icon={<Next />}
              type="submit"
              // label="Edit"
              onClick={this.handleSubmit}
            />
          </Box>
        </Form>
      </Box>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: (project, uid) => dispatch(createProject(project, uid)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAssignment)
