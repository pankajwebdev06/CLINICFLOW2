'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useClinic, ClinicData } from '@/lib/clinic-context';

type Step = 1 | 2 | 3 | 4;

const SPECIALIZATIONS = [
  'General Physician','Cardiologist','Dermatologist','Gynecologist',
  'Orthopedic','Pediatrician','Neurologist','ENT Specialist',
  'Ophthalmologist','Psychiatrist','Dentist','Other',
];

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

export default function ClinicSetup() {
  const router = useRouter();
  const { setClinic } = useClinic();

  const [step, setStep] = useState<Step>(1);
  const [staffList, setStaffList] = useState<string[]>([]);
  const [staffInput, setStaffInput] = useState('');
  const [form, setForm] = useState<ClinicData>({
    doctorName: '', degree: '', specialization: '', experience: '',
    clinicName: '', city: '', address: '', phone: '',
    morningStart: '09:00', morningEnd: '13:00',
    eveningStart: '17:00', eveningEnd: '20:00',
    offDays: ['Sunday'],
  });

  const update = (k: keyof ClinicData, v: string) => setForm(f => ({ ...f, [k]: v }));
  const toggleDay = (day: string) => {
    setForm(f => ({
      ...f,
      offDays: f.offDays.includes(day)
        ? f.offDays.filter(d => d !== day)
        : [...f.offDays, day],
    }));
  };

  const handleNext = () => {
    if (step < 4) { setStep(s => (s + 1) as Step); return; }
    setClinic(form);
    router.push('/doctor/dashboard');
  };

  const addStaff = () => {
    if (staffInput.length === 10 && !staffList.includes(staffInput)) {
      setStaffList(l => [...l, staffInput]);
      setStaffInput('');
    }
  };

  const stepConfig = [
    { label: 'Doctor Info' },
    { label: 'Clinic Details' },
    { label: 'Timings' },
    { label: 'Add Staff' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[40%] rounded-full bg-teal-400/10 blur-3xl" />
      </div>

      <div className="w-full max-w-xl z-10 relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-400 text-white shadow-lg shadow-blue-500/30 mb-4 font-black text-lg">CF</div>
          <h1 className="text-2xl font-extrabold text-slate-900">Setup Your Clinic</h1>
          <p className="text-slate-500 mt-1 text-sm">Complete {stepConfig.length} quick steps to get started</p>
          <nav className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium mt-3">
            <a href="/" className="hover:text-blue-600 transition-colors">🏠 Home</a>
            <span>›</span>
            <span className="text-slate-600 font-semibold">Clinic Setup</span>
            <span>›</span>
            <span className="text-blue-600 font-semibold">Step {step} of {stepConfig.length}</span>
          </nav>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center mb-8">
          {stepConfig.map((s, idx) => {
            const n = idx + 1;
            const active = n === step;
            const done = n < step;
            return (
              <React.Fragment key={n}>
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${done ? 'bg-emerald-500 text-white' : active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>
                    {done ? '✓' : n}
                  </div>
                  <span className={`text-[11px] font-semibold hidden sm:block ${active ? 'text-blue-600' : 'text-slate-400'}`}>{s.label}</span>
                </div>
                {idx < stepConfig.length - 1 && (
                  <div className={`h-0.5 w-10 sm:w-14 mb-4 mx-1 rounded-full transition-all duration-500 ${done ? 'bg-emerald-400' : 'bg-slate-200'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-900/5 border border-white/60 p-8">

          {/* Step 1 — Doctor Professional Info */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-400">
              <h2 className="text-xl font-bold text-slate-800">Your Professional Details</h2>
              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-600">Full Name (with Dr. prefix)</label>
                  <input value={form.doctorName} onChange={e => update('doctorName', e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800 font-medium"
                    placeholder="e.g. Dr. Anil Mehra" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-600">Degree(s)</label>
                    <input value={form.degree} onChange={e => update('degree', e.target.value)}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                      placeholder="e.g. MBBS, MD" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-600">Experience (years)</label>
                    <input type="number" value={form.experience} onChange={e => update('experience', e.target.value)}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                      placeholder="e.g. 12" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-600">Specialization</label>
                  <select value={form.specialization} onChange={e => update('specialization', e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800">
                    <option value="">Select Specialization</option>
                    {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Clinic Details */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-400">
              <h2 className="text-xl font-bold text-slate-800">Clinic Information</h2>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-600">Clinic Name</label>
                <input value={form.clinicName} onChange={e => update('clinicName', e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g. Mehra Health Clinic" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-600">City</label>
                  <input value={form.city} onChange={e => update('city', e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. New Delhi" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-600">Contact Number</label>
                  <input type="tel" maxLength={10} value={form.phone} onChange={e => update('phone', e.target.value.replace(/\D/g, ''))}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="10-digit" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-600">Full Clinic Address</label>
                <textarea rows={3} value={form.address} onChange={e => update('address', e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  placeholder="Shop No., Street, Area, City – PIN" />
              </div>
            </div>
          )}

          {/* Step 3 — Timings */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-400">
              <h2 className="text-xl font-bold text-slate-800">Clinic Timings</h2>
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <p className="text-sm font-bold text-slate-600 mb-3">🌅 Morning Session</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 font-medium">Opens</label>
                      <input type="time" value={form.morningStart} onChange={e => update('morningStart', e.target.value)}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800 font-semibold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 font-medium">Closes</label>
                      <input type="time" value={form.morningEnd} onChange={e => update('morningEnd', e.target.value)}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800 font-semibold" />
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <p className="text-sm font-bold text-slate-600 mb-3">🌆 Evening Session</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 font-medium">Opens</label>
                      <input type="time" value={form.eveningStart} onChange={e => update('eveningStart', e.target.value)}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800 font-semibold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 font-medium">Closes</label>
                      <input type="time" value={form.eveningEnd} onChange={e => update('eveningEnd', e.target.value)}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800 font-semibold" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-bold text-slate-600">🚫 Off / Holiday Days</p>
                <div className="flex flex-wrap gap-2">
                  {DAYS.map(day => (
                    <button key={day} type="button" onClick={() => toggleDay(day)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${form.offDays.includes(day) ? 'bg-red-100 text-red-700 border-2 border-red-200' : 'bg-slate-100 text-slate-600 border-2 border-transparent hover:border-slate-300'}`}>
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4 — Add Staff */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-400">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Add Reception Staff</h2>
                <p className="text-slate-500 text-sm mt-1">Add staff by mobile number. They log in instantly using it.</p>
              </div>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm border-r border-slate-200 pr-3">+91</span>
                  <input type="tel" maxLength={10} value={staffInput}
                    onChange={e => setStaffInput(e.target.value.replace(/\D/g, ''))}
                    onKeyDown={e => e.key === 'Enter' && addStaff()}
                    className="w-full pl-16 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium tracking-widest"
                    placeholder="Staff mobile" />
                </div>
                <button onClick={addStaff} disabled={staffInput.length !== 10}
                  className="px-5 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 disabled:opacity-40 transition-all active:scale-95">
                  Add
                </button>
              </div>
              <div className="space-y-3 max-h-52 overflow-y-auto">
                {staffList.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <p className="text-4xl mb-3">👥</p>
                    <p className="text-sm font-medium">No staff added yet. You can skip and add later from Settings.</p>
                  </div>
                ) : staffList.map((num, i) => (
                  <div key={num} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">{i + 1}</div>
                      <div>
                        <p className="font-semibold text-slate-800 tracking-wider">+91 {num}</p>
                        <p className="text-xs text-slate-400">Receptionist</p>
                      </div>
                    </div>
                    <button onClick={() => setStaffList(l => l.filter(s => s !== num))} className="text-slate-400 hover:text-red-500 transition-colors text-lg">✕</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-slate-100">
            {step > 1 && (
              <button onClick={() => setStep(s => (s - 1) as Step)}
                className="px-6 py-4 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                Back
              </button>
            )}
            <button onClick={handleNext}
              className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              {step === 4 ? '🚀 Finish & Open Dashboard' : 'Continue →'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
