const initialState  = {
  products: [],
  contractors: [],
}



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PRODUCTS':
      state = {
        ...state,
        products: action.payload
      }
      break;
    case 'ADD_PRODUCT':
      state = {
        ...state,
        products: [...state.products, action.payload]
      }
      break;
    case 'DELETE_PRODUCT':
      const productList = [];
      state.products.forEach( (item) => {
        if(item._id != action.payload){
          productList.push(item);
        }
      })
      state = {
        ...state,
        products: productList
      }
      break;
    case 'UPDATE_CONTRACTORS':
        state = {
          ...state,
          contractors: action.payload
        }
        break;
    case 'ADD_CONTRACTOR':
        state = {
          ...state,
          contractors: [...state.contractors, action.payload]
        }
        break;
    case 'LOG_OUT':
      state = initialState
      break;
  }
  return state
}

export default reducer
