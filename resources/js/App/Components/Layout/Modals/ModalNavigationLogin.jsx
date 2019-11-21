import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Login from './../../Auth/Login.jsx';
import { connect } from 'react-redux';

const ModalNavigationLogin = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [loginValue, setLoginValue] = useState('Log In')

  const toggle = () => setModal(!modal);

  // Close Modal
  const parentLoginStatus = () =>  { 
    console.log("parentLoginStatus - closing modal");
    setModal(!modal);
  }
  
  // Get login value from Login
  const parentLoginValue = (value) =>  { 
    console.log("props.loginStatus", props.loginStatus);
    console.log("props.loginStatusFromChild", props.loginStatusFromChild);
    setLoginValue(value);
  }
 
  return (
    <div>
  <Button color="danger" onClick={toggle}>{buttonLabel} {props.loginStatus}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Login {...props} modalStatus={modal} 
          childLoginStatus = { parentLoginStatus } 
          childLoginValue = {parentLoginValue} />
        </ModalBody>
      </Modal>
    </div>
  );
}
//==========
// REDUX
//==========
// What state be used
const mapStateToProps = state => {
  return {
    loginStatus: state.loginStatus,
    loginSuccess: state.loginSuccess,
  };
}
export default connect(mapStateToProps)(ModalNavigationLogin);
