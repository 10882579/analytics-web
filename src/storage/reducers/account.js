const initialState  = {
  loggedIn: false
}



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_ACCOUNT":
      state = {
        ...state,
        ...action.payload
      }
      break;
    case 'LOG_OUT':
      state = initialState
      break;
  }
  return state
}

export default reducer
