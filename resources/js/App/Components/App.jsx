import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Register from './Auth/Register.jsx';
import Login from './Auth/Login.jsx';
import NotFoundPage from './Layout/NotFoundPage.jsx';
import HomePage from './Pages/HomePage.jsx';
import Cart from './Layout/Main/Cart/Cart.jsx';
import { connect } from 'react-redux';

import CharityRegister from './Auth/CharityRegister.jsx';
import PrivateRoute from './Pages/Protected.jsx';

class App extends React.Component {
    constructor(props) {

        super(props); 
        const cartString = window.localStorage.getItem("cart")
        const cart = cartString ? JSON.parse(cartString) : [{name: 'nemo'}]
        this.state = {
            token: null,
            logged_in: null,
            items: [],
            cart: cart,
        };
    }
    componentDidMount() {
        fetch("http://www.charity.test:8080/api/items")
            .then(res => res.json())
            .then(result => {
            //  console.log("[Homepage] FETCH", result);
                this.setState({
                    isLoaded: true,
                    items: result
                });
            });
    }
    addItemToCart = (newItem) => {
        this.setState(prevState => {
            const hasItem = !!prevState.cart.find(item => item.name === newItem.name)
            let newCart
            if(hasItem) {
                newCart = prevState.cart.reduce((acc, curr) => {
                    if(newItem.name === curr.name) curr.quantity = curr.quantity + 1
                    return acc.concat(curr)
                }, [])
            } else {
                newCart = prevState.cart.concat(newItem)
            }
            window.localStorage.setItem("cart", JSON.stringify(newCart));
            return {
                ...prevState,
                cart: newCart
            }
        })
    }
    removeItemFromCart = (itemName) => {
        this.setState(prevState => {
            const newCart = prevState.cart.filter(item=>itemName!==item.name)
            return {
                ...prevState,
                cart: newCart
            }
        })
    }
    decreaseItemInCart=itemName=>{
    
    }
    render() {
       
        return (
            <BrowserRouter>
            <Switch>
                 <Route exact path="/"  render={() => {
                     return <HomePage
                     items={this.state.items}
                     addItemToCart={this.addItemToCart}
                     />;
                 }}
             ></Route>
                 <Route exact path="/app/register" component={Register}/>           
               <Route exact path="/app/login">
                   <Login/>
               </Route>           
               <PrivateRoute exact path="/app/registerCharity">
                    <CharityRegister/>
                </PrivateRoute>
                <Route exact path="/app/cart"  render={() => {
                     return <Cart
                     items={this.state.cart} 
                     removeItemFromCart={this.removeItemFromCart}
                     />;
                 }}
                />
               <Route path="*" component={NotFoundPage} /> 
            </Switch>
            </BrowserRouter>
        )
    }
}
const mapStateToProps = state => {
    return {
      loginStatus: state.loginReducer.loginStatus,
      loginSuccess: state.loginReducer.loginSuccess,
      
    };
  }
export default connect(mapStateToProps)(App);