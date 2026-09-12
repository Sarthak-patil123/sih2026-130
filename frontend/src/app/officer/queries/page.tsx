'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MessageSquare 
} from 'lucide-react';
import { usePortal } from '@/context/PortalContext';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';

export default function OfficerQueriesPage() {
  const { applications } = usePortal();
  const router = useRouter();

  const [filter, setFilter] = useState("all");

  // Flatten all queries across applications
  const allQueries = applications.flatMap(app => 
    (app.queries || []).map(q => ({
      ...q,
      applicationId: app.id,
      approvalName: app.approval,
      companyName: app.companyName,
      department: app.department
    }))
  );

  const filteredQueries = allQueries.filter(q => {
    if (filter === "open") return q.status === "Open";
    if (filter === "resolved") return q.status === "Resolved";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
              Department Communications
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#0F2942] mt-1">Queries & Statutory Objections Register</h2>
          <p className="text-xs text-slate-500">
            Track clarification requests raised to applicants, monitor submission deadlines, and review revised documents.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs">
        {[
          { key: "all", label: "All Queries", count: allQueries.length },
          { key: "open", label: "Awaiting Applicant Response", count: allQueries.filter(q => q.status === "Open").length },
          { key: "resolved", label: "Resolved / Document Resubmitted", count: allQueries.filter(q => q.status === "Resolved").length }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`rounded-md px-3 py-1.5 font-semibold transition-all cursor-pointer ${
              filter === tab.key
                ? "bg-[#0F2942] text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Queries List */}
      <div className="space-y-4">
        {filteredQueries.length > 0 ? (
          filteredQueries.map(q => (
            <div key={q.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {q.id}
                    </span>
                    <span className="font-mono text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {q.applicationId}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{q.companyName}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{q.approvalName} • {q.department}</p>
                </div>

                <div className="flex items-center gap-2">
                  <StatusBadge status={q.status === "Resolved" ? "Completed" : "Query Raised"} size="sm" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/officer/applications/${q.applicationId}`)}
                  >
                    Open Dossier
                  </Button>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="rounded-md bg-slate-50 p-3 border border-slate-200 space-y-1">
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Official Query Raised by {q.raisedBy}:</span>
                  <p className="text-slate-800 font-medium leading-relaxed">&ldquo;{q.queryText}&rdquo;</p>
                </div>

                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Raised Date: <strong>{q.raisedDate}</strong></span>
                  <span>Compliance Target: <strong className="text-rose-700">{q.deadline}</strong></span>
                </div>

                {q.response && (
                  <div className="rounded-md bg-emerald-50 p-3 border border-emerald-200 text-emerald-900 space-y-1">
                    <span className="font-bold block text-[10px] uppercase tracking-wider text-emerald-950">
                      Applicant Resubmission ({q.responseDate}):
                    </span>
                    <p className="font-medium leading-relaxed">{q.response}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-slate-200 bg-white p-12 text-center text-slate-400 text-xs">
            <MessageSquare className="h-8 w-8 text-slate-300 mx-auto mb-2" />
            <p className="font-semibold text-slate-600">No active queries found in this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
