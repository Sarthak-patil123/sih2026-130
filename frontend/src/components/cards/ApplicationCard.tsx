import React from 'react';
import { Building2, Calendar, Clock, ArrowRight, AlertTriangle } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { Application } from '../../types';

export interface ApplicationCardProps {
  application: Application;
  onClick?: () => void;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, onClick }) => {
  const hasOpenQuery = application.queries?.some(q => q.status === "Open");

  return (
    <div
      onClick={onClick}
      className="group rounded-lg border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-blue-400 hover:shadow-md cursor-pointer space-y-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="font-mono text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            {application.id}
          </span>
          <h4 className="text-base font-bold text-[#0F2942] mt-1.5">{application.approval}</h4>
          <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
            <Building2 className="h-3.5 w-3.5 text-slate-400" />
            {application.department}
          </p>
        </div>
        <StatusBadge status={application.status} size="md" />
      </div>

      {hasOpenQuery && (
        <div className="flex items-center gap-2 rounded-md bg-amber-50 p-2.5 text-xs text-amber-900 border border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
          <span className="font-medium">Officer Query Pending: Document re-upload required</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          <span>Submitted: <strong>{application.submittedOn}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-slate-400" />
          <span>SLA: <strong>{application.deadline}</strong></span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
        <span className="text-slate-500">
          Docs: <strong>{application.documents?.filter(d => d.uploaded).length || 0}/{application.documents?.length || 0}</strong>
        </span>
        <span className="inline-flex items-center font-semibold text-[#0F2942] group-hover:text-blue-700">
          Open Dossier <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
};
