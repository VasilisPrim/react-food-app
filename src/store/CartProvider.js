import React, {useReducer} from "react";

import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state,action) =>{
    let updatedTotalAmount;
    let updatedItem;
    let existingCartItemIndex;
    let existingCartItem;
    let updatedItems;
    if(action.type === 'ADD'){
        updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        
         existingCartItemIndex = state.items.findIndex(item =>item.id === action.item.id );
         existingCartItem = state.items[existingCartItemIndex];

        
        

        if(existingCartItem){
            
            updatedItem = {...existingCartItem,amount :existingCartItem.amount + action.item.amount};
            

            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;

        }else{
            updatedItems = state.items.concat(action.item)
        }
        return {
            items : updatedItems,
            totalAmount :updatedTotalAmount
        }
    }

    if(action.type === 'REMOVE'){

        existingCartItemIndex = state.items.findIndex(item =>item.id === action.id );
        existingCartItem = state.items[existingCartItemIndex];
        
        

        updatedItems = [...state.items];

        if(existingCartItem.amount > 0){
            
            updatedTotalAmount = state.totalAmount - existingCartItem.price;
            updatedItem = {...existingCartItem,amount :existingCartItem.amount - 1};
            
           
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedTotalAmount = state.totalAmount;
        }

        if(updatedItem.amount === 0){
            updatedItems.splice(existingCartItemIndex,1);
           
        }
        


        return {
            items : updatedItems,
            totalAmount :updatedTotalAmount
        }



    }
    return defaultCartState;
};

const CartProvider = props =>{

   const [cartState, dispatchCartAction] =  useReducer(cartReducer,defaultCartState)

    const addItemToCartHandler = (item)=>{
        dispatchCartAction({type: 'ADD', item: item});
        
    };
    const removeItemFromCartHandler = (id)=>{
        dispatchCartAction({type: 'REMOVE', id: id});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem :addItemToCartHandler,
        removeItem:removeItemFromCartHandler 
    }



   return  <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}


export default CartProvider;