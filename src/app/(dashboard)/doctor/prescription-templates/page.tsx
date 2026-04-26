'use client';

import React, { useState } from 'react';

import { useClinic } from '@/core/store/clinic-context';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { VitalsGrid } from '@/shared/components/VitalsGrid';

const TEMPLATES = [
  {
    id: 'classic',
    name: 'Classic',
    desc: 'Traditional two-column header with ruled body',
    accent: 'border-t-4 border-blue-700',
    headerBg: 'bg-white',
    headerText: 'text-blue-900',
    divider: 'border-blue-700',
  },
  {
    id: 'modern',
    name: 'Modern',
    desc: 'Full dark header strip with white text',
    accent: '',
    headerBg: 'bg-slate-900',
    headerText: 'text-white',
    divider: 'border-slate-900',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    desc: 'Clean center-aligned lightweight layout',
    accent: '',
    headerBg: 'bg-white',
    headerText: 'text-slate-900',
    divider: 'border-slate-300',
  },
];

// Mock patient data (in real app this comes from reception context/API)
const SAMPLE_PATIENT = {
  name: 'Rahul Sharma',
  age: '34',
  gender: 'Male',
  mobile: '9876543212',
  token: 'M-007',
  symptoms: 'Fever, headache, body ache since 2 days',
  bp: '120/80',
  weight: '72',
  temperature: '101.2°F',
  pulse: '88',
};

