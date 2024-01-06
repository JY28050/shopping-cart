import React, { createContext, useState } from "react";
import { PRODUCTS } from "../products";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }

    return totalAmount;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };
  //we are altering the specific item's ID that was changed.

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };
  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getTotalCartAmount,
  };

  console.log(cartItems);

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

/*
 I want an object- each product ID, we're gonna put over how many items with this specific ID are in the cart. Initially it will all be 0.
 EX: 
 {
 ID 1: 0
 ID 2: 0
 }

 If I wanted to add the product with ID 2 to the cart then it will change to 
 {
 ID 2: 1
 }

This is the basic idea of how our useState will look like. 

If we want to add more products, our getDefaultCart variable will handle the changes automatically. In the loop we start with 1 instead of 0 because the IDs in our PRODUCTS start with 1. 

//
When I console.log(cartItems) it will return an object exactly like before with the 9 items from our PRODUCTS- with a 0 by each ID. Now that we've wired up the onClick event in the addCartBttn in our Products page- if we click on the button, the console log will show a +1 on the ID of whichever shoe that was clicked. 

*/

/*
  getTotalCartAmount:
  
  find is a function where you find a specific element in an array where some part of it satisfies a condition. We know that the item is the Id representing the product, which is in the cart. So we are just trying to find the product so we have access to it's price. 
  
  += is just adding to totalAmount. cartItems[item] is the specific amount of a product in the cart, so if we for example have 2 of a product, we need to multiply the price * 2. At the of the loop we should have the current totalAmount

  */
