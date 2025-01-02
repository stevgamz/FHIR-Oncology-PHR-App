import firebase from "firebase/compat/app";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

const auth = getAuth();

interface AuthContextType {
  users: firebase.User | null;
  loading: boolean;
  token: string | null;
  isAdmin: string | null;
  loginOrganization: (email: string, password: string) => Promise<void>;
  registerOrganization: (email: string, password: string) => Promise<void>;
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

        const organizationData = await getDocs(collection(db, "Organizations"));
        const organizationDoc = organizationData.docs
          .find((doc) => {
            return doc.data().email === user.email;
          })
          ?.data();
        if (organizationDoc) {
          const role = organizationDoc.role === "admin" ? "admin" : null;
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

  const loginOrganization = async (email: string, password: string) => {
    const adminCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(adminCredential, "adminCredential");
    const organizationData = await getDocs(collection(db, "Organizations"));
    const organizationDoc = organizationData.docs.find(
      (doc) => doc.data().email === email
    );
    if (organizationDoc) {
      const role = organizationDoc.data().role === "admin" ? "admin" : null;
      setIsAdmin(role);
    }
  };

  const registerOrganization = async (email: string, password: string) => {
    const adminCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(adminCredential, "adminCredential");
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
        loginOrganization,
        registerOrganization,
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

// {
//   "resourceType": "Organization",
//   "meta": {
//     "profile": [
//       "https://hapi.fhir.tw/fhir/StructureDefinition/TWCoreOrganization"
//     ]
//   },
//   "identifier": [
//     {
//       "use": "official",
//       "type": {
//         "coding": [
//           {
//             "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
//             "code": "PRN"
//           }
//         ]
//       },
//       "system": "https://twcore.mohw.gov.tw/ig/twcore/CodeSystem/organization-identifier-tw",
//       "value": "1101020018"
//     }
//   ],
//   "type": [
//     {
//       "coding": [
//         {
//           "system": "http://terminology.hl7.org/CodeSystem/organization-type",
//           "code": "prov"
//         }
//       ]
//     }
//   ],
//   "name": "twhospital"
// }
