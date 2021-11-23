import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/reducer';
import {QueryParamProvider} from 'use-query-params';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
     <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <App />
      </QueryParamProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
