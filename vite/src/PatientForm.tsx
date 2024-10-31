import React, { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  createPatient,
  readPatient,
  updatePatient,
  deletePatient,
} from "./FhirService";
import "./index.css";
import CryptoJS from "crypto-js";

interface Patient {
  telecom: Array<{
    system: string;
    value: string;
  }>;
  resourceType: string;
  id?: string;
  meta?: {
    profile: Array<string>;
  };
  text?: {
    status: string;
    div: string;
  };
  identifier?: Array<{
    use: string;
    type: {
      coding: Array<{
        system: string;
        code: string;
        display: string;
      }>;
    };
    system: string;
    value: string;
  }>;
  active?: boolean;
  name: Array<{
    use: string;
    family: string;
    given: Array<string>;
  }>;
  gender?: string;
  birthDate?: string;
  communication?: Array<{
    language: {
      coding: Array<{
        system: string;
        code: string;
        display: string;
      }>;
    };
  }>;
  managingOrganization?: {
    reference: string;
  };
  address?: Array<{
    use?: string;
    type?: string;
    text?: string;
    line: Array<string>;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }>;
}

interface PatientErrors {
  name?: string;
  family?: string;
  gender?: string;
  birthDate?: string;
  phone?: string;
  email?: string;
  addressLine?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  patientGuardianName?: string;
  patientGuardianPhone?: string;
}

