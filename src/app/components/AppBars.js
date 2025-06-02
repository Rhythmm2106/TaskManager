'use client';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase-config';
import { useRouter } from 'next/navigation';

const AppBars = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log('Auth state changed:', currentUser ? currentUser.email : 'Logged out');
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <nav className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Task Manager</h1>
          <div className="text-sm">Loading user...</div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => router.push('/')}>
          Task Manager
        </h1>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden sm:inline text-sm bg-blue-500 px-3 py-1 rounded-full">
                {user.email}
              </span>
              <button
                onClick={() => router.push('/StudyBuddy')}
                className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded transition-colors"
              >
                My Tasks
              </button>
              <button
                onClick={handleSignOut}
                className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push('/signin')}
                className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="bg-purple-500 hover:bg-purple-400 px-4 py-2 rounded transition-colors"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AppBars;