import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from './../Layout/Navigation.jsx';
import { Link } from 'react-router-dom';
import Main from './../Layout/Main/Main.jsx'
import Footer from './../Layout/Footer/Footer.jsx'

export default class Homepage extends React.Component {
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
     console.log("[HOMEPAGE] CART", this.state.cart)
       return (
         <>
           <Navigation items={this.state.cart} removeItemFromCart={this.removeItemFromCart} />
           <Main 
             items={this.state.items} 
             addItemToCart={this.addItemToCart}
            />
           <Footer />
         </>
       )
    }
}