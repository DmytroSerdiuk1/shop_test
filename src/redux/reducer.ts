interface State {
    product: any
}
interface Action {
    type: string,
    payload: any
}

let store = {
    product: []
}

export default  function reducer(state: State = store, action: Action): State {
    switch(action.type){
        case "IS_SET_PRODUCT":
          return {
                ...state,
                product: [...action.payload.product]
            }
        default: 
            return state
    }
}