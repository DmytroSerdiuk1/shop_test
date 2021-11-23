import { IProduct } from '../reducers/index';

export enum ActionType {
    GET_POST_PRODUCTS_PENDING = 'GET_POST_PRODUCTS_PENDING',
    GET_POST_PRODUCTS_SUCCESS = 'GET_POST_PRODUCTS_SUCCESS',
    GET_POST_PRODUCTS_FAIL = 'GET_POST_PRODUCTS_FAIL',
    SET_FILTER_DATA = 'SET_FILTER_DATA'
}

interface actionPending {
    type: ActionType.GET_POST_PRODUCTS_PENDING;
}

interface actionSuccess {
    type: ActionType.GET_POST_PRODUCTS_SUCCESS;
    payload: IProduct[];
}

interface actionFail {
    type: ActionType.GET_POST_PRODUCTS_FAIL;
}

interface setFilterData {
    type: ActionType.SET_FILTER_DATA;
}

export type Action = actionPending | actionSuccess | actionFail | setFilterData;