const initialState  = {
  sales: [],
}



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_CONTRACTOR_SALES":
      state = {
        sales: action.payload
      }
      break;
    case 'LOG_OUT':
      state = initialState
      break;
  }
  return state
}

export default reducer
