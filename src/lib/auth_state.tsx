"use client";

import { useState, useEffect, createContext } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";

export const AuthState_Context = createContext<{
  user: User | null;
  loading: boolean;
}>({});
const AuthState_Provider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  return (
    <AuthState_Context.Provider value={{ user, loading }}>
      {children}
    </AuthState_Context.Provider>
  );
};
export default AuthState_Provider;
