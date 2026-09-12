'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Activity, 
  BarChart3, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  Sliders,
} from 'lucide-react';
import { usePortal } from '@/context/PortalContext';
import { useLanguage } from '@/context/LanguageContext';
import { StatCard } from '@/components/common/StatCard';
import { MaharashtraMap } from '@/components/journey/MaharashtraMap';
import { mockAnalyticsData } from '@/data/analytics';
import { Button } from '@/components/common/Button';

export default function AdminDashboardPage() {
  const { selectedDistrictId, setSelectedDistrictId } = usePortal();
  const { isMarathi } = useLanguage();
  const router = useRouter();

  const { summary, impactComparison, departmentPerformance } = mockAnalyticsData;

  return (
    <div className="space-y-6">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white bg-[#172A46] px-2.5 py-0.5 rounded border border-slate-700">
              State Oversight & Reform Council
            </span>
            <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
              Demo Platform
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#172A46] mt-1">
            {isMarathi ? "महाराष्ट्र औद्योगिक नाडी (Maharashtra Industrial Pulse)" : "Maharashtra Industrial Pulse"}
          </h2>
          <p className="text-xs text-slate-500">
            {isMarathi 
              ? "राज्यातील ३६ जिल्ह्यांमधील औद्योगिक मंजुऱ्या, मुदत पूर्तता (SLA) आणि विभागनिहाय कामगिरीचे थेट विश्लेषण."
              : "Real-time state-level single-window intelligence, district clearance throughput, and inter-departmental bottleneck monitoring."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            icon={Sliders}
            onClick={() => router.push('/admin/simulation')}
          >
            {isMarathi ? "धोरणात्मक सिम्युलेशन" : "What-If Simulation"}
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={BarChart3}
            onClick={() => router.push('/admin/analytics')}
          >
            {isMarathi ? "सखोल विश्लेषण" : "Advanced Analytics"}
          </Button>
        </div>
      </div>

      {/* State-Level KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Statewide Applications (FY26)"
          value={summary.applicationsReceived.toLocaleString()}
          subtitle="All 36 Districts"
          icon={Activity}
          variant="primary"
        />
        <StatCard
          title="Average Clearance Time"
          value={`${impactComparison.avgApprovalTimeDays.current} Days`}
          subtitle={`Down from ${impactComparison.avgApprovalTimeDays.before} days (-39%)`}
          icon={Clock}
          variant="success"
        />
        <StatCard
          title="Public Service SLA Health"
          value={`${summary.overallSLACompliance}%`}
          subtitle="Statutory compliance rate"
          icon={ShieldCheck}
          variant="info"
        />
        <StatCard
          title="Active System Bottlenecks"
          value="3 Identified"
          subtitle="SEIAA, DISH, MIDC Water"
          icon={AlertTriangle}
          variant="warning"
          onClick={() => router.push('/admin/analytics')}
        />
      </div>

      {/* Signature Interactive Maharashtra District Map */}
      <MaharashtraMap
        selectedDistrictId={selectedDistrictId}
        onSelectDistrict={setSelectedDistrictId}
      />

      {/* Department Clearance Performance Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#172A46]">
              {isMarathi ? "विभागीय कामगिरी व मुदत पूर्तता निर्देशांक" : "Department Clearance Performance & SLA Compliance"}
            </h3>
            <p className="text-xs text-slate-500">Benchmark comparison across regulatory authorities</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/admin/analytics')}
          >
            Detailed Metrics →
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                <th className="py-3 px-4">Department / Authority</th>
                <th className="py-3 px-4 text-center">Applications</th>
                <th className="py-3 px-4 text-center">Approved</th>
                <th className="py-3 px-4 text-center">Pending</th>
                <th className="py-3 px-4 text-center">Avg Days (SLA Target)</th>
                <th className="py-3 px-4 text-center">SLA Compliance</th>
                <th className="py-3 px-4 text-right">Performance Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {departmentPerformance.map((dept) => (
                <tr key={dept.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {isMarathi ? dept.departmentMr : dept.department}
                  </td>
                  <td className="py-3.5 px-4 text-center font-semibold text-slate-700">{dept.applications}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-emerald-700">{dept.approved}</td>
                  <td className="py-3.5 px-4 text-center font-semibold text-blue-700">{dept.pending}</td>
                  <td className="py-3.5 px-4 text-center font-medium text-slate-800">
                    <strong>{dept.avgProcessingDays}d</strong> <span className="text-slate-400">({dept.slaTargetDays}d target)</span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-black text-slate-800">{dept.complianceRate}%</td>
                  <td className="py-3.5 px-4 text-right">
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
    </div>
  );
}
