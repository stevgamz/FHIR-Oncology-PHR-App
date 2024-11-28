import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readPatient } from "../FhirService";
import { useAuth } from "./useAuth";
import { db } from "../Firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const [users, setUsers] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [selectUser, setSelectUser] = useState<any>(null);
  const [adminToken, setAdminToken] = useState<string>("");
  const [detailError, setDetailError] = useState<string | null>(null);
  // const [notifications, setNotifications] = useState<string[]>([]);

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

  const processedpatients = useRef(new Set());
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Patient"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const userData = change.doc.data();
          if (!processedpatients.current.has(userData.id)) {
            processedpatients.current.add(userData.id);
            toast.info(
              `New user registered: ${userData?.name?.[0]?.given?.[0]} ${userData?.name?.[0]?.family}`,
              {
                position: "top-left",
                autoClose: 5000,
                style: {
                  width: window.innerWidth >= 768 ? "650px" : "90%",
                  fontSize: window.innerWidth >= 768 ? "16px" : "14px",
                },
              }
            );
          }
        }
      });
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchData();
  }, [token]);

  // const removeNotification = (index: number) => {
  //   setNotifications((prev) => prev.filter((_, i) => i !== index));
  // };

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
    const fhirId = userData?.fhirId;

    const isValid = await verifyToken(fhirId);

    if (!isValid) {
      setDetailError("Invalid token");
      setAdminToken("");
      return;
    }

    const detailsDoc = await getDoc(doc(db, "HashMappings", fhirId));
    const hashMapping = detailsDoc.data()?.mapping;

    const unhashedPatient = await readPatient(fhirId, hashMapping);

    setSelectUser({ ...unhashedPatient, details: unhashedPatient });
    setShowTokenModal(false);
    setDetailError(null);
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
        background: "linear-gradient(to bottom, #CCFBF1, #FFFFFF)",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "1000px",
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
        {/* <div>
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
        </div> */}
        <div>
          {users ? (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px",
                fontSize: "18px",
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
                    Patient
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    TargetURL
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
                        wordBreak: "break-word",
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
                          fontSize: "14px",
                        }}
                        onClick={() => handleShowDetail(user)}
                      >
                        Details
                      </button>
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        wordBreak: "break-word",
                      }}
                    >
                      {user.observations?.url || "N/A"}
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
            backgroundColor: "#E53935",
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
              width: "90%",
              maxWidth: "400px",
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
                width: "100%",
                marginBottom: "10px",
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
                width: "100%",
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
              width: "90%",
              maxWidth: "1000px",
              height: "auto",
              padding: "20px",
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
                textAlign: "left",
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
