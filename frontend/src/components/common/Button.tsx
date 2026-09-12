import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'blue' | 'success' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  onClick,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-hidden focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "px-2.5 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2.5"
  }[size] || "px-4 py-2 text-sm gap-2";

  const variantStyles = {
    primary: "bg-[#0F2942] hover:bg-[#1B365D] text-white focus:ring-[#0F2942] border border-transparent shadow-xs",
    secondary: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 focus:ring-slate-400 shadow-xs",
    blue: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-600 shadow-xs",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-600 shadow-xs",
    danger: "bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-600 shadow-xs",
    outline: "border border-blue-600 text-blue-700 hover:bg-blue-50 focus:ring-blue-600",
    ghost: "text-slate-600 hover:bg-slate-100 focus:ring-slate-400 border border-transparent"
  }[variant] || "bg-[#0F2942] text-white";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === "left" && <Icon className="h-4 w-4 shrink-0" />}
          {children}
          {Icon && iconPosition === "right" && <Icon className="h-4 w-4 shrink-0" />}
        </>
      )}
    </button>
  );
};
