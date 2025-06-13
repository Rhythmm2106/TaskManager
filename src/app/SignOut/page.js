'use client';
import { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { app } from '../firebase-config';

let firebaseApp;
try {
  firebaseApp = initializeApp(app);
} catch (error) {
  if (!error.message.includes("Firebase: Firebase App named '[DEFAULT]' already exists")) {
    console.error("Firebase init error:", error);
  }
}

const SignOutPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signedOut, setSignedOut] = useState(false);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => setSignedOut(true))
      .catch((error) => console.error("Error signing out:", error));
  };

  if (loading) return <div className="text-center py-10 text-yellow-600">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 max-w-md mx-auto bg-yellow-50 rounded-lg shadow-md text-center">
      {signedOut ? (
        <p className="text-green-600 font-medium">You have been signed out.</p>
      ) : user ? (
        <>
          <p className="mb-4 text-yellow-800">
            You are signed in as <strong>{user.email}</strong>.
          </p>
          <button
            onClick={handleSignOut}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Sign Out
          </button>
        </>
      ) : (
        <p className="text-gray-600">You are not signed in.</p>
      )}
    </div>
  );
};

export default SignOutPage;
