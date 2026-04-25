'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type Tab = 'queue' | 'summary' | 'settings';

interface Patient {
  token: string;
  name: string;
  age: number;
  gender: string;
  mobile: string;
  status: 'waiting' | 'in_consultation' | 'done';
  isNew: boolean;
}

const MOCK_QUEUE: Patient[] = [
  { token: 'M-001', name: 'Rahul Sharma', age: 34, gender: 'Male', mobile: '9876543212', status: 'in_consultation', isNew: false },
  { token: 'M-002', name: 'Priya Verma', age: 27, gender: 'Female', mobile: '9812345670', status: 'waiting', isNew: true },
  { token: 'M-003', name: 'Suresh Patel', age: 52, gender: 'Male', mobile: '9898001122', status: 'waiting', isNew: false },
  { token: 'M-004', name: 'Ananya Singh', age: 19, gender: 'Female', mobile: '7654321098', status: 'waiting', isNew: true },
  { token: 'M-005', name: 'Mohit Gupta', age: 41, gender: 'Male', mobile: '9001234567', status: 'done', isNew: false },
];

const STATS = [
  { label: 'Today\'s Patients', value: '18', icon: '👥', color: 'bg-blue-50 text-blue-700' },
  { label: 'In Queue', value: '3', icon: '⏳', color: 'bg-amber-50 text-amber-700' },
  { label: 'Completed', value: '14', icon: '✅', color: 'bg-emerald-50 text-emerald-700' },
  { label: 'Avg. Wait Time', value: '12m', icon: '⚡', color: 'bg-purple-50 text-purple-700' },
];

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('queue');
  const [queue, setQueue] = useState<Patient[]>(MOCK_QUEUE);
  const [focusMode, setFocusMode] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(MOCK_QUEUE[0]);

  const markDone = (token: string) => {
    setQueue(q => q.map(p => p.token === token ? { ...p, status: 'done' } : p));
    const next = queue.find(p => p.status === 'waiting');
    setSelectedPatient(next ?? null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* Sidebar */}
      <aside className={`hidden md:flex flex-col sticky top-0 h-screen bg-slate-900 text-white transition-all duration-300 ${focusMode ? 'w-16' : 'w-64'}`}>
        <div className={`p-5 border-b border-slate-800 ${focusMode ? 'flex justify-center' : ''}`}>
          {!focusMode && (
            <>
              <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">Clinicflow</h2>
              <p className="text-slate-400 text-xs mt-0.5">Dr. Mehra • General Physician</p>
            </>
          )}
          {focusMode && (
            <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-blue-400 to-teal-300">C</span>
          )}
        </div>

        <nav className="p-3 space-y-1 flex-1">
          {[
            { id: 'queue', icon: '🗂️', label: 'Patient Queue' },
            { id: 'summary', icon: '📊', label: 'Daily Summary' },
            { id: 'settings', icon: '⚙️', label: 'Settings & Staff' },
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <span className="text-lg leading-none">{item.icon}</span>
              {!focusMode && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-800">
          <button onClick={() => setFocusMode(f => !f)}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <span className="text-lg leading-none">{focusMode ? '⬅️' : '🎯'}</span>
            {!focusMode && <span>Focus Mode</span>}
          </button>
          <Link href="/"
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-900/30 hover:text-red-400 transition-colors mt-1">
            <span className="text-lg leading-none">🚪</span>
            {!focusMode && <span>Logout</span>}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">

        {/* Mobile Top Bar */}
        <div className="md:hidden bg-white border-b border-slate-100 px-5 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <div>
            <h2 className="font-bold text-slate-900 text-lg">Dr. Mehra</h2>
            <p className="text-xs text-slate-500">General Physician</p>
          </div>
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg">🎯</button>
          </div>
        </div>

        <div className="p-5 md:p-8">

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {STATS.map(stat => (
              <div key={stat.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-xl mb-3 ${stat.color}`}>
                  {stat.icon}
                </div>
                <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
                <p className="text-xs font-medium text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'queue' && (
            <div className="grid md:grid-cols-5 gap-6">

              {/* Left: Queue List */}
              <div className="md:col-span-2 space-y-3">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Today&apos;s Queue</h3>
                {queue.map(patient => (
                  <button key={patient.token} onClick={() => setSelectedPatient(patient)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${selectedPatient?.token === patient.token ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-100' : 'border-slate-100 bg-white hover:border-slate-300 shadow-sm'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-extrabold text-slate-800 text-lg">{patient.token}</span>
                          {patient.isNew && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 uppercase tracking-wide">New</span>}
                        </div>
                        <p className="text-slate-700 font-semibold text-sm">{patient.name}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{patient.age} yrs • {patient.gender}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        patient.status === 'waiting' ? 'bg-amber-100 text-amber-700' :
                        patient.status === 'in_consultation' ? 'bg-blue-100 text-blue-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {patient.status === 'in_consultation' ? 'In Room' : patient.status === 'done' ? 'Done' : 'Waiting'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right: Consultation Panel */}
              <div className="md:col-span-3">
                {selectedPatient ? (
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-300">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 text-white flex items-center justify-center font-bold text-lg">
                            {selectedPatient.name[0]}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900">{selectedPatient.name}</h3>
                            <p className="text-slate-500 text-sm">{selectedPatient.age} yrs • {selectedPatient.gender} • +91 {selectedPatient.mobile}</p>
                          </div>
                        </div>
                      </div>
                      <span className="px-3 py-1.5 rounded-full text-sm font-bold bg-slate-900 text-white">{selectedPatient.token}</span>
                    </div>

                    <div className="p-6 space-y-5">
                      <div>
                        <label className="text-sm font-semibold text-slate-600 mb-2 block">Chief Complaint / Symptoms</label>
                        <textarea rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-700 text-sm" placeholder="Describe patient symptoms..." />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-slate-600 mb-2 block">Prescription / Notes</label>
                        <textarea rows={4} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-700 text-sm" placeholder="Write prescription or clinical notes..." />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button className="flex-1 py-3.5 border-2 border-slate-900 text-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-colors active:scale-[0.98] text-sm">
                          🖨️ Print Prescription
                        </button>
                        {selectedPatient.status !== 'done' && (
                          <button onClick={() => markDone(selectedPatient.token)}
                            className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md shadow-emerald-600/20 transition-all active:scale-[0.98] text-sm">
                            ✅ Done — Next Patient
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center p-16 text-center">
                    <p className="text-5xl mb-4">🩺</p>
                    <p className="font-bold text-slate-700 text-lg">Select a patient</p>
                    <p className="text-slate-400 text-sm mt-1">Click any patient from the queue to view their consultation panel.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-slate-900 mb-6">📊 Daily Summary — {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[['18', 'Total Patients Seen', '👥'], ['14', 'Regular Patients', '🔁'], ['4', 'New Registrations', '🆕']].map(([val, label, icon]) => (
                  <div key={label} className="bg-slate-50 rounded-2xl p-6 text-center">
                    <div className="text-3xl mb-2">{icon}</div>
                    <div className="text-4xl font-extrabold text-slate-900">{val}</div>
                    <div className="text-slate-500 text-sm mt-1 font-medium">{label}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-slate-700 mb-3">Completed Patients Today</h4>
                {queue.filter(p => p.status === 'done').map(p => (
                  <div key={p.token} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-700">{p.token}</span>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{p.name}</p>
                        <p className="text-slate-400 text-xs">{p.age} yrs • {p.gender}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">Done</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">⚙️ Clinic Settings</h3>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold text-slate-600 mb-2 block">Clinic Name</label>
                    <input defaultValue="Mehra Health Clinic" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600 mb-2 block">City</label>
                    <input defaultValue="New Delhi" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                </div>
                <button className="mt-5 px-8 py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors active:scale-[0.98]">
                  Save Changes
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">👥 Staff Management</h3>
                <p className="text-slate-500 text-sm mb-6">Add or remove reception staff by mobile number.</p>
                <div className="flex gap-3 mb-5">
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">+91</span>
                    <input type="tel" maxLength={10} placeholder="New staff mobile" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none tracking-widest" />
                  </div>
                  <button className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all">Add</button>
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
