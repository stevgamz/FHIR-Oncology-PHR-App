import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./Firebase";
import "./index.css";
import { createCondition, readPatient } from "./FhirService";
import { useNavigate } from "react-router-dom";

interface Symptom {
  name: string;
  system: string;
  code: string;
  severities: {
    code: string;
    display: string;
  }[];
}

const symptoms: Symptom[] = [
  /* Patient Health Questionnaire for Current Symptoms */

  /* Jangan dihapus yang ada tandanya karna gua mau nyesuain code nya */
  {
    name: "Fatigue/Weakness",
    system: "http://snomed.info.sct",
    code: "84229001",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  {
    name: "Nausea/Vomiting",
    system: "http://snomed.info.sct",
    code: "11536-9",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  {
    name: "Skin Changes (e.g., rash or dry skin)",
    system: "http://snomed.info.sct",
    code: "128139009",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Joint Pain or Muscle Aches
  {
    name: "Joint Pain or Muscle Aches",
    system: "http://snomed.info.sct",
    code: "3723001",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Swelling of Hands, Feet, Ankles, or Legs
  {
    name: "Swelling of Hands, Feet, Ankles, or Legs",
    system: "http://snomed.info.sct",
    code: "271594007",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Difficulty Breathing or Shortness of Breath
  {
    name: "Difficulty Breathing or Shortness of Breath",
    system: "http://snomed.info.sct",
    code: "267036007",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Heart Palpitations or Racing Heartbeat
  {
    name: "Heart Palpitations or Racing Heartbeat",
    system: "http://snomed.info.sct",
    code: "73595000",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Changes in Mood or Emotional State (e.g., anxiety, depression, irritability)
  {
    name: "Changes in Mood or Emotional State (e.g., anxiety, depression, irritability)",
    system: "http://snomed.info.sct",
    code: "394687007",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // High Blood Pressure
  {
    name: "High Blood Pressure",
    system: "http://snomed.info.sct",
    code: "38341003",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Low Blood Pressure
  {
    name: "Low Blood Pressure",
    system: "http://snomed.info.sct",
    code: "255635007",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Dizziness or Lightheadedness
  {
    name: "Dizziness or Lightheadedness",
    system: "http://snomed.info.sct",
    code: "24700007",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Headache
  {
    name: "Headache",
    system: "http://snomed.info.sct",
    code: "25064002",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Hair Loss or Changes in Hair Texture
  {
    name: "Hair Loss or Changes in Hair Texture",
    system: "http://snomed.info.sct",
    code: "53697002",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Blurred Vision or Other Visual Disturbances
  {
    name: "Blurred Vision or Other Visual Disturbances",
    system: "http://snomed.info.sct",
    code: "44164006",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Dry Eyes
  {
    name: "Dry Eyes",
    system: "http://snomed.info.sct",
    code: "193570009",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Tinnitus (Ringing in the Ears)
  {
    name: "Tinnitus (Ringing in the Ears)",
    system: "http://snomed.info.sct",
    code: "34984008",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Earache
  {
    name: "Earache",
    system: "http://snomed.info.sct",
    code: "57406009",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Hearing Loss
  {
    name: "Hearing Loss",
    system: "http://snomed.info.sct",
    code: "15188001",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Runny Nose
  {
    name: "Runny Nose",
    system: "http://snomed.info.sct",
    code: "386661006",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Stuffy Nose
  {
    name: "Stuffy Nose",
    system: "http://snomed.info.sct",
    code: "49727002",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Mouth Sores
  {
    name: "Mouth Sores",
    system: "http://snomed.info.sct",
    code: "24700007",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Dry Mouth
  {
    name: "Dry Mouth",
    system: "http://snomed.info.sct",
    code: "24700007",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Chest Tightness
  {
    name: "Chest Tightness",
    system: "http://snomed.info.sct",
    code: "29857009",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Palpitations
  {
    name: "Palpitations",
    system: "http://snomed.info.sct",
    code: "73595000",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Constipation or Difficulty Digesting Foods
  {
    name: "Constipation or Difficulty Digesting Foods",
    system: "http://snomed.info.sct",
    code: "25344009",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Abdominal Pain or Cramping
  {
    name: "Abdominal Pain or Cramping",
    system: "http://snomed.info.sct",
    code: "21522001",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Urinary Frequency or Urgency
  {
    name: "Urinary Frequency or Urgency",
    system: "http://snomed.info.sct",
    code: "165232002",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Sexual Dysfunction (Erectile Dysfunction or Decreased Libido)
  {
    name: "Sexual Dysfunction (Erectile Dysfunction or Decreased Libido)",
    system: "http://snomed.info.sct",
    code: "271594007",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },

  /* Patient Health Questionnaire for Side Effects */
  // Proteinuria (Protein in Urine)
  {
    name: "Proteinuria (Protein in Urine)",
    system: "http://snomed.info.sct",
    code: "165232002",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Hand-Foot Syndrome (Tingling, Redness, and Pain in Hands and Feet)
  {
    name: "Hand-Foot Syndrome (Tingling, Redness, and Pain in Hands and Feet)",
    system: "http://snomed.info.sct",
    code: "271594007",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Liver Problems, Including Elevated Liver Enzymes
  {
    name: "Liver Problems, Including Elevated Liver Enzymes",
    system: "http://snomed.info.sct",
    code: "271594007",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Kidney Problems, Including Proteinuria and Decreased Urine Output
  {
    name: "Kidney Problems, Including Proteinuria and Decreased Urine Output",
    system: "http://snomed.info.sct",
    code: "271594007",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Heart Problems, Including Heart Failure, Irregular Heartbeat, or Chest Pain
  {
    name: "Heart Problems, Including Heart Failure, Irregular Heartbeat, or Chest Pain",
    system: "http://snomed.info.sct",
    code: "271594007",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Infusion Reactions, Such as Fever, Chills, Rash, or Difficulty Breathing
  {
    name: "Infusion Reactions, Such as Fever, Chills, Rash, or Difficulty Breathing",
    system: "http://snomed.info.sct",
    code: "271594007",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Pain at the Injection Site
  {
    name: "Pain at the Injection Site",
    system: "http://snomed.info.sct",
    code: "271594007",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Increased Risk of Infections
  {
    name: "Increased Risk of Infections",
    system: "http://snomed.info.sct",
    code: "271594007",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Bleeding, Including Gastrointestinal Bleeding
  {
    name: "Bleeding, Including Gastrointestinal Bleeding",
    system: "http://snomed.info.sct",
    code: "271594007",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Nail Changes, Such as Nail Bed Separation or Brittle Nails
  {
    name: "Nail Changes, Such as Nail Bed Separation or Brittle Nails",
    system: "http://snomed.info.sct",
    code: "271594007",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Fever and Chills
  {
    name: "Fever and Chills",
    system: "http://snomed.info.sct",
    code: "271594007",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Shortness of Breath or Coughing
  {
    name: "Shortness of Breath or Coughing",
    system: "http://snomed.info.sct",
    code: "271594007",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
  // Fingertip Tingling or Numbness (Paresthesia)
  {
    name: "Fingertip Tingling or Numbness (Paresthesia)",
    system: "http://snomed.info.sct",
    code: "271594007",
    severities: [
      { code: "255604002", display: "Mild" },
      { code: "6736007", display: "Moderate" },
      { code: "24484000", display: "Severe" },
    ],
  },
];

interface Condition {
  resourceType: string;
  id: string;
  meta: {
    profile: string[];
  };
  code: {
    coding: {
      system: string;
      code: string;
      display: string;
    }[];
  };
  clinicalStatus: {
    coding: {
      system: string;
      code: string;
      display: string;
    }[];
  };
  category: {
    coding: {
      system: string;
      code: string;
      display: string;
    }[];
    text: string;
  }[];
  severity: {
    coding: {
      system: string;
      code: string;
      display: string;
    }[];
  };
  subject: {
    reference: string;
  };
  onsetDateTime: string;
  recordedDate: string;
}

interface Errors {
  [symptomName: string]: string;
}

const ConditionForm: React.FC = () => {
  const [conditions, setConditions] = useState<{
    [symptomName: string]: string;
  }>({});
  const [jsonResult, setJsonResult] = useState<Condition[]>([]);

  const [clinicalStatus, setClinicalStatus] = useState<string>("");
  const [patientData, setPatientData] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const phrDoc = await getDoc(doc(db, "PHR", user.uid));
          const phrId = phrDoc.data()?.phrId;
          if (phrId) {
            const patientDoc = await getDoc(doc(db, "Patient", phrId));
            const fhirId = patientDoc.data()?.fhirId;

            const mappingDoc = await getDoc(doc(db, "Patient", fhirId));
            const storedMapping = mappingDoc.data()?.mapping;

            const patient = await readPatient(fhirId, storedMapping);
            setPatientData(patient);
            console.log("Patient data:", patient);
          } else {
            console.error("PHR ID does not exist in the database");
          }
        }
      });
    };
    fetchData();
  }, []);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    const newErrors: Errors = {};

    // Validate form
    const conditionResources: Condition[] = [];
    for (const symptom of symptoms) {
      if (!conditions[symptom.name]) {
        newErrors[symptom.name] = `${symptom.name} is required`;
        continue;
      }

      const conditionResource: Condition = {
        resourceType: "Condition",
        id: `c-${Math.random().toString(36).substr(2, 9)}`,
        meta: {
          profile: [
            "https://hapi.fhir.tw/fhir/StructureDefinition/Condition-medical-history",
          ],
        },
        code: {
          coding: [
            {
              system: symptom.system,
              code: symptom.code,
              display: symptom.name,
            },
          ],
        },
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: clinicalStatus,
              display:
                clinicalStatus.charAt(0).toUpperCase() +
                clinicalStatus.slice(1),
            },
          ],
        },
        category: [
          {
            coding: [
              {
                system: "http://loinc.org",
                code: "10164-2",
                display: "History of Present illness Narrative",
              },
            ],
            text: "Problem List Item",
          },
        ],
        severity: {
          coding: [
            {
              system: "http://snomed.info.sct",
              code: conditions[symptom.name],
              display:
                symptom.severities.find(
                  (s) => s.code === conditions[symptom.name]
                )?.display || "Mild",
            },
          ],
        },
        subject: {
          reference: `Patient/${patientData?.id ?? ""}`,
        },
        onsetDateTime: new Date().toISOString(),
        recordedDate: new Date().toISOString(),
      };

      conditionResources.push(conditionResource);
    }

    if (Object.keys(newErrors).length > 0) {
      setConditions({ ...conditions });
      setErrors(newErrors);
      return;
    }

    const newConditions = {
      url: `https://hapi.fhir.tw/fhir/Condition?subject=Patient/${patientData?.id}`,
    };

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const phrDoc = await getDoc(doc(db, "PHR", user.uid));
        const phrId = phrDoc.data()?.phrId;
        const patientDocRef = doc(db, "Patient", phrId);
        const patientDoc = await getDoc(patientDocRef);

        if (!phrId) {
          console.error("PHR ID does not exist in the database");
          return;
        } else {
          await setDoc(patientDocRef, {
            fhirId: patientData?.id,
            name: [
              {
                use: "official",
                family: patientData?.name?.[0]?.family ?? "",
                given: [patientData?.name?.[0]?.given?.[0] ?? ""],
              },
            ],
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
            birthDate: patientData?.birthDate ?? "",
            gender: patientData?.gender ?? "",
            country: patientData?.address?.[0]?.country ?? "",
            managingOrganization: {
              reference: patientData?.managingOrganization?.reference ?? "",
            },
            observations: patientDoc.data()?.observations ?? [],
            conditions: newConditions,
          });

          try {
            const savedConditions = await Promise.all(
              conditionResources.map(createCondition)
            );
            setConditions({ ...conditions });
            setJsonResult(savedConditions);
            console.log("Saved Conditions:", savedConditions);
          } catch (error) {
            console.error("Error saving conditions:", error);
            alert("Failed to save conditions. Please try again.");
          }
        }
      }
    });
  };

  const [errors, setErrors] = useState<Errors>({});
  errors;

  return (
    <div className="bg-gradient-to-r from-green-100 to-blue-100 min-h-screen flex items-center justify-center">
      <button
        style={{
          padding: "10px 15px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          fontSize: "1rem",
          fontWeight: "bold",
          color: "#000",
          position: "fixed",
          left: "50px",
          top: "50px",
        }}
        onClick={() => {
          navigate("/phr");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ marginRight: "5px" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Condition Form
        </h2>
        <form onSubmit={handleSave}>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-200 text-left text-gray-800">
                    Condition
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-center text-gray-800">
                    Mild
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-center text-gray-800">
                    Moderate
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-center text-gray-800">
                    Severe
                  </th>
                </tr>
              </thead>
              <tbody>
                {symptoms.map((symptom) => (
                  <tr key={symptom.name}>
                    <td className="px-4 py-2 border border-gray-200 text-gray-700">
                      {symptom.name}
                    </td>
                    {symptom.severities.map((severity) => (
                      <td
                        key={severity.code}
                        className="px-4 py-2 border border-gray-200 text-center"
                      >
                        <input
                          type="radio"
                          id={`${symptom.name}-${severity.code}`}
                          name={symptom.name}
                          value={severity.code}
                          checked={conditions[symptom.name] === severity.code}
                          onChange={(e) =>
                            setConditions({
                              ...conditions,
                              [symptom.name]: e.target.value,
                            })
                          }
                          className="form-radio h-5 w-5 text-green-500"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Clinical Status:
            </label>
            <select
              value={clinicalStatus}
              onChange={(e) => setClinicalStatus(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="">Select Clinical Status</option>
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
              <option value="remission">Remission</option>
              <option value="relapse">Relapse</option>
              <option value="inactive">Inactive</option>
              <option value="recurrence">Recurrence</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300"
              // onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Submit
            </button>
          </div>
        </form>
        {/* JSON Result Display */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-inner w-full mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Resulting JSON:
          </h2>
          <pre className="bg-white p-4 rounded-md shadow-sm text-sm text-gray-700 overflow-x-auto">
            {JSON.stringify(jsonResult, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ConditionForm;
