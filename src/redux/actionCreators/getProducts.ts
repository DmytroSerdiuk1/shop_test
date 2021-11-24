import { AnyAction } from 'redux';
import { ActionType } from '../actionTypes';

export const getData = (): AnyAction => ({
    type: ActionType.GET_POST_PRODUCTS_PENDING
});

export const getDataSeccuss = (items: any): AnyAction => ({
    type: ActionType.GET_POST_PRODUCTS_SUCCESS,
    payload: items
})

export const getDataFailed = (): AnyAction => ({
    type: ActionType.GET_POST_PRODUCTS_SUCCESS,
})
