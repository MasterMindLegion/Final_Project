import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App/Components/App.jsx';
 
ReactDOM.render(
  <BrowserRouter>
   <App />
  </BrowserRouter>,
document.getElementById('app')
);