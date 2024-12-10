import firebase from "firebase/compat/app";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";

const auth = getAuth();

interface AuthContextType {
  users: firebase.User | null;
  loading: boolean;
  token: string | null;
  isAdmin: string | null;
  loginAdmin: (email: string, password: string) => Promise<void>;
  registerAdmin: (
    email: string,
    password: string,
    country: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // setLoading(true);

      if (user) {
        setUsers(user as firebase.User | null);
        const emailPrefix = user.email?.split("@")[0];
        if (emailPrefix) {
          const adminDoc = await getDoc(doc(db, "admins", emailPrefix));
          const role = adminDoc.data()?.role === "admin" ? "admin" : null;
          setIsAdmin(role);
          const idToken = await user.getIdToken(true);
          setToken(idToken);
        }
      } else {
        setUsers(null);
        setIsAdmin(null);
        setToken(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginAdmin = async (email: string, password: string) => {
    const adminCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(adminCredential, "adminCredential");
    // const admin = adminCredential.user;
    const adminId = email.split("@")[0];
    const adminDoc = await getDoc(doc(db, "admins", adminId));
    adminDoc.exists();
  };

  const registerAdmin = async (
    email: string,
    password: string,
    country: string
  ) => {
    const adminCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(adminCredential, "adminCredential");

    // const admin = adminCredential.user;
    const adminId = email.split("@")[0];
    const adminDocRef = doc(db, "admins", adminId);
    await setDoc(adminDocRef, { email, role: "admin", country });
  };

  const logout = async () => {
    await auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        loading,
        token,
        isAdmin,
        loginAdmin,
        registerAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
// export const useAuth = () => useContext(AuthContext);
