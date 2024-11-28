import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "./Firebase";
import { readPatient } from "./FhirService";
import { doc, getDoc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./index.css";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [patientDetails, setPatientDetails] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      // onAuthStateChanged(auth, async (user) => {
      const user = auth.currentUser;
      if (user) {
        const phrDoc = await getDoc(doc(db, "PHR", user.uid));
        const phrId = phrDoc.data()?.phrId;
        if (phrId) {
          const patientDoc = await getDoc(doc(db, "Patient", phrId));
          const fhirId = patientDoc.data()?.fhirId;

          if (fhirId) {
            const mappingDoc = await getDoc(doc(db, "HashMappings", fhirId));
            const storedMapping = mappingDoc.data()?.mapping;
            const patient = await readPatient(fhirId, storedMapping);
            setPatientDetails(patient);
          } else {
            setPatientDetails(patientDoc.data());
          }
        } else {
          console.error("PHR ID does not exist in the database");
        }
      } else {
        await auth.signOut();
      }
      // });
    };
    fetchData();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      toast.success("Signed out successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div
      className="bg-gradient-to-b from-teal-100 to-white min-h-screen"
      id="profile"
    >
      {/* NAVBAR */}
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-8">
          <h2 className="text-4xl font-bold text-teal-600">Profile</h2>
          <p className="text-gray-600 mt-4">
            Lorem ipsum dolor sit amet consectetur. A nec sit volutpat ut
            pellentesque adipiscing eros mi. Vulputate scelerisque vitae quis
            aliquam magna. Euismod diam mauris neque platea non sapien. Lectus
            neque urna facilisi eu dolor sit iaculis molestie risus.
          </p>
        </section>
        <section className="bg-white shadow-md rounded-lg p-8">
          {patientDetails ? (
            <>
              {/* <form onSubmit={handleSave}> */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-600 mb-2">First Name</label>
                  <input
                    type="text"
                    name="given"
                    value={patientDetails?.name[0].given[0]}
                    // onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="family"
                    value={patientDetails.name[0].family}
                    // onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    disabled
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">
                  Date of Birth
                </label>
                <input
                  type="text"
                  name="birthDate"
                  value={patientDetails.birthDate}
                  // onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Gender</label>
                <input
                  type="text"
                  name="gender"
                  value={patientDetails.gender}
                  // onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={
                    patientDetails.telecom?.find(
                      (t: { system: string }) => t.system === "email"
                    )?.value
                  }
                  // onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Phone</label>
                <input
                  type="phone"
                  name="phone"
                  value={
                    patientDetails.telecom?.find(
                      (t: { system: string }) => t.system === "phone"
                    )?.value
                  }
                  // onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  disabled
                />
              </div>
              {/* <div className="mb-4">
                  <label className="block text-gray-600 mb-2">Address</label>
                  <input
                    type="text"
                    name="line"
                    value={
                      patientDetails.telecom?.find(
                        (t: { system: string }) => t.system === "address"
                      )?.value || ""
                    }
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={
                      patientDetails.telecom?.find(
                        (t: { system: string }) => t.system === "city"
                      )?.value || ""
                    }
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={
                      patientDetails.telecom?.find(
                        (t: { system: string }) => t.system === "state"
                      )?.value || ""
                    }
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={
                      patientDetails.telecom?.find(
                        (t: { system: string }) => t.system === "postalCode"
                      )?.value || ""
                    }
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={
                      patientDetails.telecom?.find(
                        (t: { system: string }) => t.system === "country"
                      )?.value || ""
                    }
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                </div> */}
              <div className="flex justify-end space-x-4">
                {/* <button
                    type="button"
                    className="border border-gray-300 text-gray-600 px-4 py-2 rounded"
                  >
                    Cancel
                  </button> */}
                <button
                  onClick={() => navigate("/profile/edit")}
                  className="bg-teal-600 text-white px-4 py-2 rounded"
                >
                  Edit Profile
                </button>
              </div>
              {/* </form> */}
              <button
                onClick={handleSignOut}
                className="flex mx-auto mt-4 bg-red-600 text-white px-4 py-2 rounded"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <h2>Loading...</h2>
              <button
                onClick={handleSignOut}
                className="flex mx-auto mt-4 bg-red-600 text-white px-4 py-2 rounded"
              >
                Sign Out
              </button>
            </>
          )}
        </section>
      </main>
      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Profile;
