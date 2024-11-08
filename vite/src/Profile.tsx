import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const [userDetails, setUserDetails] = useState<any>(null);

  const getUserDetails = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const phrDoc = await getDoc(doc(db, "PHR", user.uid));
        const phrId = phrDoc.data()?.phrId;
        const userDoc = await getDoc(doc(db, "Users", phrId));
        if (userDoc.exists()) {
          const googlePatient = {
            resourceType: "Patient",
            fhirId: userDoc.data()?.fhirId,
            name: [
              {
                use: "official",
                family: userDoc.data()?.name?.[0]?.family,
                given: [userDoc.data()?.name?.[0]?.given?.[0]],
              },
            ],
            gender: userDoc.data()?.gender,
            birthDate: userDoc.data()?.birthDate,
            telecom: [
              {
                system: "phone",
                value: userDoc.data()?.telecom?.[0]?.value,
              },
              {
                system: "email",
                value: userDoc.data()?.telecom?.[1]?.value,
              },
            ],
          };
          console.log(googlePatient, "Patient");
          setUserDetails(userDoc.data());
        } else {
          console.error("User does not exist in the database");
        }
      }
    });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

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

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {userDetails ? (
        <>
          <h2>Welcome, {userDetails.given}</h2>
          <div>
            <p>Email: {userDetails.email}</p>
            <p>Name: {userDetails.name}</p>
            <p>Given: {userDetails.given}</p>
            <p>Family: {userDetails.family}</p>
            <p>Gender: {userDetails.gender}</p>
            <p>Birthdate: {userDetails.birthDate}</p>
            <p>Phone: {userDetails.phone}</p>
          </div>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default Profile;
