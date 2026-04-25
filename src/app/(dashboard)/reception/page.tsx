'use client';

import React, { useState, useEffect } from 'react';
import { useClinic } from '@/store/clinic-context';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { VitalsGrid } from '@/components/shared/VitalsGrid';
import { ClinicSidebar } from '@/components/shared/ClinicSidebar';

type FlowState = 'search' | 'loading' | 'history' | 'new_patient' | 'vitals' | 'token';

interface PatientVitals {
  bp: string; weight: string; temperature: string; pulse: string;
}

export default function ReceptionDashboard() {
  const { clinic } = useClinic();
  const [mobileNumber, setMobileNumber] = useState('');
  const [flowState, setFlowState] = useState<FlowState>('search');
  const [patientData, setPatientData] = useState({ name: '', age: '', gender: '', symptoms: '' });
  const [vitals, setVitals] = useState<PatientVitals>({ bp: '', weight: '', temperature: '', pulse: '' });
  const [token, setToken] = useState('');

  useEffect(() => {
    if (mobileNumber.length === 10 && flowState === 'search') {
      setFlowState('loading');
      setTimeout(() => {
        if (mobileNumber.endsWith('1')) {
          setPatientData({ name: 'Rahul Sharma', age: '34', gender: 'Male', symptoms: 'Fever and headache' });
          setFlowState('history');
        } else {
          setFlowState('new_patient');
        }
      }, 1500);
    }
  }, [mobileNumber, flowState]);

  const handlePatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFlowState('vitals');
  };

  const handleVitalsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFlowState('loading');
    setTimeout(() => {
      const initial = clinic.doctorName.trim().replace(/^Dr\.\s*/i, '')[0]?.toUpperCase() ?? 'D';
      const tokenNum = String(Math.floor(Math.random() * 99) + 1).padStart(3, '0');
      setToken(`${initial}-${tokenNum}`);
      setFlowState('token');
    }, 1000);
  };

  const resetFlow = () => {
    setMobileNumber('');
    setPatientData({ name: '', age: '', gender: '', symptoms: '' });
    setVitals({ bp: '', weight: '', temperature: '', pulse: '' });
    setToken('');
    setFlowState('search');
  };

  const progress = flowState === 'search' ? 10 : flowState === 'loading' ? 40 : flowState === 'new_patient' || flowState === 'history' ? 60 : flowState === 'vitals' ? 80 : 100;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">

      {/* Sidebar */}
      <ClinicSidebar 
        clinicName={clinic.clinicName}
        subtitle="Reception Desk"
        doctorName={clinic.doctorName}
        specialization={clinic.specialization}
        navItems={[
          { id: 'entry', icon: '➕', label: 'Patient Entry' },
          { id: 'queue', icon: '📋', label: 'Queue Management' },
        ]}
        activeId="entry"
      />

      {/* Main */}
      <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">

        {/* Mobile top bar */}
        <div className="flex justify-between items-center md:hidden mb-6 print:hidden">
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">{clinic.clinicName}</h2>
            <p className="text-xs text-slate-500">Reception Desk</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">R</div>
        </div>

        {/* Page title with breadcrumb */}
        <div className="mb-8 print:hidden">
          <Breadcrumbs 
            items={[
              { label: 'Home', href: '/', icon: '🏠' },
              { label: 'Doctor Dashboard', href: '/doctor/dashboard' },
              { label: 'Reception', isCurrent: flowState === 'search' },
              ...(flowState !== 'search' && flowState !== 'loading' ? [{
                label: flowState === 'new_patient' ? 'New Patient' : flowState === 'history' ? 'Existing Patient' : flowState === 'vitals' ? 'Vitals' : 'Token Generated',
                isCurrent: true
              }] : [])
            ]}
          />
          <h1 className="text-3xl font-bold text-slate-900">Patient Check-in</h1>
          <p className="text-slate-500 mt-2">Enter mobile number to search <strong>{clinic.clinicName}</strong> patient database.</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">

          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-slate-100 print:hidden">
            <div className={`h-full bg-blue-600 transition-all duration-700 ease-out`} style={{ width: `${progress}%` }}></div>
          </div>

          <div className="p-6 md:p-10">

            {/* Step 1: Search */}
            <div className={`${flowState !== 'search' && flowState !== 'loading' ? 'hidden' : 'block'} print:hidden`}>
              <label htmlFor="search" className="block text-lg font-semibold text-slate-800 mb-4">Patient Mobile Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-400 font-medium border-r border-slate-200 pr-3">+91</span>
                </div>
                <input id="search" type="tel" maxLength={10} value={mobileNumber}
                  onChange={e => { const v = e.target.value.replace(/\D/g, ''); setMobileNumber(v); if (v.length < 10) setFlowState('search'); }}
                  disabled={flowState === 'loading'}
                  className="block w-full pl-16 pr-12 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-2xl font-semibold tracking-widest text-slate-800 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-70 placeholder:text-slate-300 placeholder:font-normal placeholder:tracking-normal"
                  placeholder="Enter 10 digits" />
                {flowState === 'loading' && (
                  <div className="absolute inset-y-0 right-4 flex items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  </div>
                )}
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-2 mt-3">
                <span className="text-emerald-500">✓</span>
                Searches only <strong>{clinic.clinicName}</strong> database. Auto-triggers at 10 digits.
              </p>
            </div>

            {/* Step 2a: Patient Form (New or History) */}
            {(flowState === 'history' || flowState === 'new_patient') && (
              <form onSubmit={handlePatientSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 print:hidden">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">
                      {flowState === 'history' ? 'Existing Patient' : 'New Patient Registration'}
                    </h3>
                    <p className="text-slate-500 font-medium mt-1">+91 {mobileNumber}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${flowState === 'history' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                    {flowState === 'history' ? '✓ Found' : 'New Entry'}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Full Name *</label>
                    <input type="text" required value={patientData.name} onChange={e => setPatientData(p => ({ ...p, name: e.target.value }))}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Patient name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Age *</label>
                      <input type="number" required value={patientData.age} onChange={e => setPatientData(p => ({ ...p, age: e.target.value }))}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Yrs" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Gender *</label>
                      <select required value={patientData.gender} onChange={e => setPatientData(p => ({ ...p, gender: e.target.value }))}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none">
                        <option value="">Select</option>
                        <option>Male</option><option>Female</option><option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Chief Complaint / Symptoms</label>
                  <textarea rows={2} value={patientData.symptoms} onChange={e => setPatientData(p => ({ ...p, symptoms: e.target.value }))}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                    placeholder="e.g. Fever, headache since 2 days..." />
                </div>
                <div className="flex gap-4 pt-4 border-t border-slate-100">
                  <button type="button" onClick={resetFlow} className="px-6 py-4 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold shadow-md transition-all active:scale-[0.98]">
                    Next: Record Vitals →
                  </button>
                </div>
              </form>
            )}

            {/* Step 2b: Vitals */}
            {flowState === 'vitals' && (
              <form onSubmit={handleVitalsSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 print:hidden">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Record Vitals</h3>
                  <p className="text-slate-500 mt-1 font-medium">{patientData.name} • {patientData.age} yrs • {patientData.gender}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Blood Pressure', key: 'bp', placeholder: '120/80 mmHg' },
                    { label: 'Weight (kg)', key: 'weight', placeholder: '70 kg' },
                    { label: 'Temperature', key: 'temperature', placeholder: '98.6°F' },
                    { label: 'Pulse (bpm)', key: 'pulse', placeholder: '72 bpm' },
                  ].map(({ label, key, placeholder }) => (
                    <div key={key} className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">{label} <span className="text-slate-400 font-normal">(optional)</span></label>
                      <input
                        value={vitals[key as keyof PatientVitals]}
                        onChange={e => setVitals(v => ({ ...v, [key]: e.target.value }))}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                        placeholder={placeholder}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setFlowState(flowState === 'vitals' ? 'new_patient' : 'history')}
                    className="px-6 py-4 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">← Back</button>
                  <button type="submit" className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-600/20 transition-all active:scale-[0.98]">
                    Save & Generate Token →
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Token */}
            {flowState === 'token' && (
              <div className="animate-in fade-in zoom-in-95 duration-500">
                <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 md:p-12 text-center bg-white">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mb-6 print:hidden text-3xl">✓</div>
                  <h4 className="text-slate-500 font-medium uppercase tracking-widest mb-2">Token Number</h4>
                  <h2 className="text-6xl font-extrabold text-slate-900 tracking-tighter mb-6">{token}</h2>

                  <div className="bg-slate-50 p-6 rounded-2xl text-left max-w-sm mx-auto border border-slate-100 space-y-3">
                    <div>
                      <p className="text-slate-400 text-xs mb-1 font-semibold uppercase tracking-wider">Patient</p>
                      <p className="font-bold text-slate-800 text-lg">{patientData.name}</p>
                      <p className="text-slate-600">{patientData.age} yrs • {patientData.gender} • +91 {mobileNumber}</p>
                    </div>
                    <VitalsGrid vitals={vitals} variant="slate" />
                  </div>

                  <p className="mt-6 text-sm text-slate-400">{clinic.clinicName} • {clinic.doctorName} • {new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 print:hidden">
                  <button
                    onClick={() => {
                      const params = new URLSearchParams({
                        name: patientData.name, age: patientData.age,
                        gender: patientData.gender, symptoms: patientData.symptoms,
                        token, mobile: mobileNumber,
                        bp: vitals.bp, weight: vitals.weight,
                        temperature: vitals.temperature, pulse: vitals.pulse,
                      });
                      window.open(`/prescription/print?${params.toString()}`, '_blank');
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]">
                    🖨️ Print Prescription
                  </button>
                  <button onClick={resetFlow}
                    className="flex-1 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-md transition-all active:scale-[0.98]">
                    Next Patient →
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
