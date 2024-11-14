// import axios from "axios";

// const baseUrl = "https://hapi.fhir.tw/fhir";
// // const baseUrl = 'http://172.18.0.53:10004/fhir';

// // async function getAuthorizationToken() {
// //   const url = 'http://172.18.0.58:8080/realms/mitw/protocol/openid-connect/token';
// //   const data = new URLSearchParams({
// //     grant_type: 'client_credentials',
// //     client_id: 'fhir-basic',
// //     client_secret: 'UPa9VGhlwrInNup2W8PBldrxanWWsKW4',
// //   });

// //   try {
// //     const response = await axios.post(url, data, {
// //       headers: {
// //         'Content-Type': 'application/x-www-form-urlencoded',
// //       },
// //     });
// //     const token = response.data.access_token;
// //     return `Bearer ${token}`;

// //   } catch (error) {
// //     console.error('Error fetching authorization token:', error);
// //     return null;
// //   }
// // }

// // export default getAuthorizationToken;

// export const createPatient = async (patient) => {
//   // const token = await getAuthorizationToken();
//   const response = await fetch(`${baseUrl}/Patient`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/fhir+json",
//       // 'Authorization': token,
//     },
//     body: JSON.stringify(patient),
//   });
//   return response.json();
// };

// export const readPatient = async (id) => {
//   // const token = await getAuthorizationToken();
//   const response = await fetch(`${baseUrl}/Patient/${id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/fhir+json",
//       // 'Authorization': token,
//     },
//   });
//   return response.json();
// };

// export const updatePatient = async (patient) => {
//   // const token = await getAuthorizationToken();
//   const response = await fetch(`${baseUrl}/Patient/${patient.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/fhir+json",
//       // 'Authorization': token,
//     },
//     body: JSON.stringify(patient),
//   });
//   return response.json();
// };

// export const deletePatient = async (id) => {
//   // const token = await getAuthorizationToken();
//   const response = await fetch(`${baseUrl}/Patient/${id}`, {
//     method: "DELETE",
//     headers: {
//       // 'Authorization': token,
//     },
//   });
//   return response;
// };

// // export const readPatient = async (id) => {
// //   // const token = await getAuthorizationToken();
// //   const response = await fetch(`${baseUrl}/Patient/${id}`, {
// //     method: 'GET',
// //     headers: {
// //       'Content-Type': 'application/fhir+json',
// //       // 'Authorization': token,
// //     }
// //   });
// //   return response.json();
// // }

// // export const createPatient = async (patient) => {
// //   const response = await fetch(`${baseUrl}/Patient`, {
// //     method: 'POST',
// //     headers: {
// //       'Content-Type': 'application/fhir+json',
// //     },
// //     body: JSON.stringify(patient),
// //   });
// //   return response.json();
// // };

// // export const readPatient = async (id) => {
// //   const response = await fetch(`${baseUrl}/Patient/${id}`, {
// //     method: 'GET',
// //   });
// //   return response.json();
// // };

// // export const updatePatient = async (patient) => {
// //   const response = await fetch(`${baseUrl}/Patient/${patient.id}`, {
// //     method: 'PUT',
// //     headers: {
// //       'Content-Type': 'application/fhir+json',
// //     },
// //     body: JSON.stringify(patient),
// //   });
// //   return response.json();
// // };

// // export const deletePatient = async (id) => {
// //   const response = await fetch(`${baseUrl}/Patient/${id}`, {
// //     method: 'DELETE',
// //   });
// //   return response;
// // };

// export const createObservation = async (observation) => {
//   // const token = await getAuthorizationToken();
//   const response = await fetch(`${baseUrl}/Observation`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/fhir+json",
//       // Authorization: token,
//     },
//     body: JSON.stringify(observation),
//   });
//   return response.json();
// };

// export const readObservation = async (id) => {
//   // const token = await getAuthorizationToken();
//   const response = await fetch(`${baseUrl}/Observation/${id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/fhir+json",
//       // Authorization: token,
//     },
//   });
//   return response.json();
// };

// //Observation
// // export const createObservation = async (observation) => {
// //   const response = await fetch(`${baseUrl}/Observation`, {
// //     method: 'POST',
// //     headers: {
// //       'Content-Type': 'application/fhir+json',
// //     },
// //     body: JSON.stringify(observation),
// //   });
// //   return response.json();
// // };

// // export const readObservation = async (id) => {
// //   const response = await fetch(`${baseUrl}/Observation/${id}`, {
// //     method: 'GET',
// //   });
// //   return response.json();
// // };

// export const updateObservation = async (observation) => {
//   const response = await fetch(`${baseUrl}/Observation/${observation.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/fhir+json",
//     },
//     body: JSON.stringify(observation),
//   });
//   return response.json();
// };

// export const deleteObservation = async (id) => {
//   const response = await fetch(`${baseUrl}/Observation/${id}`, {
//     method: "DELETE",
//   });
//   return response;
// };

