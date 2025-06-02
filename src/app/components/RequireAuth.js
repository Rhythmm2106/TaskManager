// src/components/RequireAuth.js
'use client';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase-config';
import { useRouter } from 'next/navigation';

function RequireAuth({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsAuthenticated(true);
        console.log("RequireAuth: User is signed in:", currentUser.uid);
      } else {
        setIsAuthenticated(false);
        console.log("RequireAuth: User is signed out. Redirecting to home page.");
        router.push('/');
      }
      setLoading(false);
    });

    return () => {
      console.log("RequireAuth: Unsubscribing from auth state changes.");
      unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return children;
  }

  return null;
}

export default RequireAuth;