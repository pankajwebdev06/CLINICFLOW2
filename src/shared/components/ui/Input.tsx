import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  prefixText?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, prefixText, fullWidth = true, className, ...props }, ref) => {
    return (
      <div className={cn('space-y-1.5', fullWidth && 'w-full')}>
        {label && (
          <label className="text-sm font-semibold text-slate-700 block">
            {label}
          </label>
        )}
        <div className="relative">
          {prefixText && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-slate-400 font-medium border-r border-slate-200 pr-3">
                {prefixText}
              </span>
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'block w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white disabled:opacity-70',
              prefixText && 'pl-16',
              error && 'border-red-500 focus:ring-red-500/20',
              className
            )}
            {...props}
          />
          {icon && (
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
        </div>
        {error && <p className="text-xs font-medium text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
