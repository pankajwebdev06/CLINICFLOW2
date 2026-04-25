import { ReactNode } from 'react';
import Link from 'next/link';

interface NavItem {
  id: string;
  icon: string | ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface ClinicSidebarProps {
  clinicName: string;
  subtitle: string;
  doctorName?: string;
  specialization?: string;
  navItems: NavItem[];
  activeId?: string;
  focusMode?: boolean;
  onToggleFocus?: () => void;
  footerContent?: ReactNode;
}

export function ClinicSidebar({
  clinicName,
  subtitle,
  doctorName,
  specialization,
  navItems,
  activeId,
  focusMode = false,
  onToggleFocus,
  footerContent
}: ClinicSidebarProps) {
  return (
    <aside className={`bg-slate-900 text-white hidden md:flex flex-col sticky top-0 h-screen transition-all duration-300 ${focusMode ? 'w-16' : 'w-64'} overflow-y-auto print:hidden`}>
      <div className={`p-5 border-b border-slate-800 ${focusMode ? 'flex justify-center' : ''}`}>
        {!focusMode ? (
          <>
            <h2 className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300 leading-tight truncate">
              {clinicName}
            </h2>
            <p className="text-slate-400 text-xs mt-0.5 truncate">{subtitle}</p>
          </>
        ) : (
          <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-b from-blue-400 to-teal-300">
            {clinicName[0]}
          </span>
        )}
      </div>

      <nav className="p-3 space-y-1 flex-1">
        {navItems.map((item) => {
          const content = (
            <>
              <span className="text-lg leading-none">{item.icon}</span>
              {!focusMode && <span>{item.label}</span>}
            </>
          );

          const className = `w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
            activeId === item.id 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`;

          if (item.href) {
            return (
              <Link key={item.id} href={item.href} className={className}>
                {content}
              </Link>
            );
          }

          return (
            <button key={item.id} onClick={item.onClick} className={className}>
              {content}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-800 space-y-1">
        {onToggleFocus && (
          <button 
            onClick={onToggleFocus}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span className="text-lg">{focusMode ? '⬅️' : '🎯'}</span>
            {!focusMode && <span>Focus Mode</span>}
          </button>
        )}
        
        {footerContent || (
          <div className={`${focusMode ? 'hidden' : 'block'} p-2`}>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">{doctorName}</p>
            <p className="text-slate-600 text-[10px] mt-0.5">{specialization}</p>
          </div>
        )}
      </div>
    </aside>
  );
}
