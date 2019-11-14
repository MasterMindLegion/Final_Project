 import React from 'react';
 import { Redirect } from 'react-router'
 import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
 export default class Login extends React.Component {
    constructor(props) {
        super(props);

       this.state = {
           email: '',
           password: '',
           loginSuccess: false,
           loginStatus: "Log in",
           token: null
       }

    }
    handleEmailChange = (event) => {
      this.setState ({
        email: event.target.value,
      })
    }
    handlePasswordChange = (event) => {
      this.setState ({
        password: event.target.value,
      })  
    }

    componentDidMount() {
      let token = window.localStorage.getItem('_token');
      if(token !== null) {
        this.setState({
          loginSuccess: true,
          loginStatus: "Logout",
        });
      }

      } 
    handleLogout = () => {
      if(this.state.loginStatus === "Logout") {
        window.localStorage.clear();
        this.setState({
          loginSuccess: false,
          loginStatus: "Log in",
          token: null,
        })
      }
    }
    handleFormSubmit = (event) => {
      event.preventDefault();
      fetch('/api/login', {
        method: 'POST',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
        })
    })
    .then(response => response.json())
    .then(data => {  
      console.log(data)
        if (data.status === 'success' && this.state.loginStatus === "Log in" && this.state.token === null) {
           window.localStorage.setItem('_token', data.success.token);
           this.setState({
             loginSuccess: true,
             loginStatus: "Logout",
             token: data.success.token,
           });
           if(data.role_id === 1) {
             console.log('im admin');
              <Redirect to='/app/' />   
           } else if(data.role_id === 2) {
            console.log('im normal user');
           }
          
              
        }
    })
    .catch(e => {
      console.log(e);
    })
   }
    render() {
        return (
          <>
           <h1>Please Login Here</h1>
            <Form action="" method="post" onSubmit={ this.handleFormSubmit }>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="text" name="email" 
                    id="email"
                   value={ this.state.email } 
                   onChange={ this.handleEmailChange } 
             />
             </FormGroup>
             <FormGroup>
             <Label for="password">Password</Label>
             <Input type="password" name="password" 
                  value={ this.state.password } 
                 onChange={ this.handlePasswordChange }
              />
              </FormGroup>
              <Button type="submit" value="Log in" onClick={this.handleLogout} color="danger">{this.state.loginStatus}</Button>
           </Form>
           </>
        )
     }
 }