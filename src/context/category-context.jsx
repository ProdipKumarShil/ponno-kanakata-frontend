"use client";

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { db } from '@/services/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';


const CategoryContext = createContext({
  categories: [],
  flatCategories: [],
  loading: true,
  error: null,
});

export function CategoryProvider({ children }) {
  const [rawCategories, setRawCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!db) {
        console.warn("Firestore not initialized, category context cannot fetch data.");
        setError("Firestore not initialized.");
        setLoading(false);
        return;
    }

    const q = query(collection(db, "categories"), orderBy("name"));
    const unsubscribe = onSnapshot(q, 
        (querySnapshot) => {
            const categoriesData = [];
            querySnapshot.forEach((doc) => {
                categoriesData.push({ id: doc.id, ...doc.data() });
            });
            setRawCategories(categoriesData);
            setLoading(false);
        },
        (err) => {
            console.error("Error fetching categories from Firestore:", err);
            setError("Failed to fetch categories.");
            setLoading(false);
        }
    );
    return () => unsubscribe();
  }, []);

  const { nestedCategories, flatCategories } = useMemo(() => {
    const categoryMap = {};
    const nested = [];

    // First pass: create a map of all categories by their ID
    rawCategories.forEach(cat => {
        categoryMap[cat.id] = { ...cat, subcategories: [] };
    });

    // Second pass: build the nested structure
    rawCategories.forEach(cat => {
        if (cat.parentId && categoryMap[cat.parentId]) {
            categoryMap[cat.parentId].subcategories.push(categoryMap[cat.id]);
        } else {
            nested.push(categoryMap[cat.id]);
        }
    });

    return { nestedCategories: nested, flatCategories: rawCategories };
  }, [rawCategories]);

  const value = {
      categories: nestedCategories,
      flatCategories: flatCategories,
      loading,
      error
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
}
