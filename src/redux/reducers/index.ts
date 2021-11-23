import { Action, ActionType } from '../actionTypes/index';

export interface IProduct {
    img: string,
    asin: string,
    price: string,
    bsr_category: string,
    link: string,
    name: string
}

interface IState {
    products: IProduct[];
    loading: boolean;
}

const initialState = {
    products: [],
    loading: false, 
    error: null 
}

const productReducer = (state: IState = initialState, action: Action):IState => {
    switch(action.type) {
        case ActionType.GET_POST_PRODUCTS_PENDING:
            return {
                loading: true,
                products: [],
            } 
        case ActionType.GET_POST_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            }
        case ActionType.GET_POST_PRODUCTS_FAIL:
            return {
                loading: false,
                products: []
            }
        default: 
            return state;
    }
}

export default productReducer;