import { apiClient } from "@/core/api/apiClient";

export const queueApi = {
  async addToQueue(data: { 
    clinic_id: string; 
    patient_id: string; 
    priority?: number;
    symptoms?: string;
    bp?: string;
    weight?: string;
    temperature?: string;
    pulse?: string;
  }) {
    return apiClient("/queue/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getQueue(clinicId: string, status?: string) {
    const query = status ? `?clinic_id=${clinicId}&status=${status}` : `?clinic_id=${clinicId}`;
    return apiClient(`/queue/${query}`, {
      method: "GET",
    });
  },

  async updateQueueEntry(entryId: string, data: { status?: string; priority?: number }) {
    return apiClient(`/queue/${entryId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },
};
