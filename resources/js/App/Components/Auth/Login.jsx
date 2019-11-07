 import React from 'react';
 import { Link } from 'react-router-dom';
 export default class Login extends React.Component {
    constructor(props) {
        super(props);
        
       this.state = {
           email: '',
           password: '',
           loginSuccess: '',
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
      if(token !== undefined) {
        this.setState({
          loginSuccess: true,
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
    
        if (data.status === 'success') {
           window.localStorage.setItem('_token', data.success.token);
           this.setState({
             loginSuccess: true,
           });
           

        }
    })
   }

    render() {
        return (
          <>
           <h1>Please Login Here</h1>
            <form action="" method="post" onSubmit={ this.handleFormSubmit }>
              Email:<br />
              <input type="text" name="email" 
                   value={ this.state.email } 
                  onChange={ this.handleEmailChange } 
            /><br />
              Password:<br />
             <input type="password" name="password" 
                  value={ this.state.password } 
                 onChange={ this.handlePasswordChange }
              /><br />
              <input type="submit" value="Log in" />
           </form>
           </>
        )
     }
 }