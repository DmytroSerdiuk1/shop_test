import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType, Action } from '../actionTypes';

export const getData = () =>  async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.GET_POST_PRODUCTS_PENDING
        });

        try {
            const { data } = await axios.get(`http://localhost:3001/product`);

            dispatch({
                type: ActionType.GET_POST_PRODUCTS_SUCCESS,
                payload: data  
            });

        } catch(err) {
            dispatch({
                type: ActionType.GET_POST_PRODUCTS_FAIL,
            });
        }
    }

