export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    console.log('The button Works')

    firebase
      .auth()
      .signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .then(() => {
        console.log('The Dispatch Works')

        dispatch({ type: 'LOGIN_SUCCESS' })
      })
      .catch(err => {
        dispatch({ type: 'LOGIN_ERROR', err })
      })
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' })
      })
  }
}
