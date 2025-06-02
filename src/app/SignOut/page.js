'use client'
import { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app'; // Correct import
import {app} from '../firebase-config'; // Import your config


// Initialize Firebase
let firebaseApp; // Declare outside to use it later

try {
  firebaseApp = initializeApp(app);
} catch (error) {
  // Ignore "already exists" error.  Important for Next.js.
  if (!error.message.includes("Firebase: Firebase App named '[DEFAULT]' already exists")) {
    console.error("Firebase initialization error:", error);
  }
}


const SignOutPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signedOut, setSignedOut] = useState(false);

  useEffect(() => {
    const auth = getAuth(firebaseApp); // Pass the app instance
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    const auth = getAuth(firebaseApp); // Pass the app instance
    signOut(auth)
      .then(() => {
        setSignedOut(true);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (signedOut) {
    return (
      <div style={styles.container}>
        <p style={styles.paragraph}>You have been signed out.</p>
      </div>
    );
  }

  if (user) {
    return (
      <div style={styles.container}>
        <p style={styles.paragraph}>
          You are currently signed in as {user.email}.
        </p>
        <button onClick={handleSignOut} style={styles.button}>Sign Out</button>
      </div>
    );
  } else {
    return (
      <div style={styles.container}>
        <p style={styles.paragraph}>You are not signed in.</p>
      </div>
    );
  }
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    textAlign: 'center'
  },
  paragraph: {
    marginBottom: '20px',
    fontSize: '16px'
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px'
  },
};

export default SignOutPage;
