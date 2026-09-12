import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number | ReactNode;
  subtitle?: string;
  icon?: LucideIcon;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  badgeText?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "default",
  badgeText,
  onClick
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "border-slate-200 bg-white hover:border-blue-300";
      case "success":
        return "border-emerald-200 bg-emerald-50/30 hover:border-emerald-300";
      case "warning":
        return "border-amber-200 bg-amber-50/30 hover:border-amber-300";
      case "danger":
        return "border-rose-200 bg-rose-50/30 hover:border-rose-300";
      case "info":
        return "border-blue-200 bg-blue-50/30 hover:border-blue-300";
      default:
        return "border-slate-200 bg-white hover:border-slate-300";
    }
  };

  const getIconContainerStyles = () => {
    switch (variant) {
      case "success":
        return "bg-emerald-100 text-emerald-700";
      case "warning":
        return "bg-amber-100 text-amber-700";
      case "danger":
        return "bg-rose-100 text-rose-700";
      case "info":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-lg border p-5 shadow-xs transition-all duration-150 ${getVariantStyles()} ${
        onClick ? "cursor-pointer hover:shadow-md" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              {value}
            </h3>
            {badgeText && (
              <span className="text-xs font-medium text-slate-500">
                {badgeText}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 pt-0.5">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={`rounded-md p-2.5 ${getIconContainerStyles()}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
};
