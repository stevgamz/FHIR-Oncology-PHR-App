import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { db } from "../Firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const AdminDashboard = () => {
  const { token, logout } = useAuth();
  const [users, setUsers] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [selectUser, setSelectUser] = useState<any>(null);
  const [adminToken, setAdminToken] = useState<string>("");
  const [detailError, setDetailError] = useState<string | null>(null);

  const fetchData = async () => {
    if (token) {
      try {
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

  const handleShowDetail = (user: any) => {
    setAdminToken("");
    setShowTokenModal(true);
    setSelectUser(user);
  };

  const verifyToken = async (patientId: string): Promise<boolean> => {
    try {
      const tokenDoc = await getDoc(doc(db, "PatientTokens", patientId));
      if (tokenDoc.exists()) {
        const token = tokenDoc.data().token;
        return token === adminToken;
      }
      return false;
    } catch (error) {
      console.error("Error fetching data:", error);
      return false;
    }
  };

  const handleTokenSubmit = async () => {
    if (!selectUser) return;
    const userDoc = await getDoc(doc(db, "Users", selectUser.id));
    const userData = userDoc.data();
    const fhirId = userData ? userData.fhirId : null;
    const isValid = await verifyToken(fhirId);

    if (isValid) {
      console.log(isValid);
      try {
        const detailsDoc = await getDoc(doc(db, "HashMappings", fhirId));
        const detailsData = detailsDoc.data();
        setSelectUser({ ...selectUser, details: detailsData });
        setShowTokenModal(false);
        setDetailError(null);
        setAdminToken("");
      } catch (error) {
        console.error("Error fetching data:", error);
        setDetailError("Failed");
        setAdminToken("");
      }
    } else {
      setDetailError("Invalid Token");
    }
  };

  const handleCancel = () => {
    setShowTokenModal(false);
    setDetailError(null);
    setAdminToken("");
  };

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
                  <th
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    PHR ID
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr key={user.id}>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                      }}
                    >
                      {user.id}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                      }}
                    >
                      <button
                        style={{
                          padding: "8px 12px",
                          backgroundColor: "#007bbf",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleShowDetail(user)}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              {error && (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
              )}
            </div>
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

      {showTokenModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "white",
              textAlign: "center",
            }}
          >
            <h3>Enter Token</h3>
            <input
              type="text"
              value={adminToken}
              onChange={(e) => setAdminToken(e.target.value)}
              style={{
                width: "80%",
                padding: "10px",
                margin: "15px 0",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
            <button
              style={{
                marginRight: "10px",
                padding: "10px",
                backgroundColor: "#007bbf",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={handleTokenSubmit}
            >
              Submit
            </button>
            <button
              style={{
                padding: "10px",
                backgroundColor: "#888",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={handleCancel}
            >
              Cancel
            </button>
            {detailError && (
              <p style={{ color: "red", marginTop: "10px" }}>{detailError}</p>
            )}
          </div>
        </div>
      )}

      {selectUser && selectUser.details && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "1000px",
              height: "450px",
              padding: "20px",
              alignContent: "center",
              borderRadius: "10px",
              backgroundColor: "white",
            }}
          >
            <h3
              style={{
                color: "#333",
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Details for Patient #{selectUser.id}
            </h3>
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <p>
                <strong>Name:</strong> {selectUser.name?.[0]?.given?.[0]}{" "}
                {selectUser.name?.[0]?.family}
              </p>
              <p>
                <strong>Given:</strong> {selectUser.name?.[0]?.given?.[0]}
              </p>
              <p>
                <strong>Family:</strong> {selectUser.name?.[0]?.family}
              </p>
              <p>
                <strong>Gender:</strong> {selectUser.gender}
              </p>
              <p>
                <strong>Birth Date:</strong> {selectUser.birthDate}
              </p>
              <p>
                <strong>Phone:</strong> {selectUser.telecom?.[0]?.value}
              </p>
              <p>
                <strong>Email:</strong> {selectUser.telecom?.[1]?.value}
              </p>
            </div>
            <button
              style={{
                marginTop: "20px",
                padding: "8px 12px",
                backgroundColor: "#888",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => setSelectUser(null)}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
