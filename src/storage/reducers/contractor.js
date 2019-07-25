const initialState  = {
  sales: [],
  payments: [],
}



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_CONTRACTOR_SALES":
      state = {
        ...state,
        sales: action.payload
      }
      break;
    case "ADD_NEW_SALE":
      state = {
        ...state,
        sales: [...state.sales, action.payload]
      }
      break;
    case "UPDATE_CONTRACTOR_PAYMENTS":
      state = {
        ...state,
        payments: action.payload
      }
      break;
    case "ADD_NEW_PAYMENT":
      state = {
        ...state,
        payments: [...state.payments, action.payload]
      }
      break;
    case 'LOG_OUT':
      state = initialState
      break;
  }
  return state
}

export default reducer
