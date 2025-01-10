import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./Firebase";
import {
  deleteConditionByPatientId,
  deleteObservationByPatientId,
  readPatient,
} from "./FhirService";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./index.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [family, setFamily] = useState<string>("");
  const [dataComplete, setDataComplete] = useState<boolean>(false);

  const fetchData = auth.onAuthStateChanged(async (user) => {
    if (user) {
      const phrDoc = await getDoc(doc(db, "PHR", user.uid));
      const phrId = phrDoc.data()?.phrId;
      if (phrId) {
        const patientDoc = await getDoc(doc(db, "Patient", phrId));
        const fhirId = patientDoc.data()?.fhirId;
        let patient;
        if (fhirId) {
          const mappingDoc = await getDoc(doc(db, "HashMappings", fhirId));
          const storedMapping = mappingDoc.data()?.mapping;
          patient = await readPatient(fhirId, storedMapping);
        } else {
          patient = patientDoc.data();
        }
        setName(patient.name[0].given[0]);
        setFamily(patient.name[0].family);

        const isComplete =
          patient.name[0].given[0] &&
          patient.name[0].family &&
          patient.gender &&
          patient.birthDate &&
          patient.telecom?.[0].value &&
          patient.telecom?.[1].value;

        setDataComplete(!!isComplete);
      } else {
        console.error("PHR ID does not exist in the database");
        await auth.signOut();
      }
    }
  });
  useEffect(() => {
    fetchData;
  }, []);

  const handleNavigate = (path: string) => {
    if (dataComplete) {
      navigate(path);
    } else {
      scroll(0, 0);
      // alert("Please complete your profile first");
      toast.error("Please complete your profile first", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const deleteCondition = (id: string) => {
    // id = "IDegl1656";
    deleteConditionByPatientId(id);
    deleteObservationByPatientId(id);
  };

  return (
    <div id="home">
      {/* navbar */}
      <Navbar />

      <section className="relative">
        <img
          src="https://placehold.co/1920x600"
          alt="Woman stretching outdoors"
          className="w-full h-96 md:h-auto object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold">
              {/* // panggil nama user dari firebase */}
              Welcome, {name} {family}
            </h2>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-12" id="about">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6">
            <div className="md:w-1/3 flex justify-center">
              <img
                src="https://placehold.co/400x400"
                alt="Doctor with arms crossed"
                className="rounded-lg shadow-md object-cover w-full max-w-md"
              />
            </div>

            <div className="md:w-1/3 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {/* Welcome to Oncology FHIR */}
                Welcome to Oncology PHR
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">
                Discover a seamless way to manage your personal health records.
                Our platform is designed to empower you with easy access and
                secure management of your oncology health information.
              </p>
              <div className="mt-6">
                <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-full shadow-md transition duration-200">
                  More
                </button>
              </div>
            </div>

            <div className="md:w-1/3 flex justify-center">
              <img
                src="https://placehold.co/400x400"
                alt="Doctor holding a stethoscope"
                className="rounded-lg shadow-md object-cover w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto flex justify-center space-x-6">
          {/* <a
            href="/phr/observation"
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition"
          >
            <p className="text-teal-500 font-bold">Observation Form</p>
            <i className="fas fa-arrow-right text-teal-500 mt-2"></i>
          </a> */}
          <button
            onClick={() => handleNavigate("/phr/observation")}
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition"
          >
            <p className="text-teal-600 font-bold">Observation Form</p>
            <i className="fas fa-arrow-right text-teal-500 mt-2"></i>
          </button>
          <button
            onClick={() => handleNavigate("/phr/condition")}
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition"
          >
            <p className="text-teal-600 font-bold">Condition Form</p>
            <i className="fas fa-arrow-right text-teal-500 mt-2"></i>
          </button>
          <button
            onClick={() => deleteCondition("ID4175816")}
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition"
          >
            <p className="text-teal-600 font-bold">Delete Condition</p>
            <i className="fas fa-arrow-right text-teal-500 mt-2"></i>
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default HomePage;
