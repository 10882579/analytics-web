const initialState  = {
  products: []
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
    case 'LOG_OUT':
      state = initialState
      break;
  }
  return state
}

export default reducer
