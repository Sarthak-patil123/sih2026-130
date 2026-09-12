'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Filter, 
  Plus, 
} from 'lucide-react';
import { usePortal } from '@/context/PortalContext';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { ApplicationItem } from '@/types';

function ApplicationsContent() {
  const { applications } = usePortal();
  const router = useRouter();
  const searchParams = useSearchParams();

  const statusParam = searchParams.get('status') || 'All';
  const [selectedFilter, setSelectedFilter] = useState(statusParam);
  const [selectedDept, setSelectedDept] = useState('All');

  const filterTabs = [
    { label: 'All', count: applications.length },
    { label: 'Under Review', count: applications.filter(a => a.status === 'Under Review').length },
    { label: 'Query Raised', count: applications.filter(a => a.status === 'Query Raised').length },
    { label: 'Pending', count: applications.filter(a => a.status === 'Pending' || a.status === 'Inspection Pending').length },
    { label: 'Approved', count: applications.filter(a => a.status === 'Approved').length },
    { label: 'Rejected', count: applications.filter(a => a.status === 'Rejected').length },
  ];

  // Distinct departments
  const departments = useMemo(() => {
    const set = new Set(applications.map(a => a.department));
    return ['All', ...Array.from(set)];
  }, [applications]);

  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchStatus = selectedFilter === 'All' 
        ? true 
        : selectedFilter === 'Pending'
        ? app.status === 'Pending' || app.status === 'Inspection Pending'
        : app.status === selectedFilter;

      const matchDept = selectedDept === 'All' || app.department === selectedDept;

      return matchStatus && matchDept;
    });
  }, [applications, selectedFilter, selectedDept]);

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
      header: 'Approval Name',
      key: 'approval',
      sortable: true,
      render: (val: unknown, row: ApplicationItem) => (
        <div>
          <span className="font-bold text-slate-900 block">{String(val)}</span>
          <span className="text-[11px] text-slate-500">{row.companyName}</span>
        </div>
      )
    },
    {
      header: 'Department',
      key: 'department',
      sortable: true,
      render: (val: unknown) => (
        <span className="text-slate-600 truncate max-w-[200px] block">{String(val)}</span>
      )
    },
    {
      header: 'Submitted',
      key: 'submittedOn',
      sortable: true,
      render: (val: unknown) => <span className="text-slate-600">{String(val)}</span>
    },
    {
      header: 'Last Updated',
      key: 'lastUpdated',
      sortable: true,
      render: (val: unknown) => <span className="text-slate-500">{String(val || '—')}</span>
    },
    {
      header: 'SLA Deadline',
      key: 'deadline',
      sortable: true,
      render: (val: unknown) => (
        <span className="font-medium text-slate-700">{String(val)}</span>
      )
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
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/entrepreneur/applications/${row.id}`);
          }}
        >
          View Details
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-xl font-bold text-[#0F2942]">Statutory Applications</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor, track and respond to clearances across all Maharashtra regulatory departments.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => router.push('/entrepreneur/roadmap')}
        >
          Explore Clearances
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {filterTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => {
                setSelectedFilter(tab.label);
              }}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === tab.label
                  ? 'bg-[#0F2942] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
              <span
                className={`ml-1.5 rounded px-1.5 py-0.2 text-[10px] ${
                  selectedFilter === tab.label
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Department Filter Dropdown */}
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
        data={filteredApplications}
        searchPlaceholder="Search by application ID, clearance name, or company..."
        onRowClick={(row) => router.push(`/entrepreneur/applications/${row.id}`)}
        emptyTitle="No applications found"
        emptySubtitle="Try adjusting your status or department filter above."
      />
    </div>
  );
}

export default function ApplicationsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading applications...</div>}>
      <ApplicationsContent />
    </Suspense>
  );
}
