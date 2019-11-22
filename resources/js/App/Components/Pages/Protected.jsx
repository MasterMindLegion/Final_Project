import React, { useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect,  Link } from "react-router-dom";
import CharityRegister from './../Auth/CharityRegister.jsx';

  const PrivateRoute = (props, { /*component: CharityRegister,*/ ...rest }) => (
   
     <Route {...rest} render={() => (
       console.log("'to be sure'",props.loginSuccess),
       props.loginSuccess === true
         ? <CharityRegister {...props} />
         //: <Redirect to='/app/login' />
         : <h1>You have to be logged in to acces the path 
            <Link to="/"> Lets get you there</Link>
            </h1>
    )} />
  ) 
  const mapStateToProps = state => {
    return {
      loginSuccess: state.loginReducer.loginSuccess,
    };
  }
  
  export default connect(mapStateToProps)(PrivateRoute);

