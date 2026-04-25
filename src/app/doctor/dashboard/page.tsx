'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useClinic } from '@/lib/clinic-context';

type Tab = 'queue' | 'summary' | 'settings';

interface Patient {
  token: string;
  name: string;
  age: number;
  gender: string;
  mobile: string;
  status: 'waiting' | 'in_consultation' | 'done';
  isNew: boolean;
  symptoms?: string;
  bp?: string;
  weight?: string;
  temperature?: string;
  pulse?: string;
}

const MOCK_QUEUE: Patient[] = [
  { token: 'M-001', name: 'Rahul Sharma', age: 34, gender: 'Male', mobile: '9876543212', status: 'in_consultation', isNew: false, symptoms: 'Fever, headache since 2 days', bp: '120/80', weight: '72', temperature: '101.2°F', pulse: '88' },
  { token: 'M-002', name: 'Priya Verma', age: 27, gender: 'Female', mobile: '9812345670', status: 'waiting', isNew: true, symptoms: 'Stomach ache, nausea', bp: '110/70', weight: '58', temperature: '99.1°F', pulse: '78' },
  { token: 'M-003', name: 'Suresh Patel', age: 52, gender: 'Male', mobile: '9898001122', status: 'waiting', isNew: false, symptoms: 'Back pain, difficulty walking', bp: '140/90', weight: '85', temperature: '98.6°F', pulse: '92' },
  { token: 'M-004', name: 'Ananya Singh', age: 19, gender: 'Female', mobile: '7654321098', status: 'waiting', isNew: true, symptoms: 'Cold, sore throat, mild fever', bp: '100/65', weight: '52', temperature: '100.4°F', pulse: '80' },
  { token: 'M-005', name: 'Mohit Gupta', age: 41, gender: 'Male', mobile: '9001234567', status: 'done', isNew: false, symptoms: 'Routine checkup', bp: '118/76', weight: '78', temperature: '98.6°F', pulse: '72' },
];

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

function formatTime(t: string) {
  if (!t) return '';
  const [h, m] = t.split(':');
  const hour = parseInt(h);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  return `${hour % 12 || 12}:${m} ${ampm}`;
}

