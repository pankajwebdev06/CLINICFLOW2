'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useClinic } from '@/core/store/clinic-context';
import { Breadcrumbs } from '@/shared/components/Breadcrumbs';
import { Button } from '@/shared/components/ui/Button';

const TEMPLATES = [
  { id: 't1', name: 'Classic Blue', accent: '#1d4ed8', bg: '#eff6ff', border: '4px solid #1d4ed8', headerBg: 'white', textColor: '#1e3a5f' },
  { id: 't2', name: 'Modern Dark', accent: '#0f172a', bg: '#f8fafc', border: 'none', headerBg: '#0f172a', textColor: 'white' },
  { id: 't3', name: 'Minimal', accent: '#374151', bg: 'white', border: '1px solid #e5e7eb', headerBg: 'white', textColor: '#111827' },
  { id: 't4', name: 'Emerald', accent: '#059669', bg: '#f0fdf4', border: '4px solid #059669', headerBg: 'white', textColor: '#064e3b' },
  { id: 't5', name: 'Royal Purple', accent: '#7c3aed', bg: '#faf5ff', border: '4px solid #7c3aed', headerBg: 'white', textColor: '#3b0764' },
  { id: 't6', name: 'Warm Saffron', accent: '#d97706', bg: '#fffbeb', border: '4px solid #d97706', headerBg: 'white', textColor: '#78350f' },
  { id: 't7', name: 'Slate Pro', accent: '#475569', bg: '#f8fafc', border: '2px solid #94a3b8', headerBg: '#f1f5f9', textColor: '#0f172a' },
  { id: 't8', name: 'Rose Medical', accent: '#e11d48', bg: '#fff1f2', border: '4px solid #e11d48', headerBg: 'white', textColor: '#881337' },
  { id: 't9', name: 'Ocean Teal', accent: '#0891b2', bg: '#f0fdfa', border: '4px solid #0891b2', headerBg: 'white', textColor: '#164e63' },
  { id: 't10', name: 'Gold Premium', accent: '#b45309', bg: '#fefce8', border: '4px solid #b45309', headerBg: 'white', textColor: '#78350f' },
];

function formatTime(t: string) {
  if (!t) return '';
  const [h, m] = t.split(':');
  const hour = parseInt(h);
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
}

interface Patient { name: string; age: string; gender: string; symptoms: string; token: string; mobile: string; bp: string; weight: string; temperature: string; pulse: string; }

function PrescriptionSheet({ tpl, clinic, patient }: { tpl: typeof TEMPLATES[0]; clinic: ReturnType<typeof useClinic>['clinic']; patient: Patient }) {
  const timings = `${formatTime(clinic.morningStart)}–${formatTime(clinic.morningEnd)} | ${formatTime(clinic.eveningStart)}–${formatTime(clinic.eveningEnd)}`;
  const isDark = tpl.id === 't2';

  return (
    <div style={{ border: tpl.border, background: tpl.bg, width: '100%', minHeight: '100vh', fontFamily: 'Georgia, serif', boxSizing: 'border-box' }}>

      {/* ===== HEADER (≈40% of page) ===== */}
      <div style={{ background: tpl.headerBg, padding: isDark ? '0' : '0' }}>

        {/* Clinic Name Banner */}
        <div style={{ background: tpl.accent, color: isDark ? 'white' : 'white', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-0.5px' }}>{clinic.clinicName}</div>
            <div style={{ fontSize: '11px', opacity: 0.85, marginTop: '2px' }}>{clinic.address} | 📞 {clinic.phone}</div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '11px', opacity: 0.9 }}>
            <div>🕐 {timings}</div>
            {clinic.offDays.length > 0 && <div>Off: {clinic.offDays.join(', ')}</div>}
          </div>
        </div>

        {/* Doctor Info Row */}
        <div style={{ padding: '10px 24px', background: tpl.headerBg, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1.5px solid ${tpl.accent}` }}>
          <div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: tpl.textColor !== 'white' ? tpl.textColor : '#111' }}>{clinic.doctorName}</div>
            <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>{clinic.degree} &nbsp;|&nbsp; {clinic.specialization} &nbsp;|&nbsp; {clinic.experience} years experience</div>
          </div>
          <div style={{ fontSize: '11px', color: '#6b7280', textAlign: 'right' }}>{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>

        {/* Patient Details */}
        <div style={{ padding: '10px 24px', background: isDark ? '#1e293b' : '#f8fafc', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', borderBottom: `1px solid ${tpl.accent}33` }}>
          {[['Patient Name', patient.name], ['Age / Gender', `${patient.age} yrs / ${patient.gender}`], ['Token No.', patient.token], ['Mobile', `+91 ${patient.mobile}`]].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: '9px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'Arial, sans-serif' }}>{k}</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: isDark ? '#e2e8f0' : '#111827', fontFamily: 'Arial, sans-serif', marginTop: '2px' }}>{v || '—'}</div>
            </div>
          ))}
        </div>

        {/* Vitals + Symptoms Row */}
        <div style={{ padding: '8px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 2fr', gap: '8px', background: isDark ? '#1e293b' : 'white', borderBottom: `2px solid ${tpl.accent}` }}>
          {[['BP', patient.bp], ['Weight', patient.weight ? `${patient.weight} kg` : ''], ['Temp', patient.temperature], ['Pulse', patient.pulse ? `${patient.pulse} bpm` : '']].map(([k, v]) => (
            <div key={k} style={{ background: isDark ? '#334155' : `${tpl.accent}10`, borderRadius: '6px', padding: '6px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: '9px', color: '#9ca3af', fontFamily: 'Arial, sans-serif' }}>{k}</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: isDark ? '#94a3b8' : tpl.accent, fontFamily: 'Arial, sans-serif' }}>{v || '—'}</div>
            </div>
          ))}
          <div style={{ background: isDark ? '#334155' : '#fef9c3', borderRadius: '6px', padding: '6px 10px' }}>
            <div style={{ fontSize: '9px', color: '#9ca3af', fontFamily: 'Arial, sans-serif' }}>Chief Complaint</div>
            <div style={{ fontSize: '11px', color: isDark ? '#e2e8f0' : '#92400e', fontFamily: 'Arial, sans-serif', fontWeight: 600 }}>{patient.symptoms || '—'}</div>
          </div>
        </div>
      </div>

      {/* ===== BLANK WRITING AREA (≈60% of page) ===== */}
      <div style={{ padding: '16px 24px 0', minHeight: '58vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span style={{ fontSize: '20px', fontWeight: 900, color: tpl.accent, fontFamily: 'Georgia, serif' }}>℞</span>
          <span style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Prescription</span>
          <div style={{ flex: 1, height: '1px', background: `${tpl.accent}30` }}></div>
        </div>
        {/* Ruled lines for handwriting */}
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${tpl.accent}20`, height: '32px', marginBottom: '0' }}></div>
        ))}
      </div>

      {/* ===== FOOTER ===== */}
      <div style={{ padding: '10px 24px', borderTop: `1.5px solid ${tpl.accent}40`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
        <div style={{ fontSize: '10px', color: '#9ca3af', fontFamily: 'Arial, sans-serif' }}>
          This prescription is valid for 30 days from the date of issue.
        </div>
        <div style={{ fontSize: '10px', color: '#9ca3af', fontFamily: 'Arial, sans-serif', textAlign: 'right' }}>
          <div style={{ marginBottom: '16px' }}>&nbsp;</div>
          <div style={{ borderTop: `1px solid #9ca3af`, paddingTop: '4px', minWidth: '140px' }}>Doctor&apos;s Signature</div>
        </div>
      </div>

    </div>
  );
}

