"use client";

import { createContext, useContext, useState, useEffect } from 'react';


const WishlistContext = createContext(undefined);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const item = window.localStorage.getItem('wishlist');
      if (item) {
        setWishlist(JSON.parse(item));
      }
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
          window.localStorage.setItem('wishlist', JSON.stringify(wishlist));
      } catch (error) {
          console.error("Failed to save wishlist to localStorage", error);
      }
    }
  }, [wishlist, isMounted]);

  const addToWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      if (!prevWishlist.includes(productId)) {
        return [...prevWishlist, productId];
      }
      return prevWishlist;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((id) => id !== productId));
  };
  
  const isInWishlist = (productId) => {
    return wishlist.includes(productId);
  };
  
  const serverSideContextValue = {
      wishlist: [],
      addToWishlist: () => {},
      removeFromWishlist: () => {},
      isInWishlist: () => false,
  };


  if (!isMounted) {
    return (
        <WishlistContext.Provider value={serverSideContextValue}>
        {children}
        </WishlistContext.Provider>
    );
  }
  
  const contextValue = {
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
