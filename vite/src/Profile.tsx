import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "./Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const fetchUserDetails = async (uid: string) => {
  try {
    const phrDoc = await getDoc(doc(db, "PHR", uid));
    const phrId = phrDoc.data()?.phrId;
    const userDoc = await getDoc(doc(db, "Users", phrId));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        resourceType: "Patient",
        fhirId: userData?.fhirId,
        given: userData?.name?.[0]?.given?.[0],
        family: userData?.name?.[0]?.family,
        gender: userData?.gender,
        birthDate: userData?.birthDate,
        phone: userData?.telecom?.[0]?.value,
        email: userData?.telecom?.[1]?.value,
      };
    } else {
      console.error("User does not exist in the database");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

const Profile: React.FC = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // const getUserDetails = async () => {
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const phrDoc = await getDoc(doc(db, "PHR", user.uid));
  //       const phrId = phrDoc.data()?.phrId;
  //       const userDoc = await getDoc(doc(db, "Users", phrId));
  //       if (userDoc.exists()) {
  //         const googlePatient = {
  //           resourceType: "Patient",
  //           fhirId: userDoc.data()?.fhirId,
  //           name: [
  //             {
  //               use: "official",
  //               family: userDoc.data()?.name?.[0]?.family,
  //               given: [userDoc.data()?.name?.[0]?.given?.[0]],
  //             },
  //           ],
  //           gender: userDoc.data()?.gender,
  //           birthDate: userDoc.data()?.birthDate,
  //           telecom: [
  //             {
  //               system: "phone",
  //               value: userDoc.data()?.telecom?.[0]?.value,
  //             },
  //             {
  //               system: "email",
  //               value: userDoc.data()?.telecom?.[1]?.value,
  //             },
  //           ],
  //         };
  //         console.log(googlePatient, "Patient");

  //         setUserDetails(userDoc.data());
  //       } else {
  //         console.error("User does not exist in the database");
  //       }
  //     }
  //   });
  // };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDetails = await fetchUserDetails(user.uid);
        setUserDetails(userDetails);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails: any) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        const phrDoc = await getDoc(doc(db, "PHR", user.uid));
        const phrId = phrDoc.data()?.phrId;
        await setDoc(doc(db, "Users", phrId), userDetails);
        toast.success("Profile updated successfully", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile", {
        position: "top-center",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      toast.success("Signed out successfully", {
        position: "top-center",
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f0fa",
        color: "#333",
      }}
    >
      {loading ? (
        <h2>Loading...</h2>
      ) : userDetails ? (
        <div
          style={{
            backgroundColor: "fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "300px",
          }}
        >
          <h1>Hello, {userDetails?.name?.[0]?.given?.[0]}</h1>
          <p>
            <strong>First name:</strong> {userDetails?.name?.[0]?.given?.[0]}
          </p>
          <p>
            <strong>Last name:</strong> {userDetails?.name?.[0]?.family}
          </p>
          <p>
            <strong>Gender:</strong> {userDetails.gender}
          </p>
          <p>
            <strong>Birth date:</strong> {userDetails.birthDate}
          </p>
          <p>
            <strong>Phone:</strong> {userDetails?.telecom?.[0]?.value}
          </p>
          <p>
            <strong>Email:</strong> {userDetails?.telecom?.[1]?.value}
          </p>
          <button
            style={{
              padding: "10px 20px",
              marginTop: "20px",
              background: "007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      ) : (
        <h2>User not found</h2>
      )}
    </div>
  );
};

export default Profile;
