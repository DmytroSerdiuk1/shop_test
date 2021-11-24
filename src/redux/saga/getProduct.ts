import axios, { AxiosResponse } from 'axios';
import { call, put, takeLatest } from "redux-saga/effects";
import { getDataFailed, getDataSeccuss } from '../actionCreators/getProducts';
import { ActionType } from '../actionTypes';
import { IProduct } from '../reducers';

export const getData = async (): Promise<IProduct[]> => {
    return await axios.get(`http://localhost:3001/product`);
}
  
export function* fetchPostsSaga() {
  try {
    const response = (yield call(getData)) as AxiosResponse<IProduct[]>;
    yield put(
      getDataSeccuss(response.data)
    );
  } catch (e) {
    yield put(
      getDataFailed()
    );
  }
}
  
export function* watchFetchPostsSaga() {
  yield takeLatest(ActionType.GET_POST_PRODUCTS_PENDING, fetchPostsSaga);
}
  
  