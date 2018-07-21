import React from 'react';
import ReactDOM from 'react-dom';
// redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from "./reducer";
// saga
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

import App from './App';

import registerServiceWorker from './registerServiceWorker';

const sagaMiddleware = createSagaMiddleware(rootSaga);
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
