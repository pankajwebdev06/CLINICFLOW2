'use client';

import React, { useState, useEffect } from 'react';

type FlowState = 'search' | 'loading' | 'history' | 'new_patient' | 'token';

export default function ReceptionDashboard() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [flowState, setFlowState] = useState<FlowState>('search');
  const [patientData, setPatientData] = useState({ name: '', age: '', gender: '' });
  const [token, setToken] = useState('');

  // Auto-search effect when exactly 10 digits are entered
  useEffect(() => {
    if (mobileNumber.length === 10 && flowState === 'search') {
      setFlowState('loading');
      
      // Simulate API call for tenant-isolated database search
      setTimeout(() => {
        // Dummy logic: If number ends with '1', treat as returning patient, else new patient
        if (mobileNumber.endsWith('1')) {
          setPatientData({ name: 'Rahul Sharma', age: '34', gender: 'Male' });
          setFlowState('history');
        } else {
          setFlowState('new_patient');
        }
      }, 1500);
    }
  }, [mobileNumber, flowState]);

  const handlePatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFlowState('loading');
    
    // Simulate API saving and token generation
    setTimeout(() => {
      // Logic: Generate token with Doctor's initial (Assuming Doctor is Dr. Mehra -> 'M')
      const newToken = `M-${String(Math.floor(Math.random() * 100)).padStart(3, '0')}`;
      setToken(newToken);
      setFlowState('token');
    }, 1000);
  };

  const handlePrint = () => {
    window.print();
  };

  const resetFlow = () => {
    setMobileNumber('');
    setPatientData({ name: '', age: '', gender: '' });
    setToken('');
    setFlowState('search');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* Sidebar (Hidden on mobile by default) */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col sticky top-0 h-screen overflow-y-auto print:hidden">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">Clinicflow</h2>
          <p className="text-slate-400 text-sm mt-1">Reception Desk</p>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-md shadow-blue-900/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Patient Entry
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            Queue Mgmt
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
        
        {/* Top bar for mobile */}
        <div className="flex justify-between items-center md:hidden mb-6 print:hidden">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Clinicflow</h2>
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">R</div>
        </div>

        <div className="mb-8 print:hidden">
          <h1 className="text-3xl font-bold text-slate-900">Patient Check-in</h1>
          <p className="text-slate-500 mt-2">Enter mobile number to search local clinic database.</p>
        </div>

        {/* Dynamic Card Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
          
          {/* Progress Indicator Line */}
          <div className="h-1 w-full bg-slate-100 print:hidden">
            <div className={`h-full bg-blue-600 transition-all duration-700 ease-out ${
              flowState === 'search' ? 'w-1/4' : 
              flowState === 'loading' ? 'w-2/4' : 
              flowState === 'token' ? 'w-full' : 'w-3/4'
            }`}></div>
          </div>

          <div className="p-6 md:p-10">
            
            {/* Step 1: Search */}
            <div className={`space-y-6 transition-all duration-500 ${flowState !== 'search' && flowState !== 'loading' ? 'hidden' : 'block'} print:hidden`}>
              <label htmlFor="search" className="block text-lg font-semibold text-slate-800">
                Patient Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-400 font-medium">+91</span>
                </div>
                <input
                  id="search"
                  type="tel"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setMobileNumber(val);
                    if(val.length < 10) setFlowState('search');
                  }}
                  disabled={flowState === 'loading'}
                  className="block w-full pl-14 pr-4 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-2xl font-semibold tracking-widest text-slate-800 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-70 placeholder:text-slate-300 placeholder:font-normal placeholder:tracking-normal"
                  placeholder="Enter 10 digits"
                />
                
                {/* Loading Spinner */}
                {flowState === 'loading' && (
                  <div className="absolute inset-y-0 right-4 flex items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  </div>
                )}
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Secure local tenant search. Auto-triggers at 10 digits.
              </p>
            </div>

            {/* Step 2: Patient Forms (History or New) */}
            {(flowState === 'history' || flowState === 'new_patient') && (
              <form onSubmit={handlePatientSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 print:hidden">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">
                      {flowState === 'history' ? 'Existing Patient Details' : 'New Patient Registration'}
                    </h3>
                    <p className="text-slate-500 font-medium mt-1">Mobile: +91 {mobileNumber}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${flowState === 'history' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                    {flowState === 'history' ? 'Found' : 'New Entry'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={patientData.name}
                      onChange={e => setPatientData({...patientData, name: e.target.value})}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                      placeholder="e.g. Aman Verma"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Age</label>
                      <input 
                        type="number" 
                        required
                        value={patientData.age}
                        onChange={e => setPatientData({...patientData, age: e.target.value})}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                        placeholder="Yrs"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Gender</label>
                      <select 
                        required
                        value={patientData.gender}
                        onChange={e => setPatientData({...patientData, gender: e.target.value})}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex gap-4">
                  <button 
                    type="button" 
                    onClick={resetFlow}
                    className="px-6 py-4 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold shadow-md transition-all active:scale-[0.98]"
                  >
                    {flowState === 'history' ? 'Generate Token' : 'Save & Generate Token'}
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Token Generated & Print View */}
            {flowState === 'token' && (
              <div className="animate-in fade-in zoom-in-95 duration-500">
                
                {/* Print Layout (Only visible when printing or in this state) */}
                <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 md:p-12 text-center bg-white">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mb-6 print:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  
                  <h4 className="text-slate-500 font-medium uppercase tracking-widest mb-2">Token Number</h4>
                  <h2 className="text-6xl font-extrabold text-slate-900 tracking-tighter mb-6">{token}</h2>
                  
                  <div className="bg-slate-50 p-6 rounded-2xl text-left max-w-sm mx-auto border border-slate-100">
                    <p className="text-slate-500 text-sm mb-1">Patient Details</p>
                    <p className="font-bold text-slate-800 text-lg">{patientData.name}</p>
                    <p className="text-slate-600">{patientData.age} Yrs • {patientData.gender}</p>
                    <p className="text-slate-600 mt-2 font-medium">+91 {mobileNumber}</p>
                  </div>
                  
                  <p className="mt-8 text-sm text-slate-400">Dr. Mehra's Clinic • Date: {new Date().toLocaleDateString()}</p>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 print:hidden">
                  <button 
                    onClick={handlePrint}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" /></svg>
                    Print Slip
                  </button>
                  <button 
                    onClick={resetFlow}
                    className="flex-1 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-md transition-all active:scale-[0.98]"
                  >
                    Next Patient
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
