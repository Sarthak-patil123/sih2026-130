'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Filter } from 'lucide-react';
import { usePortal } from '@/context/PortalContext';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { ApplicationItem } from '@/types';

export default function OfficerApplicationsPage() {
  const { applications } = usePortal();
  const router = useRouter();

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDept, setSelectedDept] = useState("All");

  const filterTabs = [
    { label: "All", count: applications.length },
    { label: "Under Review", count: applications.filter(a => a.status === "Under Review").length },
    { label: "Query Raised", count: applications.filter(a => a.status === "Query Raised").length },
    { label: "Inspection Pending", count: applications.filter(a => a.status === "Inspection Pending").length },
    { label: "Approved", count: applications.filter(a => a.status === "Approved").length },
    { label: "Pending", count: applications.filter(a => a.status === "Pending").length },
  ];

  const departments = useMemo(() => {
    const set = new Set(applications.map(a => a.department));
    return ['All', ...Array.from(set)];
  }, [applications]);

  const filtered = applications.filter(app => {
    const matchStatus = selectedStatus === "All" || app.status === selectedStatus;
    const matchDept = selectedDept === "All" || app.department === selectedDept;
    return matchStatus && matchDept;
  });

  const columns = [
    {
      header: 'Application ID',
      key: 'id',
      sortable: true,
      render: (val: unknown) => (
        <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
          {String(val)}
        </span>
      )
    },
    {
      header: 'Applicant Enterprise',
      key: 'companyName',
      sortable: true,
      render: (val: unknown, row: ApplicationItem) => (
        <div>
          <span className="font-bold text-slate-900 block">{String(val)}</span>
          <span className="text-[11px] text-slate-500">{row.projectName}</span>
        </div>
      )
    },
    {
      header: 'Approval Type',
      key: 'approval',
      sortable: true,
      render: (val: unknown) => <span className="font-medium text-slate-800">{String(val)}</span>
    },
    {
      header: 'Statutory Dept',
      key: 'department',
      sortable: true,
      render: (val: unknown) => <span className="text-slate-600 truncate max-w-[180px] block">{String(val)}</span>
    },
    {
      header: 'Submitted',
      key: 'submittedOn',
      sortable: true,
      render: (val: unknown) => <span className="text-slate-600">{String(val)}</span>
    },
    {
      header: 'SLA Deadline',
      key: 'deadline',
      sortable: true,
      render: (val: unknown) => <span className="font-semibold text-slate-800">{String(val)}</span>
    },
    {
      header: 'Status',
      key: 'status',
      sortable: true,
      render: (val: unknown) => <StatusBadge status={String(val)} size="sm" />
    },
    {
      header: 'Action',
      key: 'action',
      className: 'text-right',
      render: (_: unknown, row: ApplicationItem) => (
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/officer/applications/${row.id}`);
          }}
        >
          Review & Scrutinize
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
              Department Scrutiny
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#0F2942] mt-1">Application Scrutiny Queue</h2>
          <p className="text-xs text-slate-500">
            Review dossier attachments, verify site drawings, raise objections, or grant statutory approvals.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {filterTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setSelectedStatus(tab.label)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                selectedStatus === tab.label
                  ? 'bg-[#0F2942] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 rounded px-1.5 py-0.2 text-[10px] ${
                selectedStatus === tab.label ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <span className="text-slate-500 font-medium">Department:</span>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="rounded-md border border-slate-300 bg-white py-1 px-2.5 text-xs font-medium text-slate-700 focus:border-[#0F2942] focus:outline-hidden"
          >
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filtered}
        searchPlaceholder="Search by applicant, project, or application ID..."
        onRowClick={(row) => router.push(`/officer/applications/${row.id}`)}
      />
    </div>
  );
}
