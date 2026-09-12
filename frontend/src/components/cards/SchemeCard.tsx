import React from 'react';
import { Award, Building2, CheckCircle, FileText, ShieldCheck, Sparkles } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';
import { Scheme } from '../../types';

export interface SchemeCardProps {
  scheme: Scheme;
  onViewDetails: (scheme: Scheme) => void;
  onApply: (scheme: Scheme) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  onViewDetails,
  onApply
}) => {
  const isEligible = scheme.status === "Eligible";
  const isApplied = scheme.status?.includes("Applied");

  return (
    <div className={`rounded-lg border border-slate-200 bg-white p-5 shadow-xs transition-all hover:shadow-md flex flex-col justify-between ${
      isEligible ? "border-t-4 border-t-emerald-600" : "border-t-4 border-t-blue-600"
    }`}>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {scheme.category || "Incentive"}
              </span>
              {scheme.matchingScore && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <Sparkles className="h-3 w-3" /> {scheme.matchingScore}% Sector Match
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-[#0F2942] mt-2">{scheme.name}</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
              <Building2 className="h-3.5 w-3.5 text-slate-400" />
              {scheme.department}
            </p>
          </div>
          <StatusBadge status={scheme.status} size="md" />
        </div>

        {/* Benefits Box */}
        <div className="rounded-md bg-emerald-50/60 p-3 border border-emerald-200/60 text-xs">
          <p className="font-semibold text-emerald-900 flex items-center gap-1.5 mb-1">
            <Award className="h-4 w-4 text-emerald-700 shrink-0" />
            Financial & Fiscal Benefits:
          </p>
          <p className="text-emerald-800 leading-relaxed font-medium">{scheme.benefits}</p>
        </div>

        {/* Eligibility Text */}
        <div className="text-xs text-slate-600 space-y-1">
          <p className="font-semibold text-slate-800">Eligibility Criteria:</p>
          <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200">
            {scheme.eligibilityCriteria}
          </p>
        </div>

        {/* Required Documents */}
        {scheme.requiredDocuments && scheme.requiredDocuments.length > 0 && (
          <div className="pt-2 border-t border-slate-100 text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1 mb-1.5">
              <FileText className="h-3.5 w-3.5 text-slate-400" />
              Required for Subsidy Disbursal:
            </span>
            <ul className="text-slate-500 space-y-1">
              {scheme.requiredDocuments.slice(0, 3).map((d, i) => (
                <li key={i} className="flex items-center gap-1.5 truncate">
                  <span className="h-1 w-1 rounded-full bg-slate-400" />
                  <span className="truncate">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <span className="text-[11px] text-slate-400">
          Deadline: <strong className="text-slate-600">{scheme.applicationDeadline || "Open"}</strong>
        </span>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onViewDetails(scheme)}
          >
            View Details
          </Button>

          {!isApplied && (
            <Button
              variant={isEligible ? "success" : "primary"}
              size="sm"
              icon={ShieldCheck}
              onClick={() => onApply(scheme)}
            >
              {isEligible ? "Apply Online" : "Check Eligibility"}
            </Button>
          )}

          {isApplied && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1.5 rounded border border-blue-200">
              <CheckCircle className="h-3.5 w-3.5" /> Application Logged
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
