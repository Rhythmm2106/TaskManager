'use client'
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { auth, app } from './firebase-config';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';



export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false); // Track sign-in state
  const router = useRouter()



  const handleSignIn = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsSignedIn(true); // Set state upon successful sign-in
    } catch (error) {
      console.error('Sign in failed:', error);
      setError(getErrorMessage(error.code));
    }
  };

  const getErrorMessage = (errorCode) => {
      switch (errorCode) {
        case 'auth/user-not-found':
            return 'No user found with that email.';
        case 'auth/wrong-password':
            return 'Incorrect password.';
         case 'auth/invalid-email':
            return 'Invalid email address.';
        default:
            return 'An error occurred during sign in. Please try again.';
      }
  };+

  useEffect(() => {
    if (isSignedIn) {
      router.push('/StudyBuddy'); // Redirect to StudyBuddy page
    }
  }, [isSignedIn]);
  

  return (
    <div style={styles.container}>
      <h1>Sign In</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSignIn} style={styles.form}>
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
        <button type="submit" style={styles.button}>Sign In</button>
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
