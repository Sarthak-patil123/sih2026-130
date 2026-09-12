import React from 'react';
import { Clock, Building2, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';
import { ApprovalTemplate, Application } from '../../types';

export interface ApprovalCardProps {
  approval: ApprovalTemplate;
  application?: Application;
  onViewDetails: (appId: string) => void;
  onApply?: (approval: ApprovalTemplate) => void;
}

export const ApprovalCard: React.FC<ApprovalCardProps> = ({
  approval,
  application,
  onViewDetails,
  onApply
}) => {
  const status = application ? application.status : "Pending";
  const requiredDocs = approval.requiredDocs || [];
  const slaDays = approval.slaDays || 15;

  const getBorderColor = () => {
    const s = status.toLowerCase();
    if (s.includes("approved")) return "border-l-4 border-l-emerald-600";
    if (s.includes("under review")) return "border-l-4 border-l-blue-600";
    if (s.includes("query raised") || s.includes("action")) return "border-l-4 border-l-amber-500 bg-amber-50/20";
    if (s.includes("inspection")) return "border-l-4 border-l-purple-600";
    if (s.includes("rejected")) return "border-l-4 border-l-rose-600";
    return "border-l-4 border-l-slate-300";
  };

  return (
    <div className={`rounded-lg border border-slate-200 bg-white p-5 shadow-xs transition-all hover:shadow-md ${getBorderColor()}`}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400">#{approval.order || 1}</span>
            <h4 className="text-base font-bold text-[#0F2942]">{approval.name}</h4>
            {approval.isParallel && (
              <span className="inline-flex items-center rounded-sm bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 border border-blue-200">
                Parallel Track
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-slate-400" />
              {approval.department}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              SLA: <strong className="text-slate-700">{slaDays} Working Days</strong>
            </span>
          </div>

          <p className="text-xs text-slate-600 pt-1 leading-relaxed">{approval.description}</p>
        </div>

        <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-2 shrink-0">
          <StatusBadge status={status} size="md" />
          {application && (
            <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {application.id}
            </span>
          )}
        </div>
      </div>

      {/* Required Documents Summary */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <p className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5 text-slate-500" />
          Required Statutory Documents ({requiredDocs.length}):
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
          {requiredDocs.map((doc, idx) => (
            <li key={idx} className="flex items-center gap-2 truncate">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
              <span className="truncate">{doc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Dates and Action Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-slate-500 flex flex-wrap gap-4">
          {application?.submittedOn && (
            <span>Submitted: <strong className="text-slate-700">{application.submittedOn}</strong></span>
          )}
          {application?.deadline && (
            <span>SLA Target: <strong className="text-slate-700">{application.deadline}</strong></span>
          )}
        </div>

        <div>
          {application ? (
            <Button
              variant="outline"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => onViewDetails(application.id)}
            >
              View Application Details
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              icon={ShieldCheck}
              onClick={() => onApply && onApply(approval)}
            >
              Prepare Application
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
