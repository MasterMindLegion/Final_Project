import React from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'martiin.chalupa@gmail.com',
      password: '1',
      token: null,
      loginErrors: []
    }
  }
  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    })
  }
  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    })
  }

  componentDidMount() {
    this.props_token = window.localStorage.getItem('_token');
  }
  handleFormSubmit = (event) => {
    event.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          this.props_token = window.localStorage.getItem('_token');
          this.props.loginFunction();
          window.localStorage.setItem('_token', data.success.token);
        }
      })
      .catch(e => {
        this.setState({
          loginErrors: e
        })
      })
  }
  render() {
    return (
      <>
        <h1>Please Login Here</h1>
        <Form action="" method="post" onSubmit={this.handleFormSubmit} >
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="text" name="email"
              id="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </FormGroup>
          <Button type="submit" value="Login" color="danger"> [Login] Log In</Button>
        </Form>
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
    _token : state.loginReducer._token
  };
}
// What Actions be used
const mapDispatchToProps = dispatch => {
  return {
    loginFunction: () => {
      dispatch({ type: "login" })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);