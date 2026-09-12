'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileCheck2, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle, 
  BarChart3,
  CalendarDays,
  FileQuestion
} from 'lucide-react';
import { usePortal } from '@/context/PortalContext';
import { StatCard } from '@/components/common/StatCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';

export default function OfficerDashboardPage() {
  const { applications, inspections, currentUser } = usePortal();
  const router = useRouter();

  // Metrics
  const pendingApps = applications.filter(a => a.status === 'Under Review' || a.status === 'Pending').length;
  const pendingInspections = inspections.filter(i => i.status === 'Scheduled').length;
  const activeQueries = applications.flatMap(a => (a.queries || []).filter(q => q.status === "Open")).length;
  const approvedApps = applications.filter(a => a.status === 'Approved').length;

  return (
    <div className="space-y-6">
      {/* Officer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
              Government Officer Portal
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Badge: {currentUser?.badgeNumber || 'MH-IND-NODAL-024'}
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#0F2942] mt-1">
            Nodal Approval Workdesk
          </h2>
          <p className="text-xs text-slate-500">
            Welcome, <strong>{currentUser?.name || 'Smt. Anjali Kulkarni, IAS'}</strong> — {currentUser?.designation || 'Joint Director of Industries'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            icon={BarChart3}
            onClick={() => router.push('/officer/analytics')}
          >
            Clearance Analytics
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={FileCheck2}
            onClick={() => router.push('/officer/applications')}
          >
            Review Application Queue
          </Button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3.5">
        <StatCard
          title="Pending Queue"
          value={128 + pendingApps}
          subtitle="Awaiting scrutiny"
          icon={FileCheck2}
          variant="primary"
          onClick={() => router.push('/officer/applications')}
        />
        <StatCard
          title="Due Today / SLA"
          value={17}
          subtitle="High urgency"
          icon={Clock}
          variant="danger"
          onClick={() => router.push('/officer/applications')}
        />
        <StatCard
          title="Inspections Due"
          value={23 + pendingInspections}
          subtitle="Field audits scheduled"
          icon={CalendarDays}
          variant="info"
          onClick={() => router.push('/officer/inspections')}
        />
        <StatCard
          title="Queries Awaiting"
          value={31 + activeQueries}
          subtitle="Applicant response"
          icon={FileQuestion}
          variant="warning"
          onClick={() => router.push('/officer/queries')}
        />
        <StatCard
          title="Processed (FY26)"
          value={1048 + approvedApps}
          subtitle="Certificates issued"
          icon={CheckCircle2}
          variant="success"
          onClick={() => router.push('/officer/analytics')}
        />
      </div>

      {/* Urgent SLA Alert Banner */}
      <div className="rounded-lg border border-rose-200 bg-rose-50/70 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-rose-900">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-rose-600 text-white shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-rose-950">Statutory SLA Compliance Alert (Public Services Act)</p>
            <p className="text-rose-800 mt-0.5">
              3 applications in Nagpur zone have SLA deadlines within 48 hours. Expedite technical review or raise query.
            </p>
          </div>
        </div>

        <Button
          variant="danger"
          size="sm"
          onClick={() => router.push('/officer/applications')}
        >
          View Urgent Dossiers
        </Button>
      </div>

      {/* Application Scrutiny Queue Table */}
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-[#0F2942]">Active Application Scrutiny Queue</h3>
            <p className="text-xs text-slate-500">Statutory dossiers submitted by industrial units awaiting review</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => router.push('/officer/applications')}
          >
            Full Queue ({applications.length})
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                <th className="py-2.5 px-3">Application ID</th>
                <th className="py-2.5 px-3">Applicant Enterprise</th>
                <th className="py-2.5 px-3">Approval Type</th>
                <th className="py-2.5 px-3">Submitted</th>
                <th className="py-2.5 px-3">SLA Deadline</th>
                <th className="py-2.5 px-3">Priority</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.map((app) => (
                <tr
                  key={app.id}
                  onClick={() => router.push(`/officer/applications/${app.id}`)}
                  className="hover:bg-amber-50/40 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-3 font-mono font-bold text-blue-700">{app.id}</td>
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    <div>{app.companyName}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{app.projectName}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-700 font-medium">{app.approval}</td>
                  <td className="py-3 px-3 text-slate-600">{app.submittedOn}</td>
                  <td className="py-3 px-3 font-semibold text-slate-800">{app.deadline}</td>
                  <td className="py-3 px-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      app.priority === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {app.priority || 'Normal'}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <StatusBadge status={app.status} size="sm" />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/officer/applications/${app.id}`);
                      }}
                    >
                      Review Dossier
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
