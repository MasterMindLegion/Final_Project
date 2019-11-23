import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText,  } from 'reactstrap';

const Register = props =>{
  const [formInputValues, setFormInputValues] = useState({
    name : '', email: '', password: '',
    c_password: ''
  })
  const [formErrors, setFormErrors] = useState({email: '', password: '', c_password: ''})
  const [formInputValid, setFormInputValid] = useState({emailValid: false, passwordValid: false, c_passwordValid: false, formValid: false})
  const [checkedInput, setCheckedInput] = useState({name: 'x', email: 'x', password: 'x', c_password: 'x'})
  const errorClass = (error) => {
    return(error.length === 0 ? '' : 'is-invalid');
  }
  const {
    modalStatus,
    childRegisterStatus= () => {
    }
} = props

const newValidateSubmit = (e) => { 
    let array = checkedInput;
    array.name = formInputValues.name,
    array.email = formInputValues.email,
    array.password = formInputValues.password,
    array.c_password = formInputValues.c_password
    setCheckedInput(array);
  }
const validateField = (fieldName, value) => {
  let fieldValidationErrors = formErrors;
  let emailValid = formInputValid.emailValid;
  let passwordValid = formInputValid.passwordValid;
  let c_passwordValid = formInputValid.c_passwordValid; 

  switch(fieldName) {
    case 'email':
      emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) || value.length ==0;
      fieldValidationErrors.email = emailValid ? '' : ' is invalid';
      break;
    case 'password':
      passwordValid = value.length >= 6 || value.length == 0;
      fieldValidationErrors.password = passwordValid ? '': 'is too short';
      break;
    case 'c_password':
    //  c_passwordValid = this.state.c_password == this.state.password || this.state.c_password == '' ;
      fieldValidationErrors.c_password = c_passwordValid ? '': 'WROOOOONG!';
      break;
    default:
      break;
  };

  setFormErrors(fieldValidationErrors),
  setFormInputValid({emailValid: emailValid, passwordValid: passwordValid, c_passwordValid: c_passwordValid})
};

  const handleFormInputValues = e => {
    setFormInputValues({
      ...formInputValues,
      [e.target.id]: e.target.value,
    }),
    validateField(e.target.id, e.target.value)
  };

  const handleFormSubmit = (e) => {
    e.preventDefault()

    fetch('/api/register', {
      method: 'POST',
      headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: formInputValues.name,
          email: formInputValues.email,
          password: formInputValues.password,
          c_password: formInputValues.c_password
      })
  })
  .then(response => response.json())
  .then(data => {
    if(data.success.token !== null && modalStatus) { 
      childRegisterStatus();
     // return  this.props.history.push('/app/login') 
    }
  })
  .catch((e) => {
    console.log(e);
    newValidateSubmit()
  })

  }
        return (
          <>
          {console.log(checkedInput)}
           <h1>Please Register</h1>
           <Form action="" method="post" onSubmit={handleFormSubmit}>

             <FormGroup>
              <Label htmlFor="register_name">Name</Label>
               <Input type="text" name="register_name" value={formInputValues.name}
               onChange={handleFormInputValues} 
               placeholder="Enter Your Name" id="name"/>
              <div className='text-danger'>
              { checkedInput.name == '' && formInputValues.name == '' &&
                  <p className="alert alert-danger">Name is required. </p>}
              </div>
             </FormGroup>


             <FormGroup>
             <Label htmlFor="register_name">Email</Label>
             <Input type="email" name="register_email" value={formInputValues.email} onChange={handleFormInputValues} placeholder="Enter Your Email" id="email"
             className={`form-control ${errorClass(formErrors.email)}`}/>
            <div className='text-danger'>
                  { formErrors['email'].length > 0 &&
                  <p className="alert alert-danger">Email {formErrors['email']}</p>}
            </div>
             </FormGroup>

             <FormGroup>
             <Label htmlFor="register_password">Password</Label>
             <Input type="password" name="register_password" value={formInputValues.password} onChange={handleFormInputValues} placeholder="Enter Your Password" id="password" className={`form-control ${errorClass(formErrors.password)}`}/>
             <div className='text-danger'>
                   { formErrors['password'].length > 0 &&
                    <p className="alert alert-danger">Password {formErrors['password']}</p>}
             </div>
             </FormGroup>

             <FormGroup>
             <Label htmlFor="register_password_confirm">Confirm Password</Label>
             <Input type="password" name="register_password_confirmation" value={formInputValues.c_password} onChange={handleFormInputValues}  placeholder="Confirm Your Password" id="c_password" className= {`form-control ${formInputValues.password == formInputValues.c_password || formInputValues.c_password == '' ? '' : 'is-invalid'}`}/>
            <div className='text-danger'>
              {formInputValues.password == formInputValues.c_password || formInputValues.c_password == '' ? '' : <p className="alert alert-danger">Password and confirmed password are not the same</p>}
            </div>
             </FormGroup>


              <Button type="submit" value="Submit" onClick= {newValidateSubmit} color="danger">Submit</Button>       
           </Form>
          </>
 
        )
    };

    export default Register;
