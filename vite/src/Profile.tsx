import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "./Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "./index.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Profile: React.FC = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUserDetails = async () => {
    try {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const phrDoc = await getDoc(doc(db, "PHR", user.uid));
          const phrId = phrDoc.data()?.phrId;
          const userDoc = await getDoc(doc(db, "Users", phrId));
          if (userDoc.exists()) {
            setUserDetails(userDoc.data());
          } else {
            console.error("User does not exist in the database");
          }
        }
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails: any) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        const phrDoc = await getDoc(doc(db, "PHR", user.uid));
        const phrId = phrDoc.data()?.phrId;
        await setDoc(doc(db, "Users", phrId), userDetails);
        toast.success("Profile updated successfully", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile", {
        position: "top-center",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      toast.success("Signed out successfully", {
        position: "top-center",
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="bg-gradient-to-b from-teal-100 to-white min-h-screen">
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
          {userDetails ? (
            <>
              <form onSubmit={handleSave}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-600 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="given"
                      value={userDetails.name?.[0]?.given?.[0] || ""}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="family"
                      value={userDetails.name?.[0]?.family || ""}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={
                      userDetails.telecom?.find(
                        (t: { system: string }) => t.system === "email"
                      )?.value || ""
                    }
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={
                      userDetails.telecom?.find(
                        (t: { system: string }) => t.system === "phone"
                      )?.value || ""
                    }
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 mb-2">Address</label>
                  <input
                    type="text"
                    name="line"
                    value={
                      userDetails.telecom?.find(
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
                      userDetails.telecom?.find(
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
                      userDetails.telecom?.find(
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
                      userDetails.telecom?.find(
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
                      userDetails.telecom?.find(
                        (t: { system: string }) => t.system === "country"
                      )?.value || ""
                    }
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="border border-gray-300 text-gray-600 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-teal-600 text-white px-4 py-2 rounded"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
              <button
                onClick={handleSignOut}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
              >
                Sign Out
              </button>
            </>
          ) : (
            <h2>Loading...</h2>
          )}
        </section>
      </main>
      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Profile;
