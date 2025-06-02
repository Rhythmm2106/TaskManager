'use client'
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Assuming you have your firebase config in a separate file (e.g., firebaseConfig.js)
import {db} from '../firebase-config';

// Initialize Firebase if it hasn't been already
if (!db) {
  console.error("Firebase configuration not found. Please create a firebaseConfig.js file.");
} else {
  try {
    initializeApp(db);
  } catch (error) {
    // Ignore "Firebase: Firebase App named '[DEFAULT]' already exists" error which can happen in Next.js dev mode
    if (!error.message.includes('already exists')) {
      console.error('Firebase initialization error:', error);
    }
  }
}

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);

    } catch (error) {
      console.error('Sign up failed:', error);
      setError(getErrorMessage(error.code));
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'That email address is already in use.';
      case 'auth/invalid-email':
        return 'That email address is invalid.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      default:
        return 'An error occurred during sign up. Please try again.';
    }
  };

  return (
    <div style={styles.container}>
      <h1>Sign Up</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSignUp} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '400px',
    margin: '0 auto',
  },
  form: {
    width: '100%',
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '3px',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};                                                                                                                                    