"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '@/services/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

import { products as fallbackProducts } from '@/data/products';

const ProductContext = createContext({
  products: [],
  loading: true,
  error: null,
});

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!db) {
        console.warn("Firestore not initialized, using fallback data.");
        setProducts(fallbackProducts);
        setLoading(false);
        return;
    }

    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, 
        (querySnapshot) => {
            const productsData = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const price = typeof data.price === 'number' ? data.price : 0;
                productsData.push({ ...data, id: doc.id, price });
            });
            setProducts(productsData);
            setLoading(false);
        },
        (err) => {
            console.error("Error fetching products from Firestore:", err);
            setError("Failed to fetch products. Using fallback data.");
            setProducts(fallbackProducts);
            setLoading(false);
        }
    );

    return () => unsubscribe();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
}