function PrintPage() {
  const params = useSearchParams();
  const { clinic } = useClinic();
  const [isPrinting, setIsPrinting] = useState(false);

  const patient: Patient = {
    name: params.get('name') ?? '',
    age: params.get('age') ?? '',
    gender: params.get('gender') ?? '',
    symptoms: params.get('symptoms') ?? '',
    token: params.get('token') ?? '',
    mobile: params.get('mobile') ?? '',
    bp: params.get('bp') ?? '',
    weight: params.get('weight') ?? '',
    temperature: params.get('temperature') ?? '',
    pulse: params.get('pulse') ?? '',
  };

  // Always use the template selected by the doctor in Settings
  const tpl = TEMPLATES.find(t => t.id === clinic.selectedTemplate) ?? TEMPLATES[0];

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => { window.print(); setIsPrinting(false); }, 100);
  };

  return (
    <>
      {/* Print-only */}
      <div className="hidden print:block">
        <PrescriptionSheet tpl={tpl} clinic={clinic} patient={patient} />
      </div>

      {/* Screen */}
      <div className="min-h-screen bg-slate-100 print:hidden">
        <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20">
          <div className="max-w-5xl mx-auto px-5 py-4">
            {/* Breadcrumb */}
            <Breadcrumbs 
              items={[
                { label: 'Home', href: '/', icon: '🏠' },
                { label: 'Reception', href: '/reception' },
                { label: 'Print Prescription', isCurrent: true }
              ]}
            />
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-lg font-bold text-slate-900">Print Prescription</h1>
                <p className="text-slate-500 text-sm">
                  {patient.name} &bull; Token: <strong>{patient.token}</strong> &bull; {clinic.clinicName}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="w-4 h-4 rounded" style={{ background: tpl.accent }}></div>
                  <span className="text-sm font-semibold text-slate-600">{tpl.name}</span>
                  <span className="text-xs text-slate-400">(set by doctor)</span>
                </div>
                <Button onClick={handlePrint} loading={isPrinting} icon="🖨️" size="lg">
                  Print Prescription
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-5 py-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Template <strong className="text-slate-800">{tpl.name}</strong> selected by doctor &mdash; to change, go to Doctor Settings.
            </p>
            <span className="text-xs text-slate-400 bg-white border border-slate-200 px-3 py-1 rounded-full">A4 Print Size</span>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <PrescriptionSheet tpl={tpl} clinic={clinic} patient={patient} />
          </div>
        </div>
      </div>
    </>
  );
}

export default function PrescriptionPrintPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-500">Loading...</div>}>
      <PrintPage />
    </Suspense>
  );
}
