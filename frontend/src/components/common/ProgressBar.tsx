import React from 'react';

export interface ProgressBarProps {
  progress?: number;
  label?: string;
  showPercentage?: boolean;
  height?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'blue' | 'success' | 'warning' | 'gradient';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 0,
  label,
  showPercentage = true,
  height = "md",
  color = "primary",
  className = ""
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  const heightClass = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4"
  }[height] || "h-2.5";

  const colorClass = {
    primary: "bg-[#0F2942]",
    blue: "bg-blue-600",
    success: "bg-emerald-600",
    warning: "bg-amber-500",
    gradient: "bg-gradient-to-r from-blue-600 to-emerald-500"
  }[color] || "bg-[#0F2942]";

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between text-xs font-semibold text-slate-700">
          <span>{label}</span>
          {showPercentage && <span>{clampedProgress}%</span>}
        </div>
      )}
      <div className={`w-full overflow-hidden rounded-full bg-slate-200 ${heightClass}`}>
        <div
          className={`${heightClass} rounded-full ${colorClass} transition-all duration-500 ease-out`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};