// export const createCondition = async (condition) => {
//   // const token = await getAuthorizationToken();
//   const response = await fetch(`${baseUrl}/Condition`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/fhir+json",
//       // Authorization: token,
//     },
//     body: JSON.stringify(condition),
//   });
//   return response.json();
// };

// export const readCondition = async (id) => {
//   // const token = await getAuthorizationToken();
//   const response = await fetch(`${baseUrl}/Condition/${id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/fhir+json",
//       // Authorization: token,
//     },
//   });
//   return response.json();
// };

// export const updateCondition = async (condition) => {
//   const response = await fetch(`${baseUrl}/Condition/${condition.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/fhir+json",
//     },
//     body: JSON.stringify(condition),
//   });
//   return response.json();
// };

// export const deleteCondition = async (id) => {
//   const response = await fetch(`${baseUrl}/Condition/${id}`, {
//     method: "DELETE",
//   });
//   return response;
// };

// import axios from "axios";

const baseUrl = "https://hapi.fhir.tw/fhir";
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
  token?: string;
  // address?: Array<{
  //   use?: string;
  //   type?: string;
  //   text?: string;
  //   line: Array<string>;
  //   city: string;
  //   state: string;
  //   postalCode: string;
  //   country: string;
  // }>;
}

interface Observation {
  id?: string;
  // code: string;
  // value: string;
}

interface Condition {
  id?: string;
}

export const createPatient = async (
  patient: Patient,
  hashSensitiveFields = true
): Promise<any> => {
  const dataToSend = hashSensitiveFields
    ? {
        ...patient,
        name: patient.name.map((n) => ({
          ...n,
          family: CryptoJS.SHA256(n.family).toString(),
          given: n.given.map((g) => CryptoJS.SHA256(g).toString()),
        })),
        telecom: patient.telecom.map((t) => ({
          ...t,
          value: CryptoJS.SHA256(t.value).toString(),
        })),
      }
    : patient;

  const response = await fetch(`${baseUrl}/Patient/${patient.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/fhir+json",
    },
    body: JSON.stringify(dataToSend),
  });

  return response.json();
};

export const readPatient = async (id: string): Promise<any> => {
  const response = await fetch(`${baseUrl}/Patient/${id}`, {
    method: "GET",
    // headers: {
    //   "Content-Type": "application/fhir+json",
    // },
  });
  return response.json();
};

export const updatePatient = async (patient: Patient): Promise<any> => {
  const getResponse = await fetch(`${baseUrl}/Patient/${patient.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/fhir+json",
    },
  });

  const eTag = getResponse.headers.get("ETag");

  const response = await fetch(`${baseUrl}/Patient/${patient.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/fhir+json",
      "If-Match": eTag || "",
    },
    body: JSON.stringify(patient),
  });
  return response.json();
};

export const deletePatient = async (id: string): Promise<Response> => {
  const response = await fetch(`${baseUrl}/Patient/${id}`, {
    method: "DELETE",
  });
  return response;
};

export const createObservation = async (
  observation: Observation
): Promise<any> => {
  const response = await fetch(`${baseUrl}/Observation/${observation.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/fhir+json",
    },
    body: JSON.stringify(observation),
  });
  return response.json();
};

export const readObservation = async (id: string): Promise<any> => {
  const response = await fetch(`${baseUrl}/Observation/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/fhir+json",
    },
  });
  return response.json();
};

export const updateObservation = async (
  observation: Observation
): Promise<any> => {
  // First, get the ETag of the current resource
  const getResponse = await fetch(`${baseUrl}/Observation/${observation.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/fhir+json",
    },
  });

  const eTag = getResponse.headers.get("ETag");

  const response = await fetch(`${baseUrl}/Observation/${observation.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/fhir+json",
      "If-Match": eTag || "", // Use ETag for optimistic concurrency control
    },
    body: JSON.stringify(observation),
  });
  return response.json();
};

export const deleteObservation = async (id: string): Promise<Response> => {
  const response = await fetch(`${baseUrl}/Observation/${id}`, {
    method: "DELETE",
  });
  return response;
};

export const createCondition = async (condition: Condition): Promise<any> => {
  const response = await fetch(`${baseUrl}/Condition`, {
    method: "POST",
    headers: {
      "Content-Type": "application/fhir+json",
    },
    body: JSON.stringify(condition),
  });
  return response.json();
};

export const readCondition = async (id: string): Promise<any> => {
  const response = await fetch(`${baseUrl}/Condition/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/fhir+json",
    },
  });
  return response.json();
};

export const updateCondition = async (condition: Condition): Promise<any> => {
  // First, get the ETag of the current resource
  const getResponse = await fetch(`${baseUrl}/Condition/${condition.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/fhir+json",
    },
  });

  const eTag = getResponse.headers.get("ETag");

  const response = await fetch(`${baseUrl}/Condition/${condition.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/fhir+json",
      "If-Match": eTag || "", // Use ETag for optimistic concurrency control
    },
    body: JSON.stringify(condition),
  });
  return response.json();
};

export const deleteCondition = async (id: string): Promise<Response> => {
  const response = await fetch(`${baseUrl}/Condition/${id}`, {
    method: "DELETE",
  });
  return response;
};