const PatientForm: React.FC = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [JsonResult, setJsonResult] = useState<Patient | null>(null);

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
  // const [patientGuardianName, setPatientGuardianName] = useState<string>("");
  // const [patientGuardianPhone, setPatientGuardianPhone] = useState<string>("");
  const [errors, setErrors] = useState<PatientErrors>({});

  useEffect(() => {
    if (patient) {
      setName(patient?.name?.[0]?.given?.[0] || "");
      setFamily(patient?.name?.[0]?.family || "");
      setGender(patient?.gender || "");
      setBirthDate(patient?.birthDate || "");
      setPhone(
        patient?.telecom?.find((t) => t.system === "phone")?.value || ""
      );
      setEmail(
        patient?.telecom?.find((t) => t.system === "email")?.value || ""
      );
      setAddressLine(patient?.address?.[0]?.line?.[0] || "");
      setCity(patient?.address?.[0]?.city || "");
      setState(patient?.address?.[0]?.state || "");
      setPostalCode(patient?.address?.[0]?.postalCode || "");
      setCountry(patient?.address?.[0]?.country || "");
      setManagingOrganization(patient?.managingOrganization?.reference || "");
      // setPatientGuardianName(patient?.contact?.[0]?.name?.given?.[0] || "");
      // setPatientGuardianPhone(
      //   patient?.contact?.[0]?.telecom?.find((t) => t.system === "phone")
      //     ?.value || ""
      // );
    }
  }, [patient]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    setErrors({});

    const newErrors: PatientErrors = {};
    if (!name) newErrors.name = "First name is required";
    if (!family) newErrors.family = "Last name is required";
    if (!gender) newErrors.gender = "Gender is required";
    if (!birthDate) newErrors.birthDate = "Birth date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    let generatedId = "";
    if (country === "Indonesia") {
      generatedId =
        "ID" +
        Math.random().toString(36).substr(2, 3) +
        Math.floor(1000 + Math.random() * 9000);
    } else if (country === "America") {
      generatedId =
        "US" +
        Math.random().toString(36).substr(2, 3) +
        Math.floor(1000 + Math.random() * 9000);
    } else if (country === "Taiwan") {
      generatedId =
        "TW" +
        Math.random().toString(36).substr(2, 3) +
        Math.floor(1000 + Math.random() * 9000);
    }

    const newPatient: Patient = {
      resourceType: "Patient",
      id: `${generatedId}`,
      // id: "aaa",
      meta: {
        profile: [
          // "https://twcore.mohw.gov.tw/ig/pas/StructureDefinition/Patient-twpas",
          // "https://hapi.fhir.tw/fhir/StructureDefinition/MITW-T1-SC1-PatientCore",
          "https://hapi.fhir.tw/fhir/StructureDefinition/MITW-T1-SC2-PatientIdentification",
        ],
      },
      text: {
        status: "generated",
        div: '<div xmlns="http://www.w3.org/1999/xhtml">Kiki Fer, a male born on 2024-09-05</div>',
      },
      identifier: [
        {
          use: "official",
          type: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                code: "MR",
                display: "Medical record number",
              },
            ],
          },
          system: "http://hospital.smarthealth.org/identifiers/patients",
          value: "12345",
        },
      ],
      active: true,
      name: [
        {
          use: "official",
          family: family,
          given: [name],
        },
      ],
      gender: gender,
      birthDate: birthDate,
      communication: [
        {
          language: {
            coding: [
              {
                system: "urn:ietf:bcp:47",
                code: "zh-TW",
                display: "Chinese (Taiwan)",
              },
            ],
          },
        },
      ],
      managingOrganization: {
        reference: "Organization/org-hosp-example",
      },
      telecom: [
        {
          system: "phone",
          value: phone,
        },
        {
          system: "email",
          value: email,
        },
      ],
    };

    try {
      const savedPatient = await createPatient(newPatient, false);
      const encryptedPatient = await createPatient(newPatient, true);

      setPatient(encryptedPatient);
      setJsonResult(savedPatient);
      // navigate("/observation", { state: { patientData: savedPatient } });
    } catch (error) {
      console.error("Error saving patient:", error);
    }
  };

  const handleDelete = async (id: string) => {
    await deletePatient(id);
    setPatient(null);
  };

  return (
    <div className="bg-gradient-to-r from-green-100 to-blue-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Patient Form</h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              First Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.name
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Last Name:
            </label>
            <input
              type="text"
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.family
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
            />
            {errors.family && (
              <span className="text-red-500 text-sm">{errors.family}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Gender:
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.gender
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="unknown">Unknown</option>
            </select>
            {errors.gender && (
              <span className="text-red-500 text-sm">{errors.gender}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Birth Date:
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.birthDate
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
            />
            {errors.birthDate && (
              <span className="text-red-500 text-sm">{errors.birthDate}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Phone:
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.phone
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">{errors.phone}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.email
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Address Line:
            </label>
            <input
              type="text"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.addressLine
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
            />
            {errors.addressLine && (
              <span className="text-red-500 text-sm">{errors.addressLine}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              City:
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.city
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
            />
            {errors.city && (
              <span className="text-red-500 text-sm">{errors.city}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              State:
            </label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.state
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
            />
            {errors.state && (
              <span className="text-red-500 text-sm">{errors.state}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Postal Code:
            </label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.postalCode
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
            />
            {errors.postalCode && (
              <span className="text-red-500 text-sm">{errors.postalCode}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Country:
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.country
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
            />
            {errors.country && (
              <span className="text-red-500 text-sm">{errors.country}</span>
            )}
          </div>

          {/* <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Managing Organization:</label>
            <input
              type="text"
              value={managingOrganization}
              onChange={(e) => setManagingOrganization(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.managingOrganization ? 'border-red-500' : 'focus:ring-2 focus:ring-green-500'}`}
            />
            {errors.managingOrganization && <span className="text-red-500 text-sm">{errors.managingOrganization}</span>}
          </div> */}

          {/* <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Patient Guardian Name:
            </label>
            <input
              type="text"
              value={patientGuardianName}
              onChange={(e) => setPatientGuardianName(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.patientGuardianName
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
            />
            {errors.patientGuardianName && (
              <span className="text-red-500 text-sm">
                {errors.patientGuardianName}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Patient Guardian Phone:
            </label>
            <input
              type="tel"
              value={patientGuardianPhone}
              onChange={(e) => setPatientGuardianPhone(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.patientGuardianPhone
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
            />
            {errors.patientGuardianPhone && (
              <span className="text-red-500 text-sm">
                {errors.patientGuardianPhone}
              </span>
            )}
          </div> */}

          <button
            type="submit"
            className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Save Patient
          </button>
        </form>

        {/* Load Patient Button */}
        {/* <div className="mt-4 flex justify-center">
          <button
            onClick={() => handleLoad('patient-id')}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Load Patient
          </button>
        </div> */}

        {/* JSON Result Display */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-inner w-full max-w-lg mt-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Resulting JSON:
          </h2>
          <pre className="bg-white p-4 rounded-md shadow-sm text-sm text-gray-700 overflow-x-auto">
            {JSON.stringify(JsonResult, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;
