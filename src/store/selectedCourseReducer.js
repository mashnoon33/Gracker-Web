const initState = null



const selectedCourse = (state = initState, action) => {
    console.log("action")

   console.log(action)
    switch (action.type) {
        case 'SELECT':
            return action.course;
        case 'DESELECT':
            return null
        default:
            return state
    }
}

export default selectedCourse
