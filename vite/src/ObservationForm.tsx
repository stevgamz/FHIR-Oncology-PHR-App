import React, { useState, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createObservation } from "./FhirService";
import "./index.css";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./Firebase";
import {
  doc,
  DocumentData,
  getDoc,
  setDoc,
  collection,
} from "firebase/firestore";

interface PatientDataProps {
  id: string;
  name: Array<{
    use: string;
    family: string;
    given: Array<string>;
  }>;
  gender: string;
  birthDate: string;
  telecom?: Array<{
    system: string;
    value: string;
  }>;
  observations?: Observation;
}

interface VitalSignValues {
  bodyWeight: string;
  bodyHeight: string;
  bodyTemperature: string;
  bloodPressureSystolic: string;
  bloodPressureDiastolic: string;
  oxygenSaturation: string;
}

interface Errors {
  [key: string]: string;
}

interface Observation {
  url: string;
}

const ObservationForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [family, setFamily] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const [patientData, setPatientData] = useState<PatientDataProps | null>(null);
  const [vitalSignValues, setVitalSignValues] = useState<VitalSignValues>({
    bodyWeight: "",
    bodyHeight: "",
    bodyTemperature: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    oxygenSaturation: "",
  });
  const [effectiveDateTime, setEffectiveDateTime] = useState<string>("");
  const [status, setStatus] = useState<string>("final");
  const [JsonResult, setJsonResult] = useState<any>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [observations, setObservations] = useState<PatientDataProps | null>(
    null
  );

  useEffect(() => {
    if (location.state?.patientData) {
      setPatientData(location.state.patientData);
      console.log("Patient data received:", location.state.patientData);
    } else {
      console.error("No patient data received");
    }
  }, [location.state]);

  const createBodyWeightObservation = () => ({
    resourceType: "Observation",
    id: `obs-${Math.random().toString(36).substr(2, 9)}`,
    meta: {
      profile: [
        "https://hapi.fhir.tw/fhir/StructureDefinition/Observation.SC1.BodyWeight",
      ],
    },
    text: {
      status: "generated",
      div: `<div xmlns="http://www.w3.org/1999/xhtml">
        Patient: ${patientData?.name?.[0]?.given ?? ""} ${
        patientData?.name?.[0]?.family ?? ""
      }
        Gender: ${patientData?.gender ?? ""}
        DOB: ${patientData?.birthDate ?? ""}
      </div>`,
    },
    status: status,
    category: [
      {
        coding: [
          {
            system:
              "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "vital-signs",
            display: "Vital Signs",
          },
        ],
      },
    ],
    code: {
      coding: [
        {
          system: "http://loinc.org",
          code: "29463-7",
          display: "Body Weight",
        },
      ],
      text: "Body Weight",
    },
    subject: {
      reference: `Patient/${patientData?.id ?? ""}`,
      display: `${patientData?.name?.[0]?.given ?? ""} ${
        patientData?.name?.[0]?.family ?? ""
      }`,
    },
    effectiveDateTime: new Date(effectiveDateTime).toISOString(),
    valueQuantity: {
      value: parseFloat(vitalSignValues.bodyWeight),
      unit: "kg",
      system: "http://unitsofmeasure.org",
      code: "kg",
    },
  });

  const createBodyHeightObservation = () => ({
    resourceType: "Observation",
    id: `obs-${Math.random().toString(36).substr(2, 9)}`,
    meta: {
      profile: [
        "https://hapi.fhir.tw/fhir/StructureDefinition/Observation.SC1.BodyHeight",
      ],
    },
    text: {
      status: "generated",
      div: `<div xmlns="http://www.w3.org/1999/xhtml">
        Patient: ${patientData?.name?.[0]?.given ?? ""} ${
        patientData?.name?.[0]?.family ?? ""
      }
        Gender: ${patientData?.gender ?? ""}
        DOB: ${patientData?.birthDate ?? ""}
      </div>`,
    },
    status: status,
    category: [
      {
        coding: [
          {
            system:
              "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "vital-signs",
            display: "Vital Signs",
          },
        ],
      },
    ],
    code: {
      coding: [
        {
          system: "http://loinc.org",
          code: "3137-7",
          display: "Body height Measured",
        },
      ],
      text: "Body Height",
    },
    subject: {
      reference: `Patient/${patientData?.id ?? ""}`,
      display: `${patientData?.name?.[0]?.given ?? ""} ${
        patientData?.name?.[0]?.family ?? ""
      }`,
    },
    effectiveDateTime: new Date(effectiveDateTime).toISOString(),
    valueQuantity: {
      value: parseFloat(vitalSignValues.bodyHeight),
      unit: "cm",
      system: "http://unitsofmeasure.org",
      code: "cm",
    },
  });

  const createBodyTemperatureObservation = () => ({
    resourceType: "Observation",
    id: `obs-${Math.random().toString(36).substr(2, 9)}`,
    meta: {
      profile: [
        "https://hapi.fhir.tw/fhir/StructureDefinition/Observation.SC1.BodyTemperature",
      ],
    },
    text: {
      status: "generated",
      div: `<div xmlns="http://www.w3.org/1999/xhtml">
        Patient: ${patientData?.name?.[0]?.given ?? ""} ${
        patientData?.name?.[0]?.family ?? ""
      }
        Gender: ${patientData?.gender ?? ""}
        DOB: ${patientData?.birthDate ?? ""}
      </div>`,
    },
    status: status,
    category: [
      {
        coding: [
          {
            system:
              "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "vital-signs",
            display: "Vital Signs",
          },
        ],
      },
    ],
    code: {
      coding: [
        {
          system: "http://loinc.org",
          code: "8310-5",
          display: "Body Temperature",
        },
      ],
      text: "Body Temperature",
    },
    subject: {
      reference: `Patient/${patientData?.id ?? ""}`,
      display: `${patientData?.name?.[0]?.given ?? ""} ${
        patientData?.name?.[0]?.family ?? ""
      }`,
    },
    effectiveDateTime: new Date(effectiveDateTime).toISOString(),
    valueQuantity: {
      value: parseFloat(vitalSignValues.bodyTemperature),
      unit: "°C",
      system: "http://unitsofmeasure.org",
      code: "Cel",
    },
  });

  const createBloodPressureObservation = () => ({
    resourceType: "Observation",
    id: `obs-${Math.random().toString(36).substr(2, 9)}`,
    meta: {
      profile: [
        "https://hapi.fhir.tw/fhir/StructureDefinition/Observation.SC1.BloodPressure",
      ],
    },
    text: {
      status: "generated",
      div: `<div xmlns="http://www.w3.org/1999/xhtml">
        Patient: ${patientData?.name?.[0]?.given ?? ""} ${
        patientData?.name?.[0]?.family ?? ""
      }
        Gender: ${patientData?.gender ?? ""}
        DOB: ${patientData?.birthDate ?? ""}
      </div>`,
    },
    status: status,
    category: [
      {
        coding: [
          {
            system:
              "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "vital-signs",
            display: "Vital Signs",
          },
        ],
      },
    ],
    code: {
      coding: [
        {
          system: "http://loinc.org",
          code: "35094-2",
          display: "Blood Pressure Panel",
        },
      ],
      text: "Blood Pressure",
    },
    subject: {
      reference: `Patient/${patientData?.id ?? ""}`,
      display: `${patientData?.name?.[0]?.given ?? ""} ${
        patientData?.name?.[0]?.family ?? ""
      }`,
    },
    effectiveDateTime: new Date(effectiveDateTime).toISOString(),
    component: [
      {
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "8480-6",
              display: "Systolic Blood Pressure",
            },
          ],
        },
        valueQuantity: {
          value: parseFloat(vitalSignValues.bloodPressureSystolic),
          unit: "mmHg",
          system: "http://unitsofmeasure.org",
          code: "mm[Hg]",
        },
      },
      {
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "8462-4",
              display: "Diastolic Blood Pressure",
            },
          ],
        },
        valueQuantity: {
          value: parseFloat(vitalSignValues.bloodPressureDiastolic),
          unit: "mmHg",
          system: "http://unitsofmeasure.org",
          code: "mm[Hg]",
        },
      },
    ],
  });

  const createOxygenSaturationObservation = () => ({
    resourceType: "Observation",
    id: `obs-${Math.random().toString(36).substr(2, 9)}`,
    meta: {
      profile: [
        // "https://hapi.fhir.tw/fhir/StructureDefinition/Observation.SC1.OxygenSaturation",
        "https://hapi.fhir.tw/fhir/StructureDefinition/Observation.SC1.SpO2",
      ],
    },
    text: {
      status: "generated",
      div: `<div xmlns="http://www.w3.org/1999/xhtml">
        Patient: ${patientData?.name?.[0]?.given ?? ""} ${
        patientData?.name?.[0]?.family ?? ""
      }
        Gender: ${patientData?.gender ?? ""}
        DOB: ${patientData?.birthDate ?? ""}
      </div>`,
    },
    status: status,
    category: [
      {
        coding: [
          {
            system:
              "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "vital-signs",
            display: "Vital Signs",
          },
        ],
      },
    ],
    code: {
      coding: [
        {
          system: "http://loinc.org",
          code: "59408-5",
          display: "Oxygen saturation in Arterial blood by Pulse oximetry",
        },
      ],
      text: "Oxygen Saturation",
    },
    subject: {
      reference: `Patient/${patientData?.id ?? ""}`,
      display: `${patientData?.name?.[0]?.given ?? ""} ${
        patientData?.name?.[0]?.family ?? ""
      }`,
    },
    effectiveDateTime: new Date(effectiveDateTime).toISOString(),
    valueQuantity: {
      value: parseFloat(vitalSignValues.oxygenSaturation),
      unit: "%",
      system: "http://unitsofmeasure.org",
      code: "%",
    },
  });

  const validate = (): Errors => {
    const newErrors: Errors = {};

    Object.entries(vitalSignValues).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1").trim()} is required`;
      }
    });

    if (!effectiveDateTime) {
      newErrors.effectiveDateTime = "Effective Date/Time is required";
    }

    if (!status) {
      newErrors.status = "Status is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const newObservations = {
      url: `https://hapi.fhir.tw/fhir/Observation?category=vital-signs&subject=${patientData?.id}`,
    };

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const phrDocRef = doc(db, "PHR", user.uid);
        const phrDoc = await getDoc(phrDocRef);
        const phrId = phrDoc.data()?.phrId;
        console.log("PHR ID:", phrId);
        const userDocRef = doc(db, "Users", phrId);

        if (!phrId) {
          console.error("PHR ID not found");
          return;
        } else {
          if (phrDoc.data()?.fhirId) {
            await setDoc(userDocRef, {
              ...patientData,
              observations: newObservations,
            });

            const newPatientDatawithObservations: PatientDataProps = {
              ...patientData,
              id: patientData?.id ?? "",
              name: [
                {
                  use: "official",
                  given: [patientData?.name?.[0]?.given?.[0] ?? ""],
                  family: patientData?.name?.[0]?.family ?? "",
                },
              ],
              birthDate: patientData?.birthDate ?? "",
              telecom: [
                {
                  system: "phone",
                  value: patientData?.telecom?.[0].value ?? "",
                },
                {
                  system: "email",
                  value: patientData?.telecom?.[1].value ?? "",
                },
              ],
              gender: patientData?.gender ?? "",
              observations: newObservations,
            };

            setObservations(newPatientDatawithObservations);

            console.log("Observations:", newObservations);
            console.log("Patient data:", newPatientDatawithObservations);

            try {
              const observations = [
                createBodyWeightObservation(),
                createBodyHeightObservation(),
                createBodyTemperatureObservation(),
                createBloodPressureObservation(),
                createOxygenSaturationObservation(),
              ];

              const results = await Promise.all(
                observations.map((obs) => createObservation(obs))
              );

              setJsonResult(results);
              // navigate("/profile", {
              //   state: {
              //     patientData: patientData,
              //     observations: results,
              //   },
              // });
            } catch (error) {
              console.error("Error saving observations:", error);
              setErrors({ submit: "Failed to save observations" });
            }
          }
        }
      }
    });
  };

  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Vital Signs Observation Form
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Body Weight */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Body Weight (kg):
            </label>
            <input
              type="number"
              step="any"
              value={vitalSignValues.bodyWeight}
              onChange={(e) =>
                setVitalSignValues((prev) => ({
                  ...prev,
                  bodyWeight: e.target.value,
                }))
              }
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.bodyWeight
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-purple-500"
              }`}
            />
            {errors.bodyWeight && (
              <span className="text-red-500 text-sm">{errors.bodyWeight}</span>
            )}
          </div>

          {/* Body Height */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Body Height (cm):
            </label>
            <input
              type="number"
              step="any"
              value={vitalSignValues.bodyHeight}
              onChange={(e) =>
                setVitalSignValues((prev) => ({
                  ...prev,
                  bodyHeight: e.target.value,
                }))
              }
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.bodyHeight
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-purple-500"
              }`}
            />
            {errors.bodyHeight && (
              <span className="text-red-500 text-sm">{errors.bodyHeight}</span>
            )}
          </div>

          {/* Body Temperature */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Body Temperature (°C):
            </label>
            <input
              type="number"
              step="any"
              value={vitalSignValues.bodyTemperature}
              onChange={(e) =>
                setVitalSignValues((prev) => ({
                  ...prev,
                  bodyTemperature: e.target.value,
                }))
              }
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.bodyTemperature
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-purple-500"
              }`}
            />
            {errors.bodyTemperature && (
              <span className="text-red-500 text-sm">
                {errors.bodyTemperature}
              </span>
            )}
          </div>

          {/* Blood Pressure Systolic */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Blood Pressure Systolic (mm[Hg]):
            </label>
            <input
              type="number"
              step="any"
              value={vitalSignValues.bloodPressureSystolic}
              onChange={(e) =>
                setVitalSignValues((prev) => ({
                  ...prev,
                  bloodPressureSystolic: e.target.value,
                }))
              }
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.bloodPressureSystolic
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-purple-500"
              }`}
            />
            {errors.bloodPressureSystolic && (
              <span className="text-red-500 text-sm">
                {errors.bloodPressureSystolic}
              </span>
            )}
          </div>

          {/* Blood Pressure Diastolic */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Blood Pressure Diastolic (mm[Hg]):
            </label>
            <input
              type="number"
              step="any"
              value={vitalSignValues.bloodPressureDiastolic}
              onChange={(e) =>
                setVitalSignValues((prev) => ({
                  ...prev,
                  bloodPressureDiastolic: e.target.value,
                }))
              }
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.bloodPressureDiastolic
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-purple-500"
              }`}
            />
            {errors.bloodPressureDiastolic && (
              <span className="text-red-500 text-sm">
                {errors.bloodPressureDiastolic}
              </span>
            )}
          </div>

          {/* Oxygen Saturation */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Oxygen Saturation (%):
            </label>
            <input
              type="number"
              step="any"
              value={vitalSignValues.oxygenSaturation}
              onChange={(e) =>
                setVitalSignValues((prev) => ({
                  ...prev,
                  oxygenSaturation: e.target.value,
                }))
              }
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.oxygenSaturation
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-purple-500"
              }`}
            />
            {errors.oxygenSaturation && (
              <span className="text-red-500 text-sm">
                {errors.oxygenSaturation}
              </span>
            )}
          </div>

          {/* Effective Date/Time */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Effective Date/Time:
            </label>
            <input
              type="datetime-local"
              value={effectiveDateTime}
              onChange={(e) => setEffectiveDateTime(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.effectiveDateTime
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-purple-500"
              }`}
            />
            {errors.effectiveDateTime && (
              <span className="text-red-500 text-sm">
                {errors.effectiveDateTime}
              </span>
            )}
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Status:
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.status
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-purple-500"
              }`}
            >
              <option value="final">Final</option>
              <option value="preliminary">Preliminary</option>
              <option value="amended">Amended</option>
              <option value="corrected">Corrected</option>
            </select>
            {errors.status && (
              <span className="text-red-500 text-sm">{errors.status}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 rounded-md focus:outline-none"
          >
            Submit
          </button>
        </form>

        {/* JSON Result */}
        {JsonResult && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Observation Results
            </h3>
            <pre className="bg-gray-100 p-4 rounded-md">
              {JSON.stringify(JsonResult, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ObservationForm;
function setName(arg0: any) {
  throw new Error("Function not implemented.");
}
