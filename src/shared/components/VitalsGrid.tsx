interface VitalsGridProps {
  vitals: {
    bp?: string;
    weight?: string;
    temperature?: string;
    pulse?: string;
  };
  variant?: 'blue' | 'slate';
}

export function VitalsGrid({ vitals, variant = 'blue' }: VitalsGridProps) {
  const hasVitals = vitals.bp || vitals.weight || vitals.temperature || vitals.pulse;
  
  if (!hasVitals) return null;

  const items = [
    { label: 'BP', value: vitals.bp },
    { label: 'Weight', value: vitals.weight ? `${vitals.weight}kg` : undefined },
    { label: 'Temp', value: vitals.temperature },
    { label: 'Pulse', value: vitals.pulse ? `${vitals.pulse}bpm` : undefined },
  ].filter(item => item.value);

  const bgColor = variant === 'blue' ? 'bg-blue-50' : 'bg-slate-50';
  const borderColor = variant === 'blue' ? 'border-blue-100' : 'border-slate-100';
  const labelColor = variant === 'blue' ? 'text-blue-400' : 'text-slate-400';
  const valueColor = variant === 'blue' ? 'text-blue-900' : 'text-slate-900';

  return (
    <div className="grid grid-cols-4 gap-3">
      {items.map(({ label, value }) => (
        <div key={label} className={`${bgColor} rounded-xl p-3 text-center border ${borderColor}`}>
          <p className={`${labelColor} text-[10px] font-semibold uppercase tracking-wider`}>{label}</p>
          <p className={`${valueColor} font-bold text-sm mt-0.5`}>{value}</p>
        </div>
      ))}
    </div>
  );
}
