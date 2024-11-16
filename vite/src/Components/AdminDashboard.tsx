import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";

const AdminDashboard = () => {
  const { token, logout } = useAuth();
  const [users, setUsers] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (token) {
      try {
        console.log(token, "admin token");

        // const response = await fetch(
        //   `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
        // );

        // if (!response.ok) {
        //   throw new Error("Token validation failed");
        // }

        const userCollection = collection(db, "Users");
        const usersSnapshot = await getDocs(userCollection);
        const usersList = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed");
      }
    } else {
      setError("Token not found");
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleSignOut = async () => {
    await logout();
    window.location.href = "/admin";
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
          width: "1000px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            color: "#333",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Admin Dashboard
        </h2>
        <div>
          {users ? (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px",
              }}
            >
              <thead>
                <tr>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    PHR ID
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Name
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr key={user.id}>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {user.id}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {user.name[0].given[0]}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <button
                        style={{
                          padding: "5px",
                          backgroundColor: "#007bbf",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            // users.map((user: any) => (
            //   <div key={user.id}>
            //     <p>{user.name[0].given[0]}</p>
            //     <p>{user.telecom[1].value}</p>
            //   </div>
            // ))
            <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
          )}
        </div>
        <button
          style={{
            width: "25%",
            padding: "10px",
            marginTop: "20px",
            backgroundColor: "#007bbf",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
