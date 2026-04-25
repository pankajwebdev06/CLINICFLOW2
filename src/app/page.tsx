'use client';

import React, { useState } from 'react';

export default function UnifiedLogin() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length === 10) {
      setStep('otp');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-3xl"></div>
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] rounded-full bg-teal-400/10 blur-3xl"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[40%] rounded-full bg-indigo-400/10 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 p-8 z-10 relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-400 text-white shadow-lg shadow-blue-500/30 mb-6 transition-transform hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Clinicflow</h1>
          <p className="text-slate-500 mt-2 font-medium">Your modern healthcare hub</p>
        </div>

        {/* Forms */}
        <div className="relative">
          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <label htmlFor="mobile" className="block text-sm font-semibold text-slate-700">
                  Mobile Number
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-slate-400 font-medium border-r border-slate-200 pr-3">
                    +91
                  </div>
                  <input
                    type="tel"
                    id="mobile"
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-16 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-800 font-medium text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-400"
                    placeholder="Enter 10-digit number"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={mobileNumber.length !== 10}
                className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl font-semibold text-lg transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-xl hover:shadow-slate-800/20 flex items-center justify-center space-x-2"
              >
                <span>Continue Securely</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="text-center space-y-2">
                <p className="text-slate-600 font-medium">Enter the 6-digit code sent to</p>
                <p className="text-slate-900 font-bold text-lg">+91 {mobileNumber}</p>
                <button 
                  onClick={() => setStep('phone')}
                  className="text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Change number
                </button>
              </div>

              <div className="flex justify-between gap-2 mt-8">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                    className="w-12 h-14 text-center bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 font-bold text-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                ))}
              </div>

              <button
                className="w-full py-4 mt-8 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold text-lg transition-all duration-300 transform active:scale-[0.98] shadow-md hover:shadow-xl hover:shadow-blue-600/20"
              >
                Verify & Login
              </button>

              <div className="text-center mt-6">
                <p className="text-slate-500 text-sm font-medium">Didn't receive the code? <button className="text-blue-600 font-semibold hover:underline">Resend in 30s</button></p>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-xs text-slate-400 font-medium">
            By continuing, you agree to our <a href="#" className="underline hover:text-slate-600">Terms</a> & <a href="#" className="underline hover:text-slate-600">Privacy Policy</a>
          </p>
        </div>
      </div>
    </main>
  );
}
