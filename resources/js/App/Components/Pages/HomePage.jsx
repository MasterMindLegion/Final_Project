import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from './../Layout/Navigation.jsx';
import { Link } from 'react-router-dom';
import Main from './../Layout/Main/Main.jsx'
import Footer from './../Layout/Footer/Footer.jsx'

export default class Homepage extends React.Component {
   constructor(props) {
       super(props);
   }
   render() {
    
       return (
         <>
           <Navigation items={this.props.cart} removeItemFromCart={this.props.removeItemFromCart} />
           <Main 
             items={this.props.items} 
             addItemToCart={this.props.addItemToCart}
            />
           <Footer />
         </>
       )
    }
}