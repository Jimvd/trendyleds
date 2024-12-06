"use client";
import { CartItem, Product } from "@/utils/wooCommerceTypes";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

interface CartContextValue {
   cartItems: CartItem[];
   addToCart: (product: Product & { quantity: number }) => void;
   removeFromCart: (productId: number) => void;
   updateCartItemQuantity: (productId: number, quantity: number) => void;
   cartTotal: number;
   cartCount: number;
   clearCart: () => void;
   shippingCost: number;
   isFreeShipping: boolean; // Nieuw veld voor gratis verzending
}

export const CartContext = createContext<CartContextValue>({
   cartItems: [],
   addToCart: () => {},
   removeFromCart: () => {},
   updateCartItemQuantity: () => {},
   cartTotal: 0,
   cartCount: 0,
   clearCart: () => {},
   shippingCost: 2.95, // Standaard verzendkosten
   isFreeShipping: false, // Standaard geen gratis verzending
});

export const useCart = () => {
   return useContext(CartContext);
};

interface Props {
   children: React.ReactNode;
}

export const CartProvider = ({ children }: Props) => {
   const [cartItems, setCartItems] = useState<CartItem[]>([]);

   useEffect(() => {
      const storedCartItems = localStorage.getItem("cartItems");
      const items = storedCartItems ? JSON.parse(storedCartItems) : [];
      setCartItems(items);
   }, []);

   const saveToLocalStorage = (items: CartItem[]) => {
      if (typeof window !== "undefined") {
         localStorage.setItem("cartItems", JSON.stringify(items));
      }
   };

   const addToCart = (product: Product & { quantity: number }) => {
      const existingCartItemIndex = cartItems.findIndex((item) => item.product.id === product.id);
      if (existingCartItemIndex !== -1) {
         const existingCartItem = cartItems[existingCartItemIndex];
         const updatedCartItem = {
            ...existingCartItem,
            quantity: existingCartItem.quantity + product.quantity,
         };
         const updatedCartItems = [...cartItems];
         updatedCartItems[existingCartItemIndex] = updatedCartItem;
         setCartItems(updatedCartItems);
         saveToLocalStorage(updatedCartItems);
      } else {
         setCartItems([...cartItems, { product, quantity: product.quantity }]);
         saveToLocalStorage([...cartItems, { product, quantity: product.quantity }]);
      }
   };

   const removeFromCart = (productId: number) => {
      const updatedCartItems = cartItems.filter((item) => item.product.id !== productId);
      setCartItems(updatedCartItems);
      saveToLocalStorage(updatedCartItems);
   };

   const updateCartItemQuantity = (productId: number, quantity: number) => {
      const existingCartItemIndex = cartItems.findIndex((item) => item.product.id === productId);
      if (existingCartItemIndex !== -1) {
         const existingCartItem = cartItems[existingCartItemIndex];
         const updatedCartItem = {
            ...existingCartItem,
            quantity,
         };
         const updatedCartItems = [...cartItems];
         updatedCartItems[existingCartItemIndex] = updatedCartItem;
         setCartItems(updatedCartItems);
         saveToLocalStorage(updatedCartItems);
      }
   };

   const clearCart = useCallback(() => {
      setCartItems([]);
      saveToLocalStorage([]);
   }, []);

   const shippingCost = 2.95;

   const cartTotalWithoutShipping = cartItems.reduce(
      (total, item) => total + (item.product.price as unknown as number) * (item.quantity as number),
      0
   );

   const isFreeShipping = cartTotalWithoutShipping >= 5000 / 100;

   const cartTotal = isFreeShipping ? cartTotalWithoutShipping : cartTotalWithoutShipping + shippingCost;

   const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

   return (
      <CartContext.Provider
         value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateCartItemQuantity,
            cartTotal,
            cartCount,
            clearCart,
            shippingCost,
            isFreeShipping,
         }}
      >
         {children}
      </CartContext.Provider>
   );
};
