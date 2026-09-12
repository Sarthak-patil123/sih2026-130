import React, { InputHTMLAttributes, SelectHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  helperText?: string | null;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
}

export const Input: React.FC<InputProps> = ({
  label,
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  className = "",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  ...props
}) => {
  const inputId = id || name;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative rounded-md shadow-xs">
        {LeftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <LeftIcon className="h-4 w-4" />
          </div>
        )}
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`block w-full rounded-md border text-sm transition-colors placeholder:text-slate-400 focus:outline-hidden disabled:bg-slate-50 disabled:text-slate-500 ${
            LeftIcon ? "pl-9" : "pl-3"
          } ${RightIcon ? "pr-9" : "pr-3"} py-2 ${
            error
              ? "border-rose-300 text-rose-900 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              : "border-slate-300 text-slate-900 focus:border-[#0F2942] focus:ring-1 focus:ring-[#0F2942]"
          } ${className}`}
          {...props}
        />
        {RightIcon && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
            <RightIcon className="h-4 w-4" />
          </div>
        )}
      </div>
      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-500">{helperText}</p>}
    </div>
  );
};

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  id?: string;
  name?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: (SelectOption | string)[];
  error?: string | null;
  helperText?: string | null;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  error,
  helperText,
  required = false,
  disabled = false,
  className = "",
  placeholder = "Select an option",
  ...props
}) => {
  const selectId = id || name;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative rounded-md shadow-xs">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`block w-full appearance-none rounded-md border bg-white px-3 py-2 text-sm transition-colors focus:outline-hidden disabled:bg-slate-50 disabled:text-slate-500 ${
            error
              ? "border-rose-300 text-rose-900 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              : "border-slate-300 text-slate-900 focus:border-[#0F2942] focus:ring-1 focus:ring-[#0F2942]"
          } ${className}`}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt, idx) => {
            const val = typeof opt === 'string' ? opt : opt.value;
            const lbl = typeof opt === 'string' ? opt : opt.label;
            return (
              <option key={val || idx} value={val}>
                {lbl}
              </option>
            );
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-500">{helperText}</p>}
    </div>
  );
};
