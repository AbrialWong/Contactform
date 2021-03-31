import React from "react";
import ReactDOM from "react-dom";
import { slide as Menu } from 'react-burger-menu'

function display(event){
  showSettings (); {
    event.preventDefault();
  }
}
  
var isMenuOpen = function(state) {
  return state.isOpen;
};

 
function Header(){
  
  return(
    <Menu onStateChange={ isMenuOpen }>
    <a id="home" className="menu-item" href="/">Home</a>
    <a id="about" className="menu-item" href="/about">About</a>
    <a id="contact" className="menu-item" href="/contact">Contact</a>
    <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
  </Menu>
  );
}

export default Header;
