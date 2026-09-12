'use client';

import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Activity, 
} from 'lucide-react';
import { mockAnalyticsData } from '@/data/analytics';
import { StatCard } from '@/components/common/StatCard';
import { ProgressBar } from '@/components/common/ProgressBar';

export default function OfficerAnalyticsPage() {
  const { summary, departmentPerformance, bottlenecks, monthlyTrend } = mockAnalyticsData;

  const maxReceived = Math.max(...monthlyTrend.map(m => m.received));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
              State Industrial Intelligence
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#0F2942] mt-1">
            Single Window Clearance Analytics & SLA Monitor
          </h2>
          <p className="text-xs text-slate-500">
            Real-time throughput metrics, department clearance efficiency, and bottleneck detection across Maharashtra.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="rounded bg-emerald-50 px-2.5 py-1 text-emerald-800 border border-emerald-200 font-semibold">
            Average Clearance SLA: <strong>19.5 Working Days</strong>
          </span>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Applications Received"
          value={summary.applicationsReceived.toLocaleString()}
          subtitle="FY 2026-27 YTD"
          icon={Activity}
          variant="primary"
        />
        <StatCard
          title="Applications Approved"
          value={summary.applicationsApproved.toLocaleString()}
          subtitle={`${Math.round((summary.applicationsApproved / summary.applicationsReceived) * 100)}% Clearance Rate`}
          icon={CheckCircle2}
          variant="success"
        />
        <StatCard
          title="Pending in Scrutiny"
          value={summary.applicationsPending.toLocaleString()}
          subtitle="Across all nodal depts"
          icon={Clock}
          variant="info"
        />
        <StatCard
          title="Applications Rejected"
          value={summary.applicationsRejected.toLocaleString()}
          subtitle="Statutory non-compliance"
          icon={AlertTriangle}
          variant="danger"
        />
      </div>

      {/* Charts & Monthly Inflow Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Monthly Trend Visual Bar Chart (2 cols) */}
        <div className="lg:col-span-2 rounded-lg border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#0F2942]">Monthly Application Inflow vs Approved Clearances</h3>
              <p className="text-xs text-slate-500">Comparative statutory dossier processing volume</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="h-2.5 w-2.5 rounded-xs bg-[#0F2942]" /> Received
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="h-2.5 w-2.5 rounded-xs bg-emerald-500" /> Approved
              </span>
            </div>
          </div>

          <div className="h-56 flex items-end justify-between gap-3 pt-4 px-2">
            {monthlyTrend.map((m) => {
              const recHeight = (m.received / maxReceived) * 100;
              const appHeight = (m.approved / maxReceived) * 100;

              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1.5 h-full">
                    {/* Received Bar */}
                    <div
                      className="w-full max-w-[24px] bg-[#0F2942] rounded-t transition-all group-hover:bg-blue-950 relative"
                      style={{ height: `${recHeight}%` }}
                    >
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded pointer-events-none transition-opacity">
                        {m.received}
                      </span>
                    </div>

                    {/* Approved Bar */}
                    <div
                      className="w-full max-w-[24px] bg-emerald-500 rounded-t transition-all group-hover:bg-emerald-600 relative"
                      style={{ height: `${appHeight}%` }}
                    >
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded pointer-events-none transition-opacity">
                        {m.approved}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Overall SLA Adherence Gauge (1 col) */}
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0F2942]">Public Services Guarantee Adherence</h3>
            <p className="text-xs text-slate-500">Statutory clearance timeline compliance</p>
            
            <div className="my-6 text-center">
              <span className="text-4xl font-black text-emerald-700">
                {summary.overallSLACompliance}%
              </span>
              <p className="text-xs text-slate-500 font-semibold mt-1">Processed within statutory timeline</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Fast-track Clearances (&lt;10 Days)</span>
                  <span className="text-emerald-700">68%</span>
                </div>
                <ProgressBar progress={68} height="sm" color="success" showPercentage={false} />
              </div>
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Standard Clearances (10-30 Days)</span>
                  <span className="text-blue-700">22%</span>
                </div>
                <ProgressBar progress={22} height="sm" color="blue" showPercentage={false} />
              </div>
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Complex Major Projects (&gt;30 Days)</span>
                  <span className="text-amber-700">10%</span>
                </div>
                <ProgressBar progress={10} height="sm" color="warning" showPercentage={false} />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-400">
            Source: Maharashtra Right to Public Services Act (RTS) Audit
          </div>
        </div>

      </div>

      {/* Department Performance Benchmark Table */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-2xs overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-3.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Department Performance & SLA Clearance Benchmark
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                <th className="py-3 px-4">Regulatory Department</th>
                <th className="py-3 px-4 text-center">Applications</th>
                <th className="py-3 px-4 text-center">Approved</th>
                <th className="py-3 px-4 text-center">Pending</th>
                <th className="py-3 px-4 text-center">Avg Processing Days</th>
                <th className="py-3 px-4 text-center">Target SLA</th>
                <th className="py-3 px-4 text-center">Compliance</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {departmentPerformance.map((dept, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{dept.department}</td>
                  <td className="py-3 px-4 text-center font-semibold text-slate-800">{dept.applications}</td>
                  <td className="py-3 px-4 text-center font-semibold text-emerald-700">{dept.approved}</td>
                  <td className="py-3 px-4 text-center font-semibold text-blue-700">{dept.pending}</td>
                  <td className="py-3 px-4 text-center font-bold text-slate-800">{dept.avgProcessingDays} Days</td>
                  <td className="py-3 px-4 text-center text-slate-500 font-medium">{dept.slaTargetDays} Days</td>
                  <td className="py-3 px-4 text-center font-bold text-slate-800">{dept.complianceRate}%</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold ${
                      dept.status === "Excellent" ? "bg-emerald-100 text-emerald-800" :
                      dept.status === "Normal" ? "bg-blue-100 text-blue-800" :
                      dept.status === "Moderate" ? "bg-slate-100 text-slate-800" :
                      dept.status === "Delayed" ? "bg-amber-100 text-amber-900" :
                      "bg-rose-100 text-rose-800"
                    }`}>
                      {dept.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottlenecks & Remedial Policy Actions */}
      <div className="space-y-3">
        <div>
          <h3 className="text-base font-bold text-[#0F2942] flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            Detected Systemic Bottlenecks & Policy Recommendations
          </h3>
          <p className="text-xs text-slate-500">
            Algorithmic insights pinpointing delays in the statutory clearance lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bottlenecks.map((bn) => (
            <div
              key={bn.id}
              className={`rounded-lg border p-5 shadow-xs space-y-2.5 bg-white ${
                bn.level === "Critical" ? "border-rose-300 border-l-4 border-l-rose-600 bg-rose-50/10" :
                bn.level === "Warning" ? "border-amber-300 border-l-4 border-l-amber-500 bg-amber-50/10" :
                bn.level === "Watch" ? "border-blue-300 border-l-4 border-l-blue-500" :
                "border-emerald-300 border-l-4 border-l-emerald-500"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-bold text-[#0F2942]">{bn.approval}</h4>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                  bn.level === "Critical" ? "bg-rose-100 text-rose-800" :
                  bn.level === "Warning" ? "bg-amber-100 text-amber-800" :
                  bn.level === "Watch" ? "bg-blue-100 text-blue-800" :
                  "bg-emerald-100 text-emerald-800"
                }`}>
                  {bn.level}
                </span>
              </div>

              <div className="text-xs space-y-1.5">
                <p className="font-semibold text-slate-800">Observation: <span className="text-slate-600 font-normal">{bn.reason}</span></p>
                <div className="rounded bg-slate-50 p-2.5 border border-slate-200 text-slate-700">
                  <span className="font-bold text-[11px] text-blue-900 block">Recommended Action:</span>
                  <p className="mt-0.5">{bn.recommendation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
