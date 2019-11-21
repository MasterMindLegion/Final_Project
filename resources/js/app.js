import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import App from './App/Components/App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

import {reducer} from './App/Components/store/login/reducer.js';

// Store
export const store = createStore(reducer);
console.log("parent component react", store.getState())

ReactDOM.render(
 
  <Provider store={store}><App /> </Provider> , document.getElementById('app')
);
