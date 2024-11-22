import React, { useState, useEffect } from "react";
import "./index.css";
import { createCondition } from "./FhirService";

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
    }[];
  };
  category: {
    coding: {
      system: string;
      code: string;
    }[];
  }[];
  severity: {
    coding: {
      system: string;
      code: string;
    }[];
  };
  subject: {
    reference: string;
  };
  onsetDateTime: string;
  recordedDate: string;
}

interface Errors {
  code?: string;
  clinicalStatus?: string;
  category?: string;
  severity?: string;
  subject?: string;
  onsetDateTime?: string;
  recordedDate?: string;
}

const ConditionForm: React.FC = () => {
  const [condition, setCondition] = useState<Condition | null>(null);
  const [jsonResult, setJsonResult] = useState<Condition | null>(null);

  const [code, setCode] = useState<string>("");
  const [clinicalStatus, setClinicalStatus] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [severity, setSeverity] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [onsetDateTime, setOnsetDateTime] = useState<string>("");
  const [recordedDate, setRecordedDate] = useState<string>("");
  const [errors] = useState<Errors>({});

  useEffect(() => {
    if (condition) {
      setCode(condition?.code?.coding?.[0]?.code || "");
      setClinicalStatus(condition?.clinicalStatus?.coding?.[0]?.code || "");
      setCategory(condition?.category?.[0]?.coding?.[0]?.code || "");
      setSeverity(condition?.severity?.coding?.[0]?.code || "");
      setSubject(condition?.subject?.reference || "");
      setOnsetDateTime(condition?.onsetDateTime || "");
      setRecordedDate(condition?.recordedDate || "");
    }
  }, [condition]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const generatedId = Math.floor(Math.random() * 1000);

    const conditionResource: Condition = {
      resourceType: "Condition",
      id: `${generatedId}`,
      meta: {
        profile: [
          "https://hapi.fhir.tw/fhir/StructureDefinition/MITW-T1-SC6-ConditionFoundInEmergencyDepartment",
        ],
      },
      code: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: code,
            display: "Condition code",
          },
        ],
      },
      clinicalStatus: {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
            code: clinicalStatus,
          },
        ],
      },
      category: [
        {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-category",
              code: category,
            },
          ],
        },
      ],
      severity: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: severity,
          },
        ],
      },
      subject: {
        reference: subject,
      },
      onsetDateTime: onsetDateTime,
      recordedDate: recordedDate,
    };

    try {
      const savedCondition = await createCondition(conditionResource);
      setCondition(savedCondition);
      console.log("Saved Condition:", savedCondition);
      setJsonResult(savedCondition);
    } catch (error) {
      console.error("Error saving condition:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-100 to-blue-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Condition Form
        </h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Code:
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.code
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
            />
            {errors.code && (
              <span className="text-red-500 text-sm">{errors.code}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Clinical Status:
            </label>
            <select
              value={clinicalStatus}
              onChange={(e) => setClinicalStatus(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.clinicalStatus
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
            >
              <option value="">Select Clinical Status</option>
              <option value="active">Active</option>
              <option value="recurrence">Recurrence</option>
              <option value="relapse">Relapse</option>
              <option value="inactive">Inactive</option>
              <option value="remission">Remission</option>
              <option value="resolved">Resolved</option>
              <option value="unknown">Unknown</option>
            </select>
            {errors.clinicalStatus && (
              <span className="text-red-500 text-sm">
                {errors.clinicalStatus}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Category:
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.category
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
            />
            {errors.category && (
              <span className="text-red-500 text-sm">{errors.category}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Severity:
            </label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.severity
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
            >
              <option value="">Select Severity</option>
              <option value="255604002">Mild</option>
              <option value="6736007">Moderate</option>
              <option value="24484000">High</option>
            </select>
            {errors.severity && (
              <span className="text-red-500 text-sm">{errors.severity}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Subject:
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.subject
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
            />
            {errors.subject && (
              <span className="text-red-500 text-sm">{errors.subject}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Onset Date Time:
            </label>
            <input
              type="datetime-local"
              value={onsetDateTime}
              onChange={(e) => setOnsetDateTime(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.onsetDateTime
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
            />
            {errors.onsetDateTime && (
              <span className="text-red-500 text-sm">
                {errors.onsetDateTime}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Recorded Date:
            </label>
            <input
              type="date"
              value={recordedDate}
              onChange={(e) => setRecordedDate(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.recordedDate
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
            />
            {errors.recordedDate && (
              <span className="text-red-500 text-sm">
                {errors.recordedDate}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Save Condition
          </button>
        </form>

        {/* JSON Result Display */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-inner w-full max-w-lg mt-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
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
