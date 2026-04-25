'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type Step = 1 | 2 | 3;

const SPECIALIZATIONS = [
  'General Physician', 'Cardiologist', 'Dermatologist',
  'Gynecologist', 'Orthopedic', 'Pediatrician', 'Neurologist',
  'ENT Specialist', 'Ophthalmologist', 'Psychiatrist', 'Dentist', 'Other'
];

export default function ClinicSetup() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [staffList, setStaffList] = useState<string[]>([]);
  const [staffInput, setStaffInput] = useState('');
  const [clinicData, setClinicData] = useState({
    doctorName: '', specialization: '', clinicName: '', city: '', address: '',
  });

  const handleNext = () => {
    if (step < 3) setStep((s) => (s + 1) as Step);
    else router.push('/doctor/dashboard');
  };

  const addStaff = () => {
    if (staffInput.length === 10 && !staffList.includes(staffInput)) {
      setStaffList([...staffList, staffInput]);
      setStaffInput('');
    }
  };

  const removeStaff = (num: string) => {
    setStaffList(staffList.filter((s) => s !== num));
  };

  const stepConfig = [
    { label: 'Doctor Info' },
    { label: 'Clinic Details' },
    { label: 'Add Staff' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-400/10 blur-3xl"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[40%] rounded-full bg-teal-400/10 blur-3xl"></div>
      </div>

      <div className="w-full max-w-xl z-10 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-400 text-white shadow-lg shadow-blue-500/30 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Setup Your Clinic</h1>
          <p className="text-slate-500 mt-1 text-sm">Complete 3 quick steps to get started</p>
        </div>

        {/* Step Progress Bar */}
        <div className="flex items-center justify-center mb-8 gap-0">
          {stepConfig.map((s, idx) => {
            const n = idx + 1;
            const active = n === step;
            const done = n < step;
            return (
              <React.Fragment key={n}>
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${done ? 'bg-emerald-500 text-white' : active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>
                    {done ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    ) : n}
                  </div>
                  <span className={`text-xs font-medium ${active ? 'text-blue-600' : 'text-slate-400'}`}>{s.label}</span>
                </div>
                {idx < stepConfig.length - 1 && (
                  <div className={`h-0.5 w-16 mb-4 mx-1 rounded-full transition-all duration-500 ${done ? 'bg-emerald-400' : 'bg-slate-200'}`}></div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-900/5 border border-white/60 p-8">

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-400">
              <h2 className="text-xl font-bold text-slate-800">Your Professional Details</h2>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Full Name (Dr.)</label>
                <input type="text" value={clinicData.doctorName} onChange={e => setClinicData({ ...clinicData, doctorName: e.target.value })}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800 font-medium"
                  placeholder="e.g. Anil Mehra" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Specialization</label>
                <select value={clinicData.specialization} onChange={e => setClinicData({ ...clinicData, specialization: e.target.value })}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800">
                  <option value="">Select Specialization</option>
                  {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-400">
              <h2 className="text-xl font-bold text-slate-800">Clinic Information</h2>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Clinic Name</label>
                <input type="text" value={clinicData.clinicName} onChange={e => setClinicData({ ...clinicData, clinicName: e.target.value })}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g. Mehra Health Clinic" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">City</label>
                <input type="text" value={clinicData.city} onChange={e => setClinicData({ ...clinicData, city: e.target.value })}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g. New Delhi" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Address</label>
                <textarea rows={3} value={clinicData.address} onChange={e => setClinicData({ ...clinicData, address: e.target.value })}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  placeholder="Full clinic address..." />
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-400">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Add Reception Staff</h2>
                <p className="text-slate-500 text-sm mt-1">Add staff by their mobile number. They can log in using it.</p>
              </div>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">+91</span>
                  <input type="tel" maxLength={10} value={staffInput}
                    onChange={e => setStaffInput(e.target.value.replace(/\D/g, ''))}
                    onKeyDown={e => e.key === 'Enter' && addStaff()}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium tracking-widest"
                    placeholder="Staff mobile no." />
                </div>
                <button onClick={addStaff} disabled={staffInput.length !== 10}
                  className="px-5 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 disabled:opacity-40 transition-all active:scale-95">
                  Add
                </button>
              </div>
              
              {/* Staff List */}
              <div className="space-y-3 max-h-56 overflow-y-auto">
                {staffList.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <p className="text-sm font-medium">No staff added yet. <br />You can also skip and add later.</p>
                  </div>
                ) : staffList.map((num, i) => (
                  <div key={num} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 animate-in fade-in duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">{i + 1}</div>
                      <div>
                        <p className="font-semibold text-slate-800 tracking-wider">+91 {num}</p>
                        <p className="text-xs text-slate-400">Receptionist</p>
                      </div>
                    </div>
                    <button onClick={() => removeStaff(num)} className="text-slate-400 hover:text-red-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-slate-100">
            {step > 1 && (
              <button onClick={() => setStep(s => (s - 1) as Step)}
                className="px-6 py-4 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                Back
              </button>
            )}
            <button onClick={handleNext}
              className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              {step === 3 ? 'Finish & Open Dashboard' : 'Continue'}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
