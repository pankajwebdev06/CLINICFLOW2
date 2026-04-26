import { apiClient } from "@/core/api/apiClient";

export const patientsApi = {
  async createPatient(data: { name: string; mobile_number: string; age: number; gender: string; clinic_id: string }) {
    return apiClient("/patients/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getPatients(clinicId: string) {
    return apiClient(`/patients/?clinic_id=${clinicId}`, {
      method: "GET",
    });
  },
};
