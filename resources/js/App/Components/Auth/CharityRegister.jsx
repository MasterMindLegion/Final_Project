import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText,  } from 'reactstrap';
import {store} from './../../../app';
 class CharityRegister extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
      name : '',
      adress: '',
      information: '',
      localToken: window.localStorage.getItem('_token'),
      }
  }
    handleNameChange = (event) => {
      this.setState({
        name: event.target.value
      });
    }
    handleAdressChange = (event) => {
      this.setState({
          adress: event.target.value
      });
    }
    handleInformationChange = (event) => {
        this.setState({
            information: event.target.value
        });
    }
    componentDidMount() {
      
    }
  handleFormSubmit = (event) => {
    event.preventDefault();
    fetch('/api/registerCharity', {
        method: 'POST',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + _token 
        },
        body: JSON.stringify({
            name: this.state.name,
            char_address: this.state.adress,
            char_information: this.state.information,
        })
    })
    .then(response => response.json())
    .then(data => {
    })
}
    render() {
      console.log("render from ch reg", this.props.registerCharity)
        return (
          <>
         {this.props.charityRegister == true            
         ? <h1>allowed</h1>
         : <h1>Not </h1>
         }

           <h1>Here you can register your charity</h1>
           <Form action="" method="post" onSubmit={this.handleFormSubmit}>
             <FormGroup>
              <Label htmlFor="register_charity_name">Name</Label>
               <Input type="text" name="register_charity_name" value={this.state.name}
               onChange={this.handleNameChange} 
               placeholder="Enter Your Charity" id="register_charity_name"/>
             </FormGroup>
             <FormGroup>
             <Label htmlFor="register_adress">Adress</Label>
             <Input type="text" name="register_adress" value={this.state.adress} onChange={this.handleAdressChange} placeholder="Enter Your Adress" id="register_adress"/>
             </FormGroup>
             <FormGroup>
             <Label htmlFor="register_information">Enter information</Label>
             <Input type="text" name="register_information" value={this.state.information} onChange={this.handleInformationChange}  placeholder="Enter information" id="register_information"/>
             </FormGroup>        
              <Button type="submit" value="Submit" color="danger">Submit</Button>       
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
    loginStatus: state.loginStatus,
    loginSuccess: state.loginSuccess,
    registerCharity: state.registerCharity,
    _token : state.loginReducer._token
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
export default connect(mapStateToProps, mapDispatchToProps)(CharityRegister);
