import React from 'react';

export interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = "md", className = "" }) => {
  const normalized = (status || "").toLowerCase().trim();

  let styles = "bg-slate-100 text-slate-700 border-slate-200";
  let dotColor = "bg-slate-500";

  if (normalized.includes("approved") || normalized.includes("verified") || normalized.includes("completed") || normalized.includes("eligible")) {
    styles = "bg-emerald-50 text-emerald-800 border-emerald-200";
    dotColor = "bg-emerald-600";
  } else if (normalized.includes("under review") || normalized.includes("scrutiny") || normalized.includes("progress")) {
    styles = "bg-blue-50 text-blue-800 border-blue-200";
    dotColor = "bg-blue-600";
  } else if (normalized.includes("query raised") || normalized.includes("action required") || normalized.includes("action pending")) {
    styles = "bg-amber-50 text-amber-800 border-amber-300";
    dotColor = "bg-amber-600";
  } else if (normalized.includes("rejected") || normalized.includes("failed") || normalized.includes("cancelled")) {
    styles = "bg-rose-50 text-rose-800 border-rose-200";
    dotColor = "bg-rose-600";
  } else if (normalized.includes("inspection pending") || normalized.includes("scheduled")) {
    styles = "bg-purple-50 text-purple-800 border-purple-200";
    dotColor = "bg-purple-600";
  } else if (normalized.includes("pending") || normalized.includes("check eligibility")) {
    styles = "bg-amber-50/70 text-amber-900 border-amber-200";
    dotColor = "bg-amber-500";
  }

  const sizeClasses = size === "sm" 
    ? "text-xs px-2 py-0.5" 
    : size === "lg" 
    ? "text-sm px-3 py-1 font-semibold" 
    : "text-xs px-2.5 py-1 font-medium";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border ${styles} ${sizeClasses} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
      {status || "Pending"}
    </span>
  );
};
