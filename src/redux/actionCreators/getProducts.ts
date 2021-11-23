import { AnyAction } from 'redux';
import { ActionType } from '../actionTypes';
import { IProduct } from '../reducers';

export const getData = (): AnyAction => ({
    type: ActionType.GET_POST_PRODUCTS_PENDING
});

export const getDataSeccuss = (items: IProduct): AnyAction => ({
    type: ActionType.GET_POST_PRODUCTS_SUCCESS,
    payload: items
})

export const getDataFailed = (): AnyAction => ({
    type: ActionType.GET_POST_PRODUCTS_SUCCESS,
})
