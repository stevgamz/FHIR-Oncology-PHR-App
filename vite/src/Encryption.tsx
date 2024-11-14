import CryptoJS from "crypto-js";

// Define the Patient type
interface Patient {
  name: { family: string; given: string[] }[];
  birthDate?: string;
  telecom: { value: string }[];
}

interface EncryptedData {
  data: string;
  iv: string;
}

export class EncryptionService {
  private static readonly KEY_SIZE = 256;
  private static readonly ITERATION_COUNT = 1000;
  private static readonly SECRET_KEY =
    process.env.REACT_APP_ENCRYPTION_KEY || "your-secret-key";

  static generateSecureToken(patientId: string): string {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const timestamp = new Date().getTime();
    const baseString = `${patientId}-${timestamp}-${this.SECRET_KEY}`;

    const token = CryptoJS.PBKDF2(baseString, salt, {
      keySize: this.KEY_SIZE / 32,
      iterations: this.ITERATION_COUNT,
    }).toString();

    return token;
  }

  static encryptField(value: string, token: string): string {
    const key = CryptoJS.PBKDF2(token, this.SECRET_KEY, {
      keySize: this.KEY_SIZE / 32,
      iterations: this.ITERATION_COUNT,
    });
    return CryptoJS.AES.encrypt(value, key.toString()).toString();
  }

  static decryptField(encryptedValue: string, token: string): string {
    try {
      const key = CryptoJS.PBKDF2(token, this.SECRET_KEY, {
        keySize: this.KEY_SIZE / 32,
        iterations: this.ITERATION_COUNT,
      });
      const decrypted = CryptoJS.AES.decrypt(encryptedValue, key.toString());
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Decryption failed:", error);
      return encryptedValue;
    }
  }

  static encryptPatient(patient: Patient, token: string): Patient {
    return {
      ...patient,
      name: patient.name.map((n: { family: string; given: string[] }) => ({
        ...n,
        family: this.encryptField(n.family, token),
        given: n.given.map((g: string) => this.encryptField(g, token)),
      })),
      birthDate: patient.birthDate
        ? this.encryptField(patient.birthDate, token)
        : undefined,
      telecom: patient.telecom.map((t: { value: string }) => ({
        ...t,
        value: this.encryptField(t.value, token),
      })),
    };
  }

  static decryptPatient(patient: Patient, token: string): Patient {
    return {
      ...patient,
      name: patient.name.map((n) => ({
        ...n,
        family: this.decryptField(n.family, token),
        given: n.given.map((g) => this.decryptField(g, token)),
      })),
      birthDate: patient.birthDate
        ? this.decryptField(patient.birthDate, token)
        : undefined,
      telecom: patient.telecom.map((t) => ({
        ...t,
        value: this.decryptField(t.value, token),
      })),
    };
  }
}

export default EncryptionService;
