import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText,  } from 'reactstrap';
 
 class Register extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
      name : '',
      email: '',
      password: '',
      c_password: '',
      registerErrors: [],
    }
  }
    handleNameChange = (event) => {
      this.setState({
        name: event.target.value
      });
    }
    handleEmailChange = (event) => {
      this.setState({
          email: event.target.value
      });
    }
    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    }
    handlePasswordChangeConformation = (event) => {
      this.setState({
        c_password: event.target.value
    });
    } 
  handleFormSubmit = (event) => {
    event.preventDefault();
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            c_password: this.state.c_password
        })
    })
    .then(response => response.json())
    .then(data => {
      if(data.success.token !== null && this.props.modalStatus) { 
        this.props.childRegisterStatus();
      }
    })
    .catch((e) => {
      this.state.registerErrors = e
    })
}
    render() {
        return (
          <>
           <h1>Please Register</h1>
           <Form action="" method="post" onSubmit={this.handleFormSubmit}>
             <FormGroup>
              <Label htmlFor="register_name">Name</Label>
               <Input type="text" name="register_name" value={this.state.name}
               onChange={this.handleNameChange} 
               placeholder="Enter Your Name" id="register_name"/>
             </FormGroup>
             <FormGroup>
             <Label htmlFor="register_name">Email</Label>
             <Input type="email" name="register_email" value={this.state.email} onChange={this.handleEmailChange} placeholder="Enter Your Email" id="register_email"/>
             </FormGroup>
             <FormGroup>
             <Label htmlFor="register_password">Password</Label>
             <Input type="password" name="register_password" value={this.password} onChange={this.handlePasswordChange} placeholder="Enter Your Password" id="register_password"/>
             </FormGroup>
             <FormGroup>
             <Label htmlFor="register_password_confirm">Confirm Password</Label>
             <Input type="password" name="register_password_confirmation" value={this.passwordConformation} onChange={this.handlePasswordChangeConformation}  placeholder="Confirm Your Password" id="register_password_confirmation"/>
             </FormGroup>        
              <Button type="submit" value="Submit" color="danger">Submit</Button>       
           </Form>
          </>
 
        )
    }
}
export default Register