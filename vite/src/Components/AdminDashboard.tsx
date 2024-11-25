import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { db } from "../Firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { readPatient } from "../FhirService";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const [users, setUsers] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [selectUser, setSelectUser] = useState<any>(null);
  const [adminToken, setAdminToken] = useState<string>("");
  const [detailError, setDetailError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);

  const fetchData = async () => {
    if (token) {
      try {
        const userCollection = collection(db, "Patient");
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
    const unsubscribe = onSnapshot(collection(db, "Patient"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const userData = change.doc.data();
          setNotifications((prev) => [
            ...prev,
            `New user registered: ${userData?.name?.[0]?.given?.[0]} ${userData?.name?.[0]?.family}`,
          ]);
          setTimeout(() => {
            setNotifications((prev) =>
              prev.filter((notification) => notification !== prev[0])
            );
          }, 5000);
        }
      });
    });

    return () => unsubscribe();
  }, []);

  const removeNotification = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
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
    const userDoc = await getDoc(doc(db, "Patient", selectUser.id));
    const userData = userDoc.data();
    const fhirId = userData ? userData.fhirId : null;
    const isValid = await verifyToken(fhirId);

    if (isValid) {
      console.log(isValid);
      try {
        const detailsDoc = await getDoc(doc(db, "HashMappings", fhirId));
        const detailsData = detailsDoc.data();
        const hashMapping = detailsData ? detailsData.hashMapping : null;

        const unhashedPatient = await readPatient(fhirId, hashMapping);
        console.log(unhashedPatient, "Unhashed Patient: ");

        setSelectUser({ ...selectUser, details: unhashedPatient, fhirId });

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
    navigate("/admin");
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
          {notifications.map((notification, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#e0ffe0",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "5px",
                position: "relative",
              }}
            >
              {notification}
              <button
                onClick={() => removeNotification(index)}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "10px",
                  background: "none",
                  border: "none",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
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
                    Actions
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
                          padding: "5px 10px",
                          backgroundColor: "#007bff",
                          color: "white",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleShowDetail(user)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div> {error && <p style={{ color: "red" }}>{error}</p>}</div>
          )}
        </div>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
          }}
          onClick={handleSignOut}
        >
          Sign Out
        </button>

        {showTokenModal && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Enter Admin Token</h3>
            <input
              type="text"
              value={adminToken}
              onChange={(e) => setAdminToken(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            {detailError && <p style={{ color: "red" }}>{detailError}</p>}
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
              }}
              onClick={handleTokenSubmit}
            >
              Submit
            </button>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#888",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

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
