import React from 'react'
import Typeform from 'react-typeform'

class TypeFormComponent extends React.Component {
  submit() {
    // Call your submit function here
  }

  render() {
    return (
      <Typeform onSubmit={this.submit} showReviewView={false}>
        <p>asdjkadj</p>
        <p>jadhjahjhd</p>
      </Typeform>
    )
  }
}

export default TypeFormComponent
