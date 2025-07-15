"use client"

import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, User } from "firebase/auth";
import { auth } from "../lib/firebase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isLoggingOut: boolean;
  createUser: (email: string, password: string) => Promise<User>;
  updateUserProfile: (user: User, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
    });

    return () => unsubscribe()
  }, []);

  async function createUser(email: string, password: string) {
    const response = await createUserWithEmailAndPassword(auth, email, password)

    return response.user
  }

  async function login(email: string, password: string) {
    const response = await signInWithEmailAndPassword(auth, email, password)

    return response.user
  }

  async function logout() {
    setIsLoggingOut(true)
    await signOut(auth)
    setIsLoggingOut(false)
  }

  async function updateUserProfile(user: User, name: string) {
    const updatedItems = {
      displayName: name
    }

    await updateProfile(user, updatedItems)
  }

  return (
    <AuthContext.Provider value={{ user, loading, isLoggingOut, createUser, updateUserProfile, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
