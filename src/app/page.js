'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from './firebase-config';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage('Sign up successful! Redirecting...');
      setTimeout(() => router.push('/StudyBuddy'), 1000);
    } catch (error) {
      setError(getErrorMessage(error.code));
    }
  };

  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/email-already-in-use': return 'That email address is already in use.';
      case 'auth/invalid-email': return 'That email address is invalid.';
      case 'auth/weak-password': return 'Password should be at least 6 characters.';
      default: return 'An error occurred. Please try again.';
    }
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-md mx-auto bg-yellow-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Sign Up</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {successMessage && <p className="text-green-600 mb-3">{successMessage}</p>}

      <form onSubmit={handleSignUp} className="w-full bg-white rounded-md p-6 shadow space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-yellow-700">Email:</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-yellow-700">Password:</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Sign Up
        </button>

        <p className="text-center text-sm mt-4 text-yellow-800">
          Already have an account?{' '}
          <Link href="/SignIn" className="text-green-600 hover:underline">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
