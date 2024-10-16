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

// Define types for Patient, Observation, Condition, and any other relevant types.
interface Patient {
  id?: string;
  // Add other necessary fields for Patient resource
}

interface Observation {
  id?: string;
  // Add other necessary fields for Observation resource
}

interface Condition {
  id?: string;
  // Add other necessary fields for Condition resource
}

// Uncomment and type this function if authorization is needed
// async function getAuthorizationToken(): Promise<string | null> {
//   const url = 'http://172.18.0.58:8080/realms/mitw/protocol/openid-connect/token';
//   const data = new URLSearchParams({
//     grant_type: 'client_credentials',
//     client_id: 'fhir-basic',
//     client_secret: 'UPa9VGhlwrInNup2W8PBldrxanWWsKW4',
//   });

//   try {
//     const response = await axios.post(url, data, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     });
//     const token = response.data.access_token;
//     return `Bearer ${token}`;
//   } catch (error) {
//     console.error('Error fetching authorization token:', error);
//     return null;
//   }
// }

export const createPatient = async (patient: Patient): Promise<any> => {
  // const token = await getAuthorizationToken();
  const response = await fetch(`${baseUrl}/Patient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/fhir+json",
      // 'Authorization': token,
    },
    body: JSON.stringify(patient),
  });
  return response.json();
};

export const readPatient = async (id: string): Promise<any> => {
  // const token = await getAuthorizationToken();
  const response = await fetch(`${baseUrl}/Patient/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/fhir+json",
      // 'Authorization': token,
    },
  });
  return response.json();
};

export const updatePatient = async (patient: Patient): Promise<any> => {
  // const token = await getAuthorizationToken();
  const response = await fetch(`${baseUrl}/Patient/${patient.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/fhir+json",
      // 'Authorization': token,
    },
    body: JSON.stringify(patient),
  });
  return response.json();
};

export const deletePatient = async (id: string): Promise<Response> => {
  // const token = await getAuthorizationToken();
  const response = await fetch(`${baseUrl}/Patient/${id}`, {
    method: "DELETE",
    headers: {
      // 'Authorization': token,
    },
  });
  return response;
};

export const createObservation = async (
  observation: Observation
): Promise<any> => {
  // const token = await getAuthorizationToken();
  const response = await fetch(`${baseUrl}/Observation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/fhir+json",
      // Authorization: token,
    },
    body: JSON.stringify(observation),
  });
  return response.json();
};

export const readObservation = async (id: string): Promise<any> => {
  // const token = await getAuthorizationToken();
  const response = await fetch(`${baseUrl}/Observation/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/fhir+json",
      // Authorization: token,
    },
  });
  return response.json();
};

export const updateObservation = async (
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

export const deleteObservation = async (id: string): Promise<Response> => {
  const response = await fetch(`${baseUrl}/Observation/${id}`, {
    method: "DELETE",
  });
  return response;
};

export const createCondition = async (condition: Condition): Promise<any> => {
  // const token = await getAuthorizationToken();
  const response = await fetch(`${baseUrl}/Condition`, {
    method: "POST",
    headers: {
      "Content-Type": "application/fhir+json",
      // Authorization: token,
    },
    body: JSON.stringify(condition),
  });
  return response.json();
};

export const readCondition = async (id: string): Promise<any> => {
  // const token = await getAuthorizationToken();
  const response = await fetch(`${baseUrl}/Condition/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/fhir+json",
      // Authorization: token,
    },
  });
  return response.json();
};

export const updateCondition = async (condition: Condition): Promise<any> => {
  const response = await fetch(`${baseUrl}/Condition/${condition.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/fhir+json",
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
