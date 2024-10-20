import { useEffect, useState } from "react";
import { auth, provider } from "./Firebase";
import { signInWithPopup } from "firebase/auth";
import App from "./App";
import PatientForm from "./PatientForm";

const SignIn = () => {
  const [value, setValue] = useState("");

  const clickSignIn = () => {
    signInWithPopup(auth, provider).then((data) => {
      if (data.user.email) {
        setValue(data.user.email);
        localStorage.setItem("email", data.user.email);
      }
    });
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    setValue(localStorage.getItem("email") || "");
  }, []);

  return (
    <div>
      {value ? (
        <>
          <PatientForm />
          <button onClick={logout}>Sign Out</button>
        </>
      ) : (
        <>
          <h1>Sign In with Google</h1>
          <button onClick={clickSignIn}>Sign In</button>
        </>
      )}
    </div>
  );
};

export default SignIn;
