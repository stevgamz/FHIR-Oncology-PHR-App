import { useState } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { loginAdmin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginAdmin(email, password);
      navigate("/admin/dashboard");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        style={{
          width: "300px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            marginBottom: "20px",
            color: "#333",
          }}
        >
          Sign In as Admin
        </h1>
        <form onSubmit={handleLogin}>
          <input
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px",
              backgroundColor: "#007bbf",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            type="submit"
          >
            Sign In
          </button>
        </form>
        {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}
        <p style={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>
          Create an account?{" "}
          <a
            style={{
              textDecorationLine: "underline",
              color: "#007bbf",
            }}
            href="/registeradmin"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Admin;
