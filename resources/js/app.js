import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App/Components/App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter>
  {/* basename={} */}
   <App />
  </BrowserRouter>,
document.getElementById('app')
);
