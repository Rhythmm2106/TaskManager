'use client';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../firebase-config';
import {
  collection,
  setDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  where
} from 'firebase/firestore';

const useTaskStorage = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const unsubscribeFirestore = listenToTasks(currentUser.email);
        return () => unsubscribeFirestore();
      } else {
        setTasks([]);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const listenToTasks = (userEmail) => {
    const q = query(collection(db, 'tasks'), where('userEmail', '==', userEmail));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userTasks = snapshot.docs.map((doc) => doc.data());
      setTasks(userTasks);
    });
    return unsubscribe;
  };

  const addTask = async (task) => {
    if (!user) return;

    try {
      // 🔥 Use setDoc to store with custom task.id as the document ID
      await setDoc(doc(db, 'tasks', task.id), {
        ...task,
        userEmail: user.email
      });

      setTasks([...tasks, { ...task, userEmail: user.email }]);
    } catch (error) {
      console.error('Error adding task to Firestore:', error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const taskRef = doc(db, 'tasks', updatedTask.id);
      await updateDoc(taskRef, updatedTask);
    } catch (error) {
      console.error('Error updating task in Firestore:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
    } catch (error) {
      console.error('Error deleting task from Firestore:', error);
    }
  };

  const toggleTaskComplete = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const updatedTask = { ...task, completed: !task.completed };
    try {
      await updateDoc(doc(db, 'tasks', taskId), {
        completed: updatedTask.completed,
      });

      const newTasks = tasks.map((t) =>
        t.id === taskId ? updatedTask : t
      );
      setTasks(newTasks);
    } catch (error) {
      console.error('Error updating task in Firestore:', error);
    }
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    user
  };
};

export default useTaskStorage;
