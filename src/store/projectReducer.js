const initState = [
    { id: 1, name: "First essay draft", course: "ENTS 110.00" },
    { id: 5, name: "Code Review in Class", course: "CS 210.00" }
  ]
;



const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT':
      return [
        ...state,
        {
          id: 99,
          name: action.project.name,
          course: action.project.course
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    default:
      return state
  }
}

export default projectReducer
