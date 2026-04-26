'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ClinicData {
  doctorName: string;
  degree: string;
  specialization: string;
  experience: string;
  clinicName: string;
  city: string;
  address: string;
  phone: string;
  morningStart: string;
  morningEnd: string;
  eveningStart: string;
  eveningEnd: string;
  offDays: string[];
  selectedTemplate: string;
}

const DEFAULT_CLINIC: ClinicData = {
  doctorName: 'Dr. Anil Mehra',
  degree: 'MBBS, MD',
  specialization: 'General Physician',
  experience: '12',
  clinicName: 'Mehra Health Clinic',
  city: 'New Delhi',
  address: 'Shop No. 12, Sector 14 Market, New Delhi – 110001',
  phone: '9876543210',
  morningStart: '09:00',
  morningEnd: '13:00',
  eveningStart: '17:00',
  eveningEnd: '20:00',
  offDays: ['Sunday'],
  selectedTemplate: 't1',
};

interface ClinicContextType {
  clinic: ClinicData;
  setClinic: (data: ClinicData) => void;
}

const ClinicContext = createContext<ClinicContextType>({
  clinic: DEFAULT_CLINIC,
  setClinic: () => {},
});

export function ClinicProvider({ children }: { children: ReactNode }) {
  const [clinic, setClinicState] = useState<ClinicData>(DEFAULT_CLINIC);

  useEffect(() => {
    const saved = localStorage.getItem('clinicflow_clinic');
    if (saved) {
      try { setClinicState(JSON.parse(saved)); } catch {}
    }
  }, []);

  const setClinic = (data: ClinicData) => {
    setClinicState(data);
    localStorage.setItem('clinicflow_clinic', JSON.stringify(data));
  };

  return (
    <ClinicContext.Provider value={{ clinic, setClinic }}>
      {children}
    </ClinicContext.Provider>
  );
}

export const useClinic = () => useContext(ClinicContext);
