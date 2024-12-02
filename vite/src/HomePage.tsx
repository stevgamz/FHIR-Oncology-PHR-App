import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./Firebase";
import { readPatient } from "./FhirService";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./index.css";
import Pinjol from "./assets/pinjolstip.jpeg";
import ObservationForm from "./ObservationForm";
import ConditionForm from "./ConditionForm";

// interface PatientDataProps {
//   name: Array<{
//     use: string;
//     family: string;
//     given: Array<string>;
//   }>;
// }

const HomePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [family, setFamily] = useState<string>("");
  const [dataComplete, setDataComplete] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
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
    };
    fetchData();
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

  return (
    <div id="home">
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

      <section className="bg-blue-50 py-12" id="about">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          <div className="md:w-1/2 mb-6 md:mb-0 flex justify-center">
            <img
              src="https://placehold.co/400x400"
              // src={Pinjol}
              alt="Doctor with arms crossed"
              className="rounded-lg shadow-md"
              style={{
                height: "400px",
                width: "400px",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">
              Welcome to Oncology FHIR
            </h2>
            <p className="text-gray-700 mb-6 text-justify">
              Lorem ipsum dolor amet, consectetur adipiscing elit. Nam nec est
              arcu. Suspendisse potenti. Nullam eget ligula eget nisi sodales
              malesuada. Nullam nec dolor nec neque malesuada ultricies. Nulla
              in imperdiet sapien.
            </p>
            <button className="bg-teal-600 text-white py-2 px-6 rounded-full">
              More
            </button>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
            <img
              src="https://placehold.co/400x400"
              // src={Pinjol}
              alt="Doctor holding a stethoscope"
              className="rounded-lg shadow-md"
              style={{ height: "400px", width: "400px", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* <section className="bg-white py-12">
        <div className="container mx-auto flex flex-wrap justify-center space-x-4 px-6">
          <div className="flex items-center space-x-2 mb-4">
            <i className="fas fa-file-alt text-teal-600 text-2xl"></i>
            <a href="#" className="text-teal-600 text-lg">
              Patient Form
            </a>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <i className="fas fa-file-alt text-teal-600 text-2xl"></i>
            <a href="/phr/observation" className="text-teal-600 text-lg">
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
      </section> */}

      <section className="bg-blue-50 py-16">
        <div className="container mx-auto flex justify-center space-x-6">
          <a
            href="/phr/observation"
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition"
          >
            <p className="text-teal-500 font-bold">Observation Form</p>
            <i className="fas fa-arrow-right text-teal-500 mt-2"></i>
          </a>
          <a
            href="/phr/condition"
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition"
          >
            <p className="text-teal-500 font-bold">Condition Form</p>
            <i className="fas fa-arrow-right text-teal-500 mt-2"></i>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default HomePage;
