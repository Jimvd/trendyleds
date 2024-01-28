"use client";
import React, { createContext, useReducer, ReactNode } from "react";

interface Product {
   id: string;
}

interface CartState {
   items: Product[];
}

type CartAction = { type: "ADD"; payload: { items: Product[] } } | { type: "REMOVE"; payload: { items: Product[] } };

const initialState: CartState = {
   items: [],
};

// Create the context
export const CartContext = createContext<{
   state: CartState;
   addToCart: (product: Product) => void;
   removeFromCart: (id: string) => void;
}>({
   state: initialState, // Add the state property
   addToCart: () => {},
   removeFromCart: () => {},
});

// Create the reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
   switch (action.type) {
      case "ADD":
      case "REMOVE":
         return { ...state, items: action.payload.items };
      default:
         return state;
   }
};

// Create the CartProvider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [state, dispatch] = useReducer(cartReducer, initialState);

   const addToCart = (product: Product) => {
      const updatedCart = [...state.items, product];

      dispatch({
         type: "ADD",
         payload: {
            items: updatedCart,
         },
      });
   };

   const removeFromCart = (id: string) => {
      const updatedCart = state.items.filter((currentProduct) => currentProduct.id !== id);

      dispatch({
         type: "REMOVE",
         payload: {
            items: updatedCart,
         },
      });
   };
   const value = {
      state,
      addToCart,
      removeFromCart,
   };

   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
