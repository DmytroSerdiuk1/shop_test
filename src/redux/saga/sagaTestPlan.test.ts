import * as matchers from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';
import {fetchPostsSaga, getData as apiGetApi} from './getProduct';
import { getDataSeccuss, getDataFailed } from '../actionCreators/getProducts';
import { throwError } from 'redux-saga-test-plan/providers';
const fakeData = [
    {
        img: "img",
        asin: "string",
        price: "string",
        bsr_category: "string",
        link: "string",
        name: "string"
    }
]

describe('get Product', () => {
    it('Get product seccuss', () => {
        return expectSaga(fetchPostsSaga)
            .provide([[matchers.call.fn(apiGetApi), {data: {product: fakeData}}]])
            .put(getDataSeccuss({product: fakeData}))
            .run()
    });
    it('Throws error', () => {
        return expectSaga(fetchPostsSaga)
            .provide([[matchers.call.fn(apiGetApi), throwError()]])
            .put(getDataFailed())
            .run()
    }); 
});