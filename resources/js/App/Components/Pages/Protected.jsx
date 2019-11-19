import React, { useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import CharityRegister from './../Auth/CharityRegister.jsx';

  const PrivateRoute = (props, { /*component: CharityRegister,*/ ...rest }) => (
   
     <Route {...rest} render={() => (
       console.log("'to be sure'",props.loginSuccess),
       props.loginSuccess === true
         ? <CharityRegister {...props} />
         : <Redirect to='/app/login' />
    )} />
  ) 
  const mapStateToProps = state => {
    return {
      loginStatus: state.loginStatus,
      loginSuccess: state.loginSuccess,
    };
  }
  export default connect(mapStateToProps)(PrivateRoute);

