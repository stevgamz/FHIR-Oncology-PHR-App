import React, { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import "./index.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./Firebase";
import { doc, DocumentData, getDoc, setDoc } from "firebase/firestore";

interface PatientDataProps {
  name: Array<{
    use: string;
    family: string;
    given: Array<string>;
  }>;
}

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    setIsMenuOpen(!isMenuOpen);
    throw new Error("Function not implemented.");
  }

  const userData = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const phrDoc = await getDoc(doc(db, "PHR", user.uid));
          const phrId = phrDoc.data()?.phrId;
          if (!phrId) {
            console.error("PHR ID not found");
            return;
          }
          const userDoc = await getDoc(doc(db, "Users", phrId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const googlePatient = {
              resourceType: "Patient",
              email: userData?.telecom?.[1]?.value,
              name: {
                use: "official",
                family: userData?.name?.[0]?.family,
                given: [userData?.name?.[0]?.given?.[0]],
              },
            };

            setName(googlePatient?.name?.given?.[0] || "");
            setFamily(googlePatient?.name?.family || "");
            setEmail(googlePatient?.email || "");

            console.log(googlePatient, "Patient");
          } else {
            console.error("User does not exist in the database");
          }
        } catch (error) {
          console.error("Error fetching data", error);
        }
      }
    });
  };

  const navigate = useNavigate();
  const [patient, setPatient] = useState<PatientDataProps | null>(null);
  // const [JsonResult, setJsonResult] = useState<Patient | null>(null);

  const [name, setName] = useState<string>("");
  const [family, setFamily] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [addressLine, setAddressLine] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [managingOrganization, setManagingOrganization] = useState<string>("");

  useEffect(() => {
    if (patient) {
      setName(patient?.name?.[0]?.given?.[0] || "");
      setFamily(patient?.name?.[0]?.family || "");
      // setGender(patient?.gender || "");
      // setBirthDate(patient?.birthDate || "");
      // setPhone(
      //   patient?.telecom?.find((t) => t.system === "phone")?.value || ""
      // );
      // setEmail(
      //   patient?.telecom?.find((t) => t.system === "email")?.value || ""
      // );
      // setAddressLine(patient?.address?.[0]?.line?.[0] || "");
      // setCity(patient?.address?.[0]?.city || "");
      // setState(patient?.address?.[0]?.state || "");
      // setPostalCode(patient?.address?.[0]?.postalCode || "");
      // setCountry(patient?.address?.[0]?.country || "");
      // setManagingOrganization(patient?.managingOrganization?.reference || "");
      // setPatientGuardianName(patient?.contact?.[0]?.name?.given?.[0] || "");
      // setPatientGuardianPhone(
      //   patient?.contact?.[0]?.telecom?.find((t) => t.system === "phone")
      //     ?.value || ""
      // );
    }
    userData();
  }, [patient]);

  return (
    <div>
      {/* navbar */}
      <Navbar />

      <section className="relative">
        <img
          src="https://placehold.co/1920x600"
          alt="Woman stretching outdoors"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-full shadow-lg text-center">
            <h2 className="text-2xl font-bold">
              {/* // panggil nama user dari firebase */}
              Welcome, {name} {family}
            </h2>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-12">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <img
              src="https://placehold.co/400x400"
              alt="Doctor with arms crossed"
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">
              Welcome to Oncology FHIR
            </h2>
            <p className="text-gray-700 mb-6">
              Lorem ipsum dolor amet, consectetur adipiscing elit. Nam nec est
              arcu. Suspendisse potenti. Nullam eget ligula eget nisi sodales
              malesuada. Nullam nec dolor nec neque malesuada ultricies. Nulla
              in imperdiet sapien.
            </p>
            <button className="bg-teal-600 text-white py-2 px-6 rounded-full">
              More
            </button>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <img
              src="https://placehold.co/400x400"
              alt="Doctor holding a stethoscope"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto flex flex-wrap justify-center space-x-4 px-6">
          <div className="flex items-center space-x-2 mb-4">
            <i className="fas fa-file-alt text-teal-600 text-2xl"></i>
            <a href="#" className="text-teal-600 text-lg">
              Patient Form
            </a>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <i className="fas fa-file-alt text-teal-600 text-2xl"></i>
            <a href="#" className="text-teal-600 text-lg">
              Observation Form
            </a>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <i className="fas fa-file-alt text-teal-600 text-2xl"></i>
            <a href="#" className="text-teal-600 text-lg">
              Condition Form
            </a>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Index;
