import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import App from './App/Components/App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { all } from 'redux-saga/effects'
import { loginReducer } from './App/Components/store/login/loginReducer.js';
import { charityRegisterReducer } from './App/Components/store/charityRegister/charityRegisterReducer.js';
import createSagaMiddleware from 'redux-saga';
import userSagas from './App/Components/sagas/userSagas.js';
// combining two reducers into a single reducer
const rootReducer = combineReducers({
  loginReducer: loginReducer,
  charityRegisterReducer: charityRegisterReducer
})

// Store


function* rootSaga() {
  yield all([userSagas])
}

const sagaMiddleware = createSagaMiddleware([rootSaga]);

const makeStore = (initialState) => {
  const store = createStore(
    
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
const store = makeStore({});
ReactDOM.render(
  <Provider store={store}><App /> </Provider>, document.getElementById('app')
);
