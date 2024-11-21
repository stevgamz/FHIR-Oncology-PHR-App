import { auth, db, provider } from "../Firebase";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import GoogleButton from "react-google-button";
import "react-toastify/dist/ReactToastify.css";

const GeneratePHRID = () => {
  return (
    Math.random().toString(36).substr(2, 5) +
    Math.floor(1000 + Math.random() * 9000)
  );
};

const createUserDoc = async (user: User, phrId: string) => {
  const userDocRef = doc(db, "Users", phrId);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    await setDoc(userDocRef, {
      resourceType: "Patient",
      email: user.email,
      name: [
        {
          use: "official",
          family: user.displayName?.split(" ")[1],
          given: [user.displayName?.split(" ")[0]],
        },
      ],
    });
    toast.update("Update more data for Patient", {
      position: "top-center",
    });
  }
};

const createPHRDoc = async (user: User) => {
  const phrDocRef = doc(db, "PHR", user.uid);
  const phrDoc = await getDoc(phrDocRef);
  const phrId = GeneratePHRID();

  if (phrDoc.exists()) {
    const phrData = phrDoc.data();
    if (user.uid === phrData.googleId) {
      toast.info("User already has a PHR ID", {
        position: "top-center",
      });
      window.location.href = "/profile";
    }
  } else {
    await setDoc(phrDocRef, {
      googleId: user.uid,
      phrId: phrId,
      fhirId: "",
    });
    toast.success("Successfully create new PHR ID", {
      position: "top-center",
    });

    return phrId;
  }
};

const SignIn = () => {
  // const googleSignIn = () => {
  //   signInWithPopup(auth, provider).then(async (result) => {
  //     const credential = GoogleAuthProvider.credentialFromResult(result);

  //     const token = credential?.idToken;
  //     console.log(token, "google token");

  //     const user = result.user;
  //     console.log(user, "user");

  //     if (user) {
  //       try {
  //         // Validate google ID token using backend server
  //         const response = await fetch(
  //           `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`,
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({ token }),
  //           }
  //         );
  //         if (response.ok) {
  //           const data = await response.json();
  //           console.log(data, "tokenInfo");
  //         } else {
  //           throw new Error("Token validation failed");
  //         }
  //       } catch (error) {
  //         console.error("Error validating token:", error);
  //         toast.error("Failed to sign in. Please try again.", {
  //           position: "top-center",
  //         });
  //       }

  //       // create PHR path for user
  //       const phrDocRef = doc(db, "PHR", user.uid);
  //       const phrDoc = await getDoc(phrDocRef);
  //       const phrId = `${
  //         Math.random().toString(36).substr(2, 5) +
  //         Math.floor(1000 + Math.random() * 9000)
  //       }`;
  //       const userDocRef = doc(db, "Users", phrId);
  //       const userDoc = await getDoc(userDocRef);

  //       // check if google ID already has a PHR ID
  //       if (phrDoc.exists()) {
  //         const phrData = phrDoc.data();
  //         if (user.uid === phrData.googleId) {
  //           toast.info("User already has a PHR ID", {
  //             position: "top-center",
  //           });
  //           // window.location.href = "/profile";
  //           window.location.href = "/patient";
  //         }
  //       } else {
  //         await setDoc(phrDocRef, {
  //           googleId: user.uid,
  //           phrId: phrId,
  //           fhirId: "",
  //         });
  //         toast.success("Successfully create new PHR ID", {
  //           position: "top-center",
  //         });

  //         // check if user already has a Patient document
  //         if (!userDoc.exists()) {
  //           await setDoc(userDocRef, {
  //             resourceType: "Patient",
  //             email: user.email,
  //             name: [
  //               {
  //                 use: "official",
  //                 family: user.displayName?.split(" ")[1],
  //                 given: [user.displayName?.split(" ")[0]],
  //               },
  //             ],
  //           });
  //           toast.update("Update more data for Patient", {
  //             position: "top-center",
  //           });
  //         }
  //         window.location.href = "/patient";
  //         // window.location.href = "/profile";
  //       }
  //     }
  //   });
  // };
  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.idToken;
      const user = result.user;

      if (user) {
        try {
          const response = await fetch(
            `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token }),
            }
          );
          if (response.ok) {
            const data = await response.json();
            console.log(data, "tokenInfo");
          } else {
            throw new Error("Token validation failed");
          }
        } catch (error) {
          console.error("Error validating token:", error);
          toast.error("Failed to sign in. Please try again.", {
            position: "top-center",
          });
        }

        const phrId = await createPHRDoc(user);
        if (phrId) {
          await createUserDoc(user, phrId);
          window.location.href = "/patient";
        }
      }
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("Failed to sign in. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <GoogleButton onClick={googleSignIn} />
    </div>
  );
};

export default SignIn;
