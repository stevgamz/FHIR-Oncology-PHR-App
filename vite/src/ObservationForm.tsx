import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createObservation } from "./FhirService";
import "./index.css";

interface VitalSignOption {
  label: string;
  code: string;
  inputs: string[];
  unit: string;
}

interface PatientData {
  id: string;
  name: string;
  family: string;
  gender: string;
  birthDate: string;
}

interface VitalSignValues {
  [key: string]: {
    [key: string]: string;
  };
}

interface Errors {
  [key: string]: string;
}

const vitalSignOptions: VitalSignOption[] = [
  {
    label: "Blood Pressure Panel",
    code: "35094-2",
    inputs: ["mmHg"],
    unit: "mm[Hg]",
  },
  {
    label: "Blood Pressure Systolic",
    code: "8480-6",
    inputs: ["mmHg"],
    unit: "mm[Hg]",
  },
  {
    label: "Blood Pressure Diastolic",
    code: "8462-4",
    inputs: ["mmHg"],
    unit: "mm[Hg]",
  },
  {
    label: "Glucose [Mass/volume] in Blood",
    code: "2339-0",
    inputs: ["mg/dL"],
    unit: "mg/dL",
  },
  {
    label: "Glucose [Mass/volume] in Blood --pre-meal",
    code: "88365-2",
    inputs: ["mg/dL"],
    unit: "mg/dL",
  },
  {
    label: "Glucose [Mass/volume] in Blood --post meal",
    code: "87422-2",
    inputs: ["mg/dL"],
    unit: "mg/dL",
  },
  {
    label: "Capillary refill [Time] of Nail bed",
    code: "44963-7",
    inputs: ["s"],
    unit: "s",
  },
  {
    label: "Heart Rate",
    code: "8867-4",
    inputs: ["{beats}/min"],
    unit: "beats/min",
  },
  {
    label: "Respiratory Rate",
    code: "9279-1",
    inputs: ["{breaths}/min"],
    unit: "breaths/min",
  },
  {
    label: "Percentage of body fat Measured",
    code: "41982-0",
    inputs: ["%"],
    unit: "%",
  },
  {
    label: "Heart rate by Pulse oximeter",
    code: "8889-8",
    inputs: ["{beats}/min"],
    unit: "beats/min",
  },
  {
    label: "Oxygen saturation in Arterial blood by Pulse oximetry",
    code: "59408-5",
    inputs: ["%"],
    unit: "%",
  },
  {
    label: "Grip strength Hand - right Dynamometer",
    code: "83174-3",
    inputs: ["kg"],
    unit: "kg",
  },
  { label: "Body Temperature", code: "8310-5", inputs: ["Cel"], unit: "°C" },
  { label: "Body height Measured", code: "3137-7", inputs: ["cm"], unit: "cm" },
  { label: "Body Weight", code: "29463-7", inputs: ["kg"], unit: "kg" },
  {
    label: "Body Mass Index",
    code: "39156-5",
    inputs: ["value"],
    unit: "kg/m2",
  },
  {
    label: "Head Circumference",
    code: "9843-4",
    inputs: ["value"],
    unit: "cm",
  },
  { label: "Body Surface Area", code: "3141-9", inputs: ["value"], unit: "m2" },
];

