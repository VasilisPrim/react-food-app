import React,{useState} from "react";

import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import CartProvider from "./store/CartProvider";



function App() {
  const [cartBtnState,setCartBtnState] = useState(false);


    const cartBtnOpen = () =>{
        setCartBtnState(true)
  }
  const cartBtnClose = () =>{
    setCartBtnState(false)
}


  return (
    <CartProvider>
      {cartBtnState && <Cart onClose = {cartBtnClose}/>}
      <Header onShowCart = {cartBtnOpen}/>
      <main>
      <Meals/>

      </main>
    </CartProvider>
  );
}

export default App;
