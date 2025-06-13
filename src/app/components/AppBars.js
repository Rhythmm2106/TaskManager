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
      <nav className="bg-[#a8d5ba] text-[#2c5f2d] p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Task Manager</h1>
          <div className="text-sm">Loading user...</div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-[#a8d5ba] text-[#2c5f2d] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className="text-xl font-bold cursor-pointer hover:underline"
          onClick={() => router.push('/')}
        >
          Study Buddy
        </h1>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden sm:inline text-sm bg-[#e1f4e9] text-[#2c5f2d] px-3 py-1 rounded-full shadow-sm">
                {user.email}
              </span>
              <button
                onClick={() => router.push('/StudyBuddy')}
                className="bg-[#6cbf84] hover:bg-[#57a26e] text-white px-4 py-2 rounded transition-colors"
              >
                My Tasks
              </button>
              <button
                onClick={handleSignOut}
                className="bg-[#f4978e] hover:bg-[#f08076] text-white px-4 py-2 rounded transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push('/SignIn')}
                className="bg-[#dce775] hover:bg-[#c0ca33] text-[#2c5f2d] px-4 py-2 rounded transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="bg-[#ffd54f] hover:bg-[#ffca28] text-[#4e342e] px-4 py-2 rounded transition-colors"
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
