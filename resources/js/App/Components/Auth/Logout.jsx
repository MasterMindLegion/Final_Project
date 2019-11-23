import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';

const Logout = (props) => {
 
 const handleLogout = () => {
      window.localStorage.clear();
     props.logoutFunction();
  }
  return(
    <Button type="submit" value="Login" color="secondary" onClick={handleLogout}> [Logout] Logout</Button>
  );
}

//==========
// REDUX
//==========
// What state be used
const mapStateToProps = state => {
  return {
    loginSuccess: state.loginReducer.loginSuccess,
  };
}
// What Actions be used
const mapDispatchToProps = dispatch => {
    return {
     logoutFunction : () => dispatch({type: "logout"}),
   }
 }
export default connect(mapStateToProps, mapDispatchToProps)(Logout);