function formatTime(t: string) {
  if (!t) return '';
  const [h, m] = t.split(':');
  const hour = parseInt(h);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

function PrescriptionPreview({ templateId, clinic, patient, compact = false }: {
  templateId: string;
  clinic: ReturnType<typeof useClinic>['clinic'];
  patient: typeof SAMPLE_PATIENT;
  compact?: boolean;
}) {
  const tpl = TEMPLATES.find(t => t.id === templateId) ?? TEMPLATES[0];
  const scale = compact ? 'text-[9px]' : 'text-[11px] md:text-xs';
  const timings = `${formatTime(clinic.morningStart)}–${formatTime(clinic.morningEnd)} | ${formatTime(clinic.eveningStart)}–${formatTime(clinic.eveningEnd)}`;
  const offDays = clinic.offDays.join(', ');

  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow border border-slate-200 ${compact ? 'w-full' : 'w-full'} ${tpl.accent} ${scale} font-mono print:shadow-none`}>

      {/* HEADER */}
      <div className={`${tpl.headerBg} p-3 ${compact ? 'p-2' : 'p-5'}`}>
        {templateId === 'minimal' ? (
          /* Center-aligned minimal */
          <div className="text-center">
            <p className={`font-extrabold text-base ${compact ? 'text-sm' : 'text-xl'} ${tpl.headerText}`}>{clinic.clinicName}</p>
            <p className={`font-bold mt-0.5 ${tpl.headerText}`}>{clinic.doctorName}</p>
            <p className={`opacity-80 ${tpl.headerText}`}>{clinic.degree} • {clinic.specialization} • {clinic.experience} yrs exp.</p>
            <div className={`border-t ${tpl.divider} my-2 opacity-30`} />
            <p className={`opacity-70 ${tpl.headerText}`}>{clinic.address}</p>
            <p className={`opacity-70 ${tpl.headerText}`}>📞 {clinic.phone} | 🕐 {timings}</p>
            {offDays && <p className={`opacity-60 ${tpl.headerText}`}>Off: {offDays}</p>}
          </div>
        ) : templateId === 'modern' ? (
          /* Dark full-width modern */
          <div className="flex justify-between items-start">
            <div>
              <p className={`font-extrabold ${compact ? 'text-base' : 'text-2xl'} text-white tracking-tight`}>{clinic.clinicName}</p>
              <p className="text-blue-300 font-bold mt-0.5">{clinic.doctorName}</p>
              <p className="text-slate-300">{clinic.degree} • {clinic.specialization}</p>
            </div>
            <div className="text-right text-slate-300">
              <p>{clinic.experience} yrs experience</p>
              <p className="mt-1">{clinic.phone}</p>
              <p>{timings}</p>
              {offDays && <p className="text-red-300">Off: {offDays}</p>}
            </div>
          </div>
        ) : (
          /* Classic two-column */
          <div className="flex justify-between items-start">
            <div>
              <p className={`font-extrabold ${compact ? 'text-base' : 'text-2xl'} ${tpl.headerText} tracking-tight`}>{clinic.clinicName}</p>
              <p className={`font-bold ${tpl.headerText} mt-1`}>{clinic.doctorName}</p>
              <p className={`${tpl.headerText} opacity-80`}>{clinic.degree}</p>
              <p className={`${tpl.headerText} opacity-80`}>{clinic.specialization} • {clinic.experience} yrs exp.</p>
            </div>
            <div className={`text-right ${tpl.headerText} opacity-80`}>
              <p>📍 {clinic.address}</p>
              <p className="mt-1">📞 {clinic.phone}</p>
              <p>🕐 {timings}</p>
              {offDays && <p className="text-red-600 font-semibold">Off: {offDays}</p>}
            </div>
          </div>
        )}
      </div>

      {/* DIVIDER */}
      <div className={`border-t-2 ${tpl.divider}`} />

      {/* PATIENT DETAILS */}
      <div className={`${compact ? 'p-2' : 'p-5'} space-y-3`}>
        <div className="grid grid-cols-4 gap-2 bg-slate-50 rounded-lg p-2 border border-slate-100">
          {[
            ['Name', patient.name],
            ['Age/Gender', `${patient.age} yrs / ${patient.gender}`],
            ['Token', patient.token],
            ['Date', new Date().toLocaleDateString('en-IN')],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-slate-400 font-sans" style={{ fontSize: '0.65em' }}>{k}</p>
              <p className="font-bold text-slate-800 font-sans">{v}</p>
            </div>
          ))}
        </div>

        {/* Vitals */}
        <VitalsGrid vitals={patient} />

        {/* Symptoms */}
        <div className="bg-amber-50 rounded-lg p-2 border border-amber-100">
          <p className="text-amber-500 font-sans" style={{ fontSize: '0.65em' }}>Chief Complaint</p>
          <p className="font-semibold text-slate-800 font-sans">{patient.symptoms}</p>
        </div>

        {/* Prescription Area — left blank for physical writing */}
        <div className={`border border-dashed border-slate-300 rounded-lg ${compact ? 'h-16' : 'h-32'} flex items-start p-2`}>
          <p className="text-slate-300 font-sans text-center w-full mt-2" style={{ fontSize: '0.65em' }}>
            ℞ — Prescription (written by doctor)
          </p>
        </div>

        {/* Footer line */}
        <div className={`border-t ${tpl.divider} opacity-20`} />
        <p className="text-slate-300 text-center font-sans" style={{ fontSize: '0.6em' }}>
          This prescription is valid for 30 days • ClinicFlow
        </p>
      </div>
    </div>
  );
}

export default function PrescriptionTemplatesPage() {
  const { clinic } = useClinic();
  const [selected, setSelected] = useState('classic');
  const [patient, setPatient] = useState(SAMPLE_PATIENT);

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-slate-50 print:bg-white">

      {/* Top Bar (hidden when printing) */}
      <header className="print:hidden bg-white border-b border-slate-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Link href="/doctor/dashboard" className="text-slate-400 hover:text-slate-600 transition-colors">
                ← Back
              </Link>
              <span className="text-slate-300">/</span>
              <span className="font-bold text-slate-800">Prescription Templates</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{clinic.clinicName} • {clinic.doctorName}</p>
          </div>
          <Button onClick={handlePrint} icon="🖨️">
            Print with Template
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 py-8 print:p-0 print:max-w-none">
        <div className="grid lg:grid-cols-5 gap-8 print:block">

          {/* Left: Template Selector + Vitals Editor */}
          <div className="lg:col-span-2 space-y-6 print:hidden">

            {/* Template Cards */}
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-4">Choose Template</h2>
              <div className="space-y-3">
                {TEMPLATES.map(tpl => (
                  <button key={tpl.id} onClick={() => setSelected(tpl.id)}
                    className={`w-full text-left rounded-2xl border-2 overflow-hidden transition-all ${selected === tpl.id ? 'border-blue-500 shadow-md shadow-blue-100' : 'border-slate-200 hover:border-slate-300'}`}>
                    <div className="flex items-center gap-4 p-4">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected === tpl.id ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                        {selected === tpl.id && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-slate-900">{tpl.name}</span>
                          {selected === tpl.id && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">Active</span>}
                        </div>
                        <p className="text-slate-500 text-xs">{tpl.desc}</p>
                      </div>
                    </div>
                    {/* Mini preview */}
                    <div className="px-4 pb-4">
                      <PrescriptionPreview templateId={tpl.id} clinic={clinic} patient={patient} compact />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Patient Vitals Editor */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-4">Patient Vitals (editable)</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Blood Pressure', key: 'bp', placeholder: '120/80' },
                  { label: 'Weight (kg)', key: 'weight', placeholder: '70' },
                  { label: 'Temperature', key: 'temperature', placeholder: '98.6°F' },
                  { label: 'Pulse (bpm)', key: 'pulse', placeholder: '72' },
                ].map(({ label, key, placeholder }) => (
                  <Input
                    key={key}
                    label={label}
                    value={patient[key as keyof typeof patient]}
                    onChange={e => setPatient(p => ({ ...p, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="text-sm font-medium"
                    fullWidth={false}
                  />
                ))}
              </div>
              <div className="mt-4 space-y-1.5">
                <label className="text-xs font-semibold text-slate-500">Symptoms / Chief Complaint</label>
                <textarea
                  rows={2}
                  value={patient.symptoms}
                  onChange={e => setPatient(p => ({ ...p, symptoms: e.target.value }))}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm resize-none"
                  placeholder="e.g. Fever, headache..."
                />
              </div>
            </div>
          </div>

          {/* Right: Full Preview */}
          <div className="lg:col-span-3">
            <div className="print:hidden mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">Live Preview</h2>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 capitalize">{selected} Template</span>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 print:p-0 print:shadow-none print:border-none print:rounded-none">
              <PrescriptionPreview templateId={selected} clinic={clinic} patient={patient} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