export default function DoctorDashboard() {
  const { clinic, setClinic } = useClinic();
  const [activeTab, setActiveTab] = useState<Tab>('queue');
  const [queue, setQueue] = useState<Patient[]>(MOCK_QUEUE);
  const [focusMode, setFocusMode] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(MOCK_QUEUE[0]);
  const [settingsForm, setSettingsForm] = useState(clinic);

  const markDone = (token: string) => {
    setQueue(q => q.map(p => p.token === token ? { ...p, status: 'done' } : p));
    const next = queue.find(p => p.status === 'waiting');
    setSelectedPatient(next ?? null);
  };

  const skipPatient = (token: string) => {
    // Move to end of queue, back to waiting
    setQueue(q => {
      const patient = q.find(p => p.token === token);
      if (!patient) return q;
      const rest = q.filter(p => p.token !== token);
      return [...rest, { ...patient, status: 'waiting' as const }];
    });
    const next = queue.find(p => p.status === 'waiting' && p.token !== token);
    setSelectedPatient(next ?? null);
  };

  const cancelPatient = (token: string) => {
    if (!confirm(`Cancel patient ${token} from today's queue?`)) return;
    setQueue(q => q.filter(p => p.token !== token));
    const next = queue.find(p => p.status === 'waiting' && p.token !== token);
    setSelectedPatient(next ?? null);
  };

  const stats = [
    { label: "Today's Patients", value: queue.length.toString(), icon: '👥', color: 'bg-blue-50 text-blue-700' },
    { label: 'In Queue', value: queue.filter(p => p.status === 'waiting').length.toString(), icon: '⏳', color: 'bg-amber-50 text-amber-700' },
    { label: 'Completed', value: queue.filter(p => p.status === 'done').length.toString(), icon: '✅', color: 'bg-emerald-50 text-emerald-700' },
    { label: 'Avg. Wait Time', value: '12m', icon: '⚡', color: 'bg-purple-50 text-purple-700' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* Sidebar */}
      <aside className={`hidden md:flex flex-col sticky top-0 h-screen bg-slate-900 text-white transition-all duration-300 ${focusMode ? 'w-16' : 'w-64'}`}>
        <div className={`p-5 border-b border-slate-800 ${focusMode ? 'flex justify-center' : ''}`}>
          {!focusMode ? (
            <>
              <h2 className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300 truncate">{clinic.clinicName}</h2>
              <p className="text-slate-400 text-xs mt-0.5 truncate">{clinic.doctorName} • {clinic.specialization}</p>
            </>
          ) : (
            <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-b from-blue-400 to-teal-300">C</span>
          )}
        </div>

        <nav className="p-3 space-y-1 flex-1">
          {[
            { id: 'queue', icon: '🗂️', label: 'Patient Queue' },
            { id: 'summary', icon: '📊', label: 'Daily Summary' },
            { id: 'settings', icon: '⚙️', label: 'Settings & Staff' },
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <span className="text-lg leading-none">{item.icon}</span>
              {!focusMode && <span>{item.label}</span>}
            </button>
          ))}

        </nav>

        <div className="p-3 border-t border-slate-800 space-y-1">
          <button onClick={() => setFocusMode(f => !f)}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <span className="text-lg">{focusMode ? '⬅️' : '🎯'}</span>
            {!focusMode && <span>Focus Mode</span>}
          </button>
          <Link href="/" className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-900/30 hover:text-red-400 transition-colors">
            <span className="text-lg">🚪</span>
            {!focusMode && <span>Logout</span>}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">

        {/* Mobile Top Bar */}
        <div className="md:hidden bg-white border-b border-slate-100 px-5 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <div>
            <h2 className="font-bold text-slate-900 text-base leading-tight">{clinic.clinicName}</h2>
            <p className="text-xs text-slate-500">{clinic.doctorName}</p>
          </div>
          <div className="flex gap-2 text-xl">
            <button onClick={() => setActiveTab('settings')} title="Settings">⚙️</button>
          </div>
        </div>

        {/* Page Header with Breadcrumb */}
        <div className="px-5 md:px-8 pt-5 pb-4 border-b border-slate-100 bg-white">
          {/* Breadcrumb nav */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-3">
            <Link href="/" className="hover:text-blue-600 transition-colors">🏠 Home</Link>
            <span>›</span>
            <span className="text-slate-600 font-semibold">Doctor Dashboard</span>
            {activeTab !== 'queue' && (
              <>
                <span>›</span>
                <span className="text-blue-600 font-semibold capitalize">{activeTab === 'summary' ? 'Daily Summary' : 'Settings & Staff'}</span>
              </>
            )}
          </nav>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">{clinic.clinicName}</h1>
              <p className="text-slate-500 font-medium mt-0.5">
                {clinic.doctorName} • {clinic.degree} • {clinic.experience} yrs exp.
              </p>
              <p className="text-slate-400 text-sm mt-0.5">
                🕐 {formatTime(clinic.morningStart)}–{formatTime(clinic.morningEnd)} | {formatTime(clinic.eveningStart)}–{formatTime(clinic.eveningEnd)}
                {clinic.offDays.length > 0 && ` • Off: ${clinic.offDays.join(', ')}`}
              </p>
            </div>
            <span className="hidden md:block px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100">● Clinic Open</span>
          </div>
        </div>

        <div className="p-5 md:p-8">

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map(stat => (
              <div key={stat.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-xl mb-3 ${stat.color}`}>{stat.icon}</div>
                <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
                <p className="text-xs font-medium text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Tab: Queue */}
          {activeTab === 'queue' && (
            <div className="grid md:grid-cols-5 gap-6">
              {/* Queue List */}
              <div className="md:col-span-2 space-y-3">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Today&apos;s Queue</h3>
                {queue.map(patient => (
                  <button key={patient.token} onClick={() => setSelectedPatient(patient)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${selectedPatient?.token === patient.token ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-100' : 'border-slate-100 bg-white hover:border-slate-300 shadow-sm'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-extrabold text-slate-800 text-lg">{patient.token}</span>
                          {patient.isNew && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 uppercase">New</span>}
                        </div>
                        <p className="text-slate-700 font-semibold text-sm">{patient.name}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{patient.age} yrs • {patient.gender}</p>
                        {patient.symptoms && <p className="text-slate-500 text-xs mt-1 truncate max-w-[160px]">🩺 {patient.symptoms}</p>}
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex-shrink-0 ${patient.status === 'waiting' ? 'bg-amber-100 text-amber-700' : patient.status === 'in_consultation' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {patient.status === 'in_consultation' ? 'In Room' : patient.status === 'done' ? 'Done' : 'Waiting'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Consultation Panel */}
              <div className="md:col-span-3">
                {selectedPatient ? (
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-300">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 text-white flex items-center justify-center font-bold text-lg">{selectedPatient.name[0]}</div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">{selectedPatient.name}</h3>
                          <p className="text-slate-500 text-sm">{selectedPatient.age} yrs • {selectedPatient.gender} • +91 {selectedPatient.mobile}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1.5 rounded-full text-sm font-bold bg-slate-900 text-white">{selectedPatient.token}</span>
                    </div>

                    <div className="p-6 space-y-4">
                      {/* Vitals from Reception */}
                      {selectedPatient.bp && (
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Vitals (filled by Reception)</p>
                          <div className="grid grid-cols-4 gap-3">
                            {[['BP', selectedPatient.bp!], ['Weight', `${selectedPatient.weight} kg`], ['Temp', selectedPatient.temperature!], ['Pulse', `${selectedPatient.pulse} bpm`]].map(([k, v]) => (
                              <div key={k} className="bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
                                <p className="text-blue-400 text-[10px] font-semibold">{k}</p>
                                <p className="text-blue-900 font-bold text-sm mt-0.5">{v}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Symptoms */}
                      <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                        <p className="text-amber-600 text-xs font-bold mb-1">Chief Complaint</p>
                        <p className="text-slate-800 font-medium text-sm">{selectedPatient.symptoms ?? '—'}</p>
                      </div>

                      {/* Doctor Notes */}
                      <div>
                        <label className="text-sm font-semibold text-slate-600 mb-2 block">Additional Notes / Observations</label>
                        <textarea rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-700 text-sm" placeholder="Doctor's clinical notes..." />
                      </div>

                      {/* 3-Button Action Row */}
                      <div className="grid grid-cols-3 gap-3 pt-2">
                        <button
                          onClick={() => markDone(selectedPatient.token)}
                          disabled={selectedPatient.status === 'done'}
                          className="py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-md shadow-emerald-600/20 transition-all active:scale-[0.98] text-sm flex flex-col items-center gap-0.5">
                          <span className="text-base">✅</span>
                          <span>Complete</span>
                        </button>
                        <button
                          onClick={() => skipPatient(selectedPatient.token)}
                          disabled={selectedPatient.status === 'done'}
                          className="py-3.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-md shadow-amber-500/20 transition-all active:scale-[0.98] text-sm flex flex-col items-center gap-0.5">
                          <span className="text-base">⏭️</span>
                          <span>Skip</span>
                        </button>
                        <button
                          onClick={() => cancelPatient(selectedPatient.token)}
                          className="py-3.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold shadow-md shadow-red-500/20 transition-all active:scale-[0.98] text-sm flex flex-col items-center gap-0.5">
                          <span className="text-base">❌</span>
                          <span>Cancel</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center p-16 text-center">
                    <p className="text-5xl mb-4">🩺</p>
                    <p className="font-bold text-slate-700 text-lg">Select a patient from the queue</p>
                    <p className="text-slate-400 text-sm mt-1">Vitals and symptoms filled by reception will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab: Daily Summary */}
          {activeTab === 'summary' && (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-slate-900 mb-6">📊 Daily Summary — {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  [queue.length.toString(), 'Total Patients Seen', '👥'],
                  [queue.filter(p => !p.isNew).length.toString(), 'Regular Patients', '🔁'],
                  [queue.filter(p => p.isNew).length.toString(), 'New Registrations', '🆕'],
                ].map(([val, label, icon]) => (
                  <div key={label} className="bg-slate-50 rounded-2xl p-6 text-center">
                    <div className="text-3xl mb-2">{icon}</div>
                    <div className="text-4xl font-extrabold text-slate-900">{val}</div>
                    <div className="text-slate-500 text-sm mt-1 font-medium">{label}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-slate-700 mb-3">All Patients Today</h4>
                {queue.map(p => (
                  <div key={p.token} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-700 w-14">{p.token}</span>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{p.name}</p>
                        <p className="text-slate-400 text-xs">{p.age} yrs • {p.gender}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.status === 'done' ? 'bg-emerald-100 text-emerald-700' : p.status === 'in_consultation' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                      {p.status === 'done' ? 'Done' : p.status === 'in_consultation' ? 'In Room' : 'Waiting'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Settings */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">⚙️ Clinic Settings</h3>
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    { label: 'Doctor Name', key: 'doctorName', placeholder: 'Dr. Name' },
                    { label: 'Degree(s)', key: 'degree', placeholder: 'MBBS, MD' },
                    { label: 'Specialization', key: 'specialization', placeholder: '' },
                    { label: 'Experience (years)', key: 'experience', placeholder: '12' },
                    { label: 'Clinic Name', key: 'clinicName', placeholder: 'Clinic name' },
                    { label: 'City', key: 'city', placeholder: 'City' },
                    { label: 'Contact Number', key: 'phone', placeholder: '10-digit' },
                  ].map(({ label, key, placeholder }) => (
                    <div key={key} className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-600">{label}</label>
                      <input
                        value={settingsForm[key as keyof typeof settingsForm] as string}
                        onChange={e => setSettingsForm(f => ({ ...f, [key]: e.target.value }))}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder={placeholder}
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-sm font-semibold text-slate-600">Full Address</label>
                    <textarea rows={2} value={settingsForm.address}
                      onChange={e => setSettingsForm(f => ({ ...f, address: e.target.value }))}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none" />
                  </div>
                </div>

                {/* Timings */}
                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <p className="text-sm font-bold text-slate-600 mb-3">🌅 Morning Session</p>
                    <div className="grid grid-cols-2 gap-3">
                      <input type="time" value={settingsForm.morningStart} onChange={e => setSettingsForm(f => ({ ...f, morningStart: e.target.value }))} className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold" />
                      <input type="time" value={settingsForm.morningEnd} onChange={e => setSettingsForm(f => ({ ...f, morningEnd: e.target.value }))} className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold" />
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <p className="text-sm font-bold text-slate-600 mb-3">🌆 Evening Session</p>
                    <div className="grid grid-cols-2 gap-3">
                      <input type="time" value={settingsForm.eveningStart} onChange={e => setSettingsForm(f => ({ ...f, eveningStart: e.target.value }))} className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold" />
                      <input type="time" value={settingsForm.eveningEnd} onChange={e => setSettingsForm(f => ({ ...f, eveningEnd: e.target.value }))} className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold" />
                    </div>
                  </div>
                </div>

                {/* Off Days */}
                <div className="mt-5">
                  <p className="text-sm font-bold text-slate-600 mb-3">🚫 Off Days</p>
                  <div className="flex flex-wrap gap-2">
                    {DAYS.map(day => (
                      <button key={day} type="button"
                        onClick={() => setSettingsForm(f => ({
                          ...f,
                          offDays: f.offDays.includes(day) ? f.offDays.filter(d => d !== day) : [...f.offDays, day]
                        }))}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${settingsForm.offDays.includes(day) ? 'bg-red-100 text-red-700 border-2 border-red-200' : 'bg-slate-100 text-slate-600 border-2 border-transparent'}`}>
                        {day.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={() => setClinic(settingsForm)}
                  className="mt-8 px-8 py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors active:scale-[0.98] shadow-md">
                  💾 Save All Changes
                </button>
              </div>

              {/* Prescription Template Selector */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-1">🖨️ Prescription Template</h3>
                <p className="text-slate-500 text-sm mb-6">Select the default template. Reception will use this layout when printing prescriptions.</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[
                    { id: 't1', name: 'Classic Blue', color: '#1d4ed8' },
                    { id: 't2', name: 'Modern Dark', color: '#0f172a' },
                    { id: 't3', name: 'Minimal', color: '#374151' },
                    { id: 't4', name: 'Emerald', color: '#059669' },
                    { id: 't5', name: 'Royal Purple', color: '#7c3aed' },
                    { id: 't6', name: 'Warm Saffron', color: '#d97706' },
                    { id: 't7', name: 'Slate Pro', color: '#475569' },
                    { id: 't8', name: 'Rose Medical', color: '#e11d48' },
                    { id: 't9', name: 'Ocean Teal', color: '#0891b2' },
                    { id: 't10', name: 'Gold Premium', color: '#b45309' },
                  ].map(t => (
                    <button key={t.id}
                      onClick={() => { setClinic({ ...clinic, selectedTemplate: t.id }); }}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        clinic.selectedTemplate === t.id
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                      }`}>
                      <div className="w-8 h-8 rounded-lg mb-2" style={{ background: t.color }}></div>
                      <p className={`text-xs font-bold ${ clinic.selectedTemplate === t.id ? 'text-blue-700' : 'text-slate-700'}`}>{t.name}</p>
                      {clinic.selectedTemplate === t.id && <p className="text-[10px] text-blue-500 font-semibold mt-0.5">✓ Active</p>}
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-xs text-slate-400">Template is saved automatically when selected. Reception will always use this template.</p>
              </div>

              {/* Staff Management */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">👥 Staff Management</h3>
                <p className="text-slate-500 text-sm mb-6">Add or remove reception staff by mobile number.</p>
                <div className="flex gap-3 mb-5">
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium border-r border-slate-200 pr-3">+91</span>
                    <input type="tel" maxLength={10} placeholder="New staff mobile" className="w-full pl-16 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none tracking-widest" />
                  </div>
                  <button className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all active:scale-[0.98]">Add</button>
                </div>
                <div className="space-y-3">
                  {['9876100001', '9876100002'].map((num, i) => (
                    <div key={num} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">R{i + 1}</div>
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">+91 {num}</p>
                          <p className="text-xs text-emerald-600 font-medium">● Active Staff</p>
                        </div>
                      </div>
                      <button className="text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