const ObservationForm: React.FC = () => {
  const navigate = useNavigate();
  const [observation, setObservation] = useState<any>(null);
  const { state } = useLocation();
  const patientData: PatientData = state?.patientData;

  const [selectedVitalSigns, setSelectedVitalSigns] = useState<string[]>([]);

  const [vitalSignValues, setVitalSignValues] = useState<VitalSignValues>({});
  const [effectiveDateTime, setEffectiveDateTime] = useState<string>("");
  const [status, setStatus] = useState<string>("final");
  const [JsonResult, setJsonResult] = useState<any>(null);
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): Errors => {
    const newErrors: Errors = {};
    if (selectedVitalSigns.length === 0)
      newErrors.selectedVitalSigns = "At least one vital sign must be selected";

    selectedVitalSigns.forEach((sign) => {
      const selectedOption = vitalSignOptions.find(
        (option) => option.code === sign
      );
      if (selectedOption) {
        selectedOption.inputs.forEach((input) => {
          if (!vitalSignValues[sign] || !vitalSignValues[sign][input]) {
            newErrors[`${sign}-${input}`] = `${
              input.charAt(0).toUpperCase() + input.slice(1)
            } value is required`;
          }
        });
      }
    });

    if (!effectiveDateTime)
      newErrors.effectiveDateTime = "Effective Date/Time is required";
    if (!status) newErrors.status = "Status is required";
    return newErrors;
  };

  const handleVitalSignChange = (
    e: ChangeEvent<HTMLInputElement>,
    code: string
  ) => {
    if (e.target.checked) {
      setSelectedVitalSigns([...selectedVitalSigns, code]);
    } else {
      setSelectedVitalSigns(selectedVitalSigns.filter((sign) => sign !== code));
      setVitalSignValues((prevValues) => {
        const { [code]: _, ...rest } = prevValues;
        return rest;
      });
    }
    setErrors({});
  };

  const handleValueChange = (code: string, input: string, value: string) => {
    setVitalSignValues((prevValues) => ({
      ...prevValues,
      [code]: {
        ...prevValues[code],
        [input]: value,
      },
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});

      const sign = selectedVitalSigns[0];
      const selectedOption = vitalSignOptions.find(
        (option) => option.code === sign
      );
      if (selectedOption) {
        const valueQuantities = selectedOption.inputs.map((input) => ({
          value: parseFloat(vitalSignValues[sign][input]),
          unit: selectedOption.unit,
          system: "http://unitsofmeasure.org",
          code: selectedOption.inputs,
        }));

        const generatedId = Math.floor(Math.random() * 1000);
        const observation = {
          resourceType: "Observation",
          id: `${generatedId}`,
          meta: {
            profile: [
              "https://hapi.fhir.tw/fhir/StructureDefinition/Observation.SC1.BodyWeight",
            ],
          },
          text: {
            status: "generated",
            div: `<div xmlns="http://www.w3.org/1999/xhtml">${patientData.name} ${patientData.family}, a ${patientData.gender} born on ${patientData.birthDate}</div>`,
          },
          status,
          category: [
            {
              coding: [
                {
                  system:
                    "http://terminology.hl7.org/CodeSystem/observation-category",
                  code: selectedOption.label.includes(
                    "Glucose [Mass/volume] in Blood"
                  )
                    ? "laboratory"
                    : selectedOption.label.includes(
                        "Glucose [Mass/volume] in Blood --pre-meal"
                      )
                    ? "laboratory"
                    : selectedOption.label.includes(
                        "Glucose [Mass/volume] in Blood --post meal"
                      )
                    ? "laboratory"
                    : selectedOption.label.includes(
                        "Capillary refill [Time] of Nail bed"
                      )
                    ? "exam"
                    : "vital-signs",
                  display: selectedOption.label.includes(
                    "Glucose [Mass/volume] in Blood"
                  )
                    ? "Laboratory"
                    : selectedOption.label.includes(
                        "Glucose [Mass/volume] in Blood --pre-meal"
                      )
                    ? "Laboratory"
                    : selectedOption.label.includes(
                        "Glucose [Mass/volume] in Blood --post meal"
                      )
                    ? "Laboratory"
                    : selectedOption.label.includes(
                        "Capillary refill [Time] of Nail bed"
                      )
                    ? "Exam"
                    : "Vital Signs",
                },
              ],
            },
          ],
          code: {
            coding: [
              {
                system: "http://loinc.org",
                code: selectedOption.code,
                display: selectedOption.label,
              },
            ],
            text: selectedOption.label,
          },
          subject: {
            reference: `Patient/${patientData.id}`,
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
                value: 90,
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
                value: 90,
                unit: "mmHg",
                system: "http://unitsofmeasure.org",
                code: "mm[Hg]",
              },
            },
          ],
        };
        try {
          let savedObservation;
          savedObservation = await createObservation(observation);
          setObservation(savedObservation);
          console.log("Saved Observation:", savedObservation);
          setJsonResult(savedObservation);
          navigate("/condition", { state: { patientData: savedObservation } });
        } catch (error) {
          console.error("Error saving observation:", error);
        }
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Vital Signs Observation Form
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Select Vital Signs:
            </label>
            {vitalSignOptions.map((option) => (
              <div key={option.code} className="mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={option.code}
                    checked={selectedVitalSigns.includes(option.code)}
                    onChange={(e) => handleVitalSignChange(e, option.code)}
                    className="form-checkbox h-5 w-5 text-purple-600"
                  />
                  <span className="ml-2 text-gray-700">{option.label}</span>
                </label>
              </div>
            ))}
            {errors.selectedVitalSigns && (
              <span className="text-red-500 text-sm">
                {errors.selectedVitalSigns}
              </span>
            )}
          </div>

          {selectedVitalSigns.map((sign) => {
            const selectedOption = vitalSignOptions.find(
              (option) => option.code === sign
            );
            return (
              <div key={sign} className="mb-4">
                {selectedOption?.inputs.map((input) => (
                  <div key={input} className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">{`${
                      selectedOption.label
                    } - ${
                      input.charAt(0).toUpperCase() + input.slice(1)
                    }`}</label>
                    <input
                      type="number"
                      step="any"
                      value={vitalSignValues[sign]?.[input] || ""}
                      onChange={(e) =>
                        handleValueChange(sign, input, e.target.value)
                      }
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                        errors[`${sign}-${input}`]
                          ? "border-red-500"
                          : "focus:ring-2 focus:ring-purple-500"
                      }`}
                    />
                    {errors[`${sign}-${input}`] && (
                      <span className="text-red-500 text-sm">
                        {errors[`${sign}-${input}`]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            );
          })}

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
              <option value="amended">Amended</option>
              <option value="cancelled">Cancelled</option>
              <option value="entered-in-error">Entered in Error</option>
              <option value="unknown">Unknown</option>
            </select>
            {errors.status && (
              <span className="text-red-500 text-sm">{errors.status}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Submit Observation
          </button>
        </form>

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

export default ObservationForm;
