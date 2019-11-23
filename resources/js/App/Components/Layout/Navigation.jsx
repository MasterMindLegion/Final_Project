import React from 'react';
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ModalNavigationLogin from './Modals/ModalNavigationLogin.jsx';
import ModalNavigationRegister from './Modals/ModalNavigationRegister.jsx';
import Logout from './../Auth/Logout.jsx';
import Cart from './Main/Cart/Cart.jsx';
import { connect } from 'react-redux';


 class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
 
  render() {
    console.log("[NAVIGATION] cart props", this.props.items);
    return (
      <>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">E-Market</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                {
                  this.props.loginSuccess === true 
                  ? <Logout />
                  : <ModalNavigationLogin />
                }  
              </NavItem>
              <NavItem>
                <ModalNavigationRegister />
              </NavItem>
              {this.props.showRegisterLink && <NavItem >
                <Link to="/app/registerCharity"> registerCharity</Link>
              </ NavItem >}
              <NavItem>
                <Link to='/app/cart'>  Cart </ Link>     
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </>
    )
  }
}
//==========
// REDUX
//==========
// What state be used
const mapStateToProps = state => {
  return {
    loginSuccess: state.loginReducer.loginSuccess,
    showRegisterLink: state.loginReducer.showRegisterLink
  };
}
// What Actions be used
const mapDispatchToProps = dispatch => {
  return {
    registerCharityFalse : () => dispatch({type: "CHARITY_FALSE"}),
    registerCharityTrue : () => dispatch({type: "CHARITY_TRUE"}),
 }
}
//what is connect?
export default connect(mapStateToProps, mapDispatchToProps )(Navigation);