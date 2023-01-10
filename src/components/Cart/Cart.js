import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

import CartForm from "../forms/CartForm";
import React, { useContext, useState } from "react";

const Cart = (props) => {
  const [orderBtnIsClicked, setOrderBtnIsClicked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderBtnHandler = () => {
    setOrderBtnIsClicked(true);
  };

  const dataHandler = async (data) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-29822-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          userItems: cartCtx.items,
          user: data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  const modalCheckout = (
    <div className={classes.actions}>
      <button onClick={props.onClose} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderBtnHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {orderBtnIsClicked && (
        <CartForm onConfirm={dataHandler} onCancel={props.onClose} />
      )}
      {!orderBtnIsClicked && modalCheckout}
    </React.Fragment>
  );

  const isSubmittingModal = <p>Sending order data...</p>;


  const didSubmitModal = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
      <button onClick={props.onClose} className={classes.button}>
        Close
      </button>
      </div>
    </React.Fragment>)
  
    

  return <Modal onClick={props.onClose}>
    {!isSubmitting && !didSubmit && cartModalContent}
    {isSubmitting && isSubmittingModal}
    {!isSubmitting && didSubmit && didSubmitModal}

  </Modal>;
};

export default Cart;
