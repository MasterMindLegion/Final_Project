import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Register from './Auth/Register.jsx';
import Login from './Auth/Login.jsx';
import NotFoundPage from './Layout/NotFoundPage.jsx';
import HomePage from './Pages/HomePage.jsx';
import { connect } from 'react-redux';

import CharityRegister from './Auth/CharityRegister.jsx';
import PrivateRoute from './Pages/Protected.jsx';

class App extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            token : window.localStorage.getItem('_token')
        }    
    }
    setAuthToken   = (token) => {
        this.setState({
            token: token
        })
    }

    render() {
        return (
            <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                 <Route exact path="/app/register" component={Register}/>           
               <Route exact path="/app/login">
                   <Login setAuthToken={this.setAuthToken}/>
               </Route>           
               <PrivateRoute exact path="/app/registerCharity">
                    <CharityRegister tooken={ this.state.token } />
                </PrivateRoute>
              {/* <Route exact path="/app/login" component={Login} /> */}
              <Route path="*" component={NotFoundPage} />
            </Switch>
            </BrowserRouter>
        )
    }
}
const mapStateToProps = state => {
    return {
      loginStatus: state.loginStatus,
      loginSuccess: state.loginSuccess,
    };
  }
 
export default connect(mapStateToProps)(App);