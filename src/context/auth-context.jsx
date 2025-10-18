"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/services/firebase';
import { doc, getDoc } from 'firebase/firestore';

import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth as firebaseAuth } from '@/services/firebase';



const AuthContext = createContext(undefined);

const hardcodedOwner = {
    email: '@ponnokenakata',
    password: 'ponno@kenakata2000'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const hardcodedUserLoggedIn = typeof window !== 'undefined' && sessionStorage.getItem('hardcodedOwner') === 'true';

    if (hardcodedUserLoggedIn) {
        setUser({
            id: hardcodedOwner.email,
            firebaseUid: 'owner-uid',
            displayName: 'Owner',
            email: hardcodedOwner.email,
            photoURL: null,
            role: 'owner',
        });
        setLoading(false);
        return;
    }

    if (!firebaseAuth) {
        setLoading(false);
        return;
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
        setLoading(true);
        if (firebaseUser && firebaseUser.email) {
            try {
                const roleDoc = await getDoc(doc(db, 'userRoles', firebaseUser.email));
                if (roleDoc.exists()) {
                    const userRole = roleDoc.data();
                    setUser({
                        id: firebaseUser.email,
                        firebaseUid: firebaseUser.uid,
                        displayName: firebaseUser.displayName,
                        email: firebaseUser.email,
                        photoURL: firebaseUser.photoURL,
                        role: userRole.role
                    });
                } else {
                    await signOut(firebaseAuth); // Log out user if no role is found
                    setUser(null);
                }
            } catch (err) {
                console.error("Error fetching user role:", err);
                setUser(null);
                setError("Failed to fetch user role.");
            }
        } else {
            setUser(null);
        }
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const login = async (email, pass) => {
      setLoading(true);
      setError(null);
      
      if (email === hardcodedOwner.email && pass === hardcodedOwner.password) {
          try {
              const ownerUser = {
                  id: hardcodedOwner.email,
                  firebaseUid: 'owner-uid',
                  displayName: 'Owner',
                  email: hardcodedOwner.email,
                  photoURL: null,
                  role: 'owner',
              };
              sessionStorage.setItem('hardcodedOwner', 'true');
              setUser(ownerUser);
              router.push('/admin/dashboard');
          } catch (e) {
              setError(e.message || 'An unknown error occurred.');
          } finally {
              setLoading(false);
          }
          return;
      }
      
      if (!firebaseAuth) {
          setError("Firebase is not configured. Cannot log in.");
          setLoading(false);
          return;
      }
      try {
          await signInWithEmailAndPassword(firebaseAuth, email, pass);
          // The onAuthStateChanged listener will handle setting the user state and navigation logic in the layout will handle redirection.
      } catch (e) {
          if (e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found' || e.code === 'auth/invalid-credential') {
              setError("Invalid username or password.");
          } else {
              setError(e.message || "Failed to log in.");
          }
      } finally {
        setLoading(false);
      }
  };

  const logout = async () => {
    setLoading(true);
    if (user?.id === hardcodedOwner.email) {
        sessionStorage.removeItem('hardcodedOwner');
    }

    if(firebaseAuth?.currentUser) {
       await signOut(firebaseAuth);
    }
    setUser(null);
    router.push('/admin/login');
    setLoading(false);
  };

  const value = { user, loading, error, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
