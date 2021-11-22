let store = {
    product: [],
    filterText: ""
}

export default  function reducer(state = store, action) {
    switch(action.type){
        case "IS_SET_PRODUCT":
          return {
                ...state,
                product: [...action.payload.product]
            }
        case "FILTER":
            return {
                ...state,
                filterText: action.payload.text
            }
        default: 
            return state
    }
}