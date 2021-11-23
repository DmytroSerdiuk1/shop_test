import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/combine';
import createSagaMiddleware from "redux-saga";
import getProductSaga from "./saga/getProduct"

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, {}, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(getProductSaga);

export default store;