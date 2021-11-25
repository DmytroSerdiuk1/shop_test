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
    error: string | null;
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
                ...state,
                loading: true,
            } 
        case ActionType.GET_POST_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
            }
        case ActionType.GET_POST_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Something wrong!'
            }
        default: 
            return state;
    }
}

export default productReducer;