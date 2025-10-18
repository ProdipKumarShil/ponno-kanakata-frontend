"use client";

import { createContext, useContext, useState, useEffect } from 'react';




const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [flyingItem, setFlyingItem] = useState(null);
  const [cartIconRef, setCartIconRef] = useState(null);


  useEffect(() => {
    setIsMounted(true);
    try {
      const item = window.localStorage.getItem('cart');
      if (item) {
        setCart(JSON.parse(item));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
          window.localStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
          console.error("Failed to save cart to localStorage", error);
      }
    }
  }, [cart, isMounted]);

  const addToCart = (product, quantity = 1, variant = null) => {
    setCart((prevCart) => {
      const itemId = variant ? `${product.id}-${variant.sku}` : `${product.id}`;
      const existingItem = prevCart.find((item) => item.id === itemId);

      if (existingItem) {
        const stockLimit = variant ? variant.stock : product.stock;
        return prevCart.map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.min(item.quantity + quantity, stockLimit) }
            : item
        );
      }
      
      const newProduct = { ...product };

      const newItem = { 
          ...newProduct, 
          id: itemId,
          quantity: quantity,
          ...(variant ? { 
              variant: variant,
              price: variant.price, 
              originalPrice: variant.originalPrice, 
              stock: variant.stock,
              weight: variant.weight,
              name: `${product.name} (${variant.name})`,
              name_bn: `${product.name_bn} (${variant.name_bn})`,
          } : {
              id: `${product.id}`
          })
      };
      return [...prevCart, newItem];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    const itemInCart = cart.find(item => item.id === itemId);
    if (!itemInCart) return;

    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.min(quantity, item.stock) } 
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };
  
  const serverSideContextValue = {
      cart: [],
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      flyingItem: null,
      setFlyingItem: () => {},
      cartIconRef: null,
      setCartIconRef: () => {},
  };


  if (!isMounted) {
    return (
        <CartContext.Provider value={serverSideContextValue}>
        {children}
        </CartContext.Provider>
    );
  }
  
  const contextValue = {
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      flyingItem,
      setFlyingItem,
      cartIconRef,
      setCartIconRef,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
