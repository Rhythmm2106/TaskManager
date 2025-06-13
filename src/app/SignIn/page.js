'use client';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase-config';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsSignedIn(true);
      setSuccessMessage('Sign in successful! Redirecting...');
    } catch (err) {
      setError(getErrorMessage(err.code));
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      const timeout = setTimeout(() => router.push('/StudyBuddy'), 1000);
      return () => clearTimeout(timeout);
    }
  }, [isSignedIn, router]);

  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/user-not-found': return 'No user found with this email.';
      case 'auth/wrong-password': return 'Incorrect password.';
      case 'auth/invalid-email': return 'Invalid email address.';
      default: return 'Something went wrong. Please try again.';
    }
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-md mx-auto bg-yellow-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Sign In</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {isSignedIn && <p className="text-green-600 mb-3">{successMessage}</p>}

      <form onSubmit={handleSignIn} className="w-full bg-white rounded-md p-6 shadow space-y-4">
        <div>
          <label className="block text-sm font-medium text-yellow-700">Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-yellow-700">Password:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Sign In
        </button>
      </form>
    </div>
  );
}
