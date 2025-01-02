import { useState } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { createOrganization } from "../FhirService";
import { toast } from "react-toastify";

interface Organization {
  resourceType: string;
  id: string;
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
      }>;
    };
    system: string;
    value: string;
  }>;
  type?: Array<{
    coding: Array<{
      system: string;
      code: string;
    }>;
  }>;
  name: string;
}

interface OrganizationError {
  name?: string;
  country?: string;
}

const RegisterOrganization = () => {
  const { registerOrganization } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState<OrganizationError>({});
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError({});

    const errors: OrganizationError = {};
    if (!name) errors.name = "Organization name is required";
    if (!country) errors.country = "Country is required";

    if (Object.keys(errors).length > 0) {
      return setError(errors);
    }

    let generateId = "";
    if (country === "Taiwan") {
      generateId = "TW" + Math.floor(1000 + Math.random() * 9000);
    } else if (country === "America" && "Amerika") {
      generateId = "US" + Math.floor(1000 + Math.random() * 9000);
    } else if (country === "Indonesia") {
      generateId = "ID" + Math.floor(1000 + Math.random() * 9000);
    }

    const organization: Organization = {
      resourceType: "Organization",
      id: generateId,
      meta: {
        profile: [
          "https://hapi.fhir.tw/fhir/StructureDefinition/TWCoreOrganization",
        ],
      },
      text: {
        status: "generated",
        div: `<div xmlns='http://www.w3.org/1999/xhtml'> Healthcare: ${name}</div>`,
      },
      identifier: [
        {
          use: "official",
          type: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                code: "PRN",
              },
            ],
          },
          system:
            "https://twcore.mohw.gov.tw/ig/twcore/CodeSystem/organization-identifier-tw",
          value: "1234567890",
        },
      ],
      type: [
        {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/organization-type",
              code: "prov",
            },
          ],
        },
      ],
      name: name,
    };

    try {
      const newOrganization: Organization = organization;
      console.log(newOrganization, "newOrganization");

      const fhirOrganization = await createOrganization(newOrganization);

      if (fhirOrganization) {
        await registerOrganization(email, password);

        const organizationDoc = doc(db, "Organizations", name);
        await setDoc(organizationDoc, {
          organizationId: generateId,
          name,
          email,
          country,
          role: "admin",
        });

        toast.success("Successfully register organization", {
          position: "top-center",
          autoClose: 3000,
        });
      }
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Failed to register organization", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        style={{
          width: "500px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            marginBottom: "20px",
            color: "#333",
          }}
        >
          Register Organization
        </h1>
        <input
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
          type="text"
          placeholder="Organization Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={error.name ? "border border-red-500" : ""}
        />
        {error.name && (
          <p className="text-red-500 text-sm text-left">{error.name}</p>
        )}
        <input
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className={error.country ? "border border-red-500" : ""}
        />
        {error.country && (
          <p className="text-red-500 text-sm text-left">{error.country}</p>
        )}
        <button
          style={{
            width: "50%",
            padding: "10px",
            marginTop: "10px",
            backgroundColor: "#007bbf",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleSubmit}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterOrganization;
