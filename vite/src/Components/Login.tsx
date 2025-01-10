import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { auth, db, provider } from "../Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import bg from "../assets/bg-phr.png";

const GeneratePHRID = () => {
  return (
    Math.random().toString(36).substr(2, 5) +
    Math.floor(1000 + Math.random() * 9000)
  );
};

const createPHRDoc = async (user: User) => {
  const phrDocRef = doc(db, "PHR", user.uid);
  const phrDoc = await getDoc(phrDocRef);
  const phrId = GeneratePHRID();

  if (!phrDoc.exists()) {
    await setDoc(phrDocRef, {
      googleId: user.uid,
      phrId: phrId,
      fhirId: "",
    });
    toast.success("Successfully create new PHR", {
      position: "top-center",
      autoClose: 3000,
    });

    return phrId;
  } else {
    return phrDoc.data()?.phrId;
  }
};

const Login = () => {
  const navigate = useNavigate();
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
          toast.error("Unvalid Google Account", {
            position: "top-center",
          });
        }

        const phrId = await createPHRDoc(user);
        if (phrId) {
          // await createPatientDoc(user, phrId);
          const createPatientDoc = async (user: User, phrId: string) => {
            const userDocRef = doc(db, "Patient", phrId);
            const userDoc = await getDoc(userDocRef);
            if (!userDoc.exists()) {
              await setDoc(userDocRef, {
                telecom: [
                  {
                    system: "email",
                    value: user.email,
                  },
                ],
                name: [
                  {
                    family: user.displayName?.split(" ")[1],
                    given: [user.displayName?.split(" ")[0]],
                  },
                ],
              });
              toast.info("Complete patient detail data.", {
                position: "top-center",
                autoClose: 3000,
              });
            } else {
              toast.info(`Welcome Back, ${user.displayName}!`, {
                position: "top-center",
                autoClose: 2000,
              });
            }
          };
          navigate("/phr");
          return createPatientDoc(user, phrId);
        }
      }
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("Failed to sign in. Please try again.", {
        position: "top-center",
        autoClose: 3000,
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
        backgroundImage: `url(${bg})`,
      }}
    >
      <button
        style={{
          padding: "10px 15px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          fontSize: "1rem",
          fontWeight: "bold",
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: "5px",
          position: "fixed",
          top: "80px",
          left: "80px",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ marginRight: "5px" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "15px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          margin: "auto",
        }}
      >
        <header
          style={{ marginBottom: "20px", textAlign: "center", width: "100%" }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Welcome to Oncology PHR
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
            width: "100%",
          }}
        >
          <img
            src="https://placehold.co/400x300"
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
          <GoogleButton
            style={{
              fontSize: "1rem",
              cursor: "pointer",
            }}
            onClick={googleSignIn}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
