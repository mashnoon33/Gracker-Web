export const select_course = course => {
  return dispatch => {
    if (null) {
      dispatch({ type: 'DESELECT', course })
    } else {
      dispatch({ type: 'SELECT', course })
    }
  }
}
