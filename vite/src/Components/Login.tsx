import { auth, db, provider } from "../Firebase";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import GoogleButton from "react-google-button";
import "react-toastify/dist/ReactToastify.css";
import Pinjol from "../assets/pinjolstip.jpeg";
import bg from "../assets/bg-phr.png";

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
      email: user.email,
      name: [
        {
          given: [user.displayName?.split(" ")[0]],
        },
        {
          family: user.displayName?.split(" ")[1],
        },
      ],
    });
    toast.info("Update more data for Patient", {
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

const Login = () => {
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
        width: "auto",
        margin: "auto",
        justifyContent: "center",
        padding: "20px",
        flexDirection: "column",
        textAlign: "center",
        backgroundImage: `url(${bg})`,
      }}
    >
      <header
        style={{
          marginBottom: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Welcome to PHR
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "#333",
          }}
        >
          Your personal health record manager. Secure, fast, and easy to use.
        </p>
      </header>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "600px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <img
          // src="https://placehold.co/400x300"
          src={Pinjol}
          alt="PHR logo"
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "300px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        />
        <p
          style={{
            fontSize: "1rem",
            color: "#555",
            marginBottom: "20px",
          }}
        >
          Sign in with your Google account to get started.
        </p>
        <GoogleButton onClick={googleSignIn} />
      </div>
    </div>
  );
};

export default Login;