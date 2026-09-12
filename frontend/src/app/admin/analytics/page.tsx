'use client';

import React, { useState } from 'react';
import { 
  AlertTriangle, 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  Legend
} from 'recharts';
import { useLanguage } from '@/context/LanguageContext';
import { mockAnalyticsData } from '@/data/analytics';
import { Modal } from '@/components/common/Modal';
import { BottleneckItem } from '@/types';

export default function AdminAnalyticsPage() {
  const { isMarathi } = useLanguage();
  const { summary, approvalFunnel, monthlyTrend, bottlenecks, radarDimensions } = mockAnalyticsData;

  const [drillDownModalItem, setDrillDownModalItem] = useState<BottleneckItem | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white bg-[#172A46] px-2.5 py-0.5 rounded border border-slate-700">
              Executive Decision Support
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#172A46] mt-1">
            {isMarathi ? "राज्यस्तरीय मंजुरी बुद्धिमत्ता व फनेल विश्लेषण" : "Statewide Clearance Intelligence & Funnel Analytics"}
          </h2>
          <p className="text-xs text-slate-500">
            {isMarathi 
              ? "एक खिडकी मंजुरीचा फनेल प्रवाह, अडथळा विश्लेषण आणि सुधारणांचे फलित."
              : "End-to-end statutory conversion funnel, system bottleneck radar, and impact metrics."}
          </p>
        </div>

        <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded border border-slate-200 shadow-2xs">
          Data Period: <strong>FY 2026-27 (Apr - Sep YTD)</strong>
        </span>
      </div>

      {/* Admin Impact View: Before vs Current Single Window Reform */}
      <div className="rounded-xl border-2 border-[#263B63]/20 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-[#172A46]">
              {isMarathi ? "सुधारणांचा परिणाम: जुनी पद्धत विरूद्ध एक खिडकी पद्धत" : "Policy Reform Impact: Before vs Current Performance"}
            </h3>
            <p className="text-xs text-slate-500">Demonstrating tangible efficiency gains under Maharashtra Business Facilitation Act</p>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            ✓ 39% Faster Clearances
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {/* Metric 1 */}
          <div className="rounded-lg bg-[#FBF9F5] p-4 border border-[#E6E0D4] space-y-2">
            <span className="text-slate-400 block font-bold text-[10px] uppercase">Average Approval Time</span>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-[#172A46]">11 Days</span>
              <span className="text-xs text-slate-400 line-through">18 Days (Before)</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full w-[61%]" />
            </div>
            <span className="text-[10px] text-emerald-700 font-bold block">7 Days Saved per Applicant</span>
          </div>

          {/* Metric 2 */}
          <div className="rounded-lg bg-[#FBF9F5] p-4 border border-[#E6E0D4] space-y-2">
            <span className="text-slate-400 block font-bold text-[10px] uppercase">Incomplete Applications Rate</span>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-emerald-700">16%</span>
              <span className="text-xs text-slate-400 line-through">31% (Before)</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full w-[51%]" />
            </div>
            <span className="text-[10px] text-emerald-700 font-bold block">Reduced via Document Locker</span>
          </div>

          {/* Metric 3 */}
          <div className="rounded-lg bg-[#FBF9F5] p-4 border border-[#E6E0D4] space-y-2">
            <span className="text-slate-400 block font-bold text-[10px] uppercase">SLA Compliance Rate</span>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-[#263B63]">87.4%</span>
              <span className="text-xs text-slate-400 line-through">62.0% (Before)</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-[#263B63] h-full w-[87.4%]" />
            </div>
            <span className="text-[10px] text-blue-700 font-bold block">+25.4% Public Services Adherence</span>
          </div>

          {/* Metric 4 */}
          <div className="rounded-lg bg-[#FBF9F5] p-4 border border-[#E6E0D4] space-y-2">
            <span className="text-slate-400 block font-bold text-[10px] uppercase">Physical Office Visits Required</span>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-[#D89B3C]">1.2 Visits</span>
              <span className="text-xs text-slate-400 line-through">6.4 Visits</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-[#D89B3C] h-full w-[19%]" />
            </div>
            <span className="text-[10px] text-amber-900 font-bold block">81% Digital Citizen Efficiency</span>
          </div>
        </div>
      </div>

      {/* 1. Statutory Approval Flow Funnel */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-[#172A46]">
              {isMarathi ? "मंजुरी प्रवाह फनेल (Approval Flow Funnel)" : "Statewide Statutory Clearance Funnel"}
            </h3>
            <p className="text-xs text-slate-500">Tracking application throughput and attrition across statutory milestones</p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Total Inflow: <strong>{summary.applicationsReceived.toLocaleString()} Applications</strong>
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {approvalFunnel.map((step, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-bold text-[#172A46]">
                  <span className="h-5 w-5 rounded-full bg-[#172A46] text-white flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{isMarathi ? step.stageMr : step.stage}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900">{step.count.toLocaleString()}</span>
                  <span className="text-slate-500 text-[11px] font-semibold w-12 text-right">({step.percentage}%)</span>
                </div>
              </div>

              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#172A46] to-[#3D8C82] transition-all duration-500"
                  style={{ width: `${step.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Grid: Monthly Trend + Bottleneck Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 6-Month Processing Time & Inflow Trend (7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#172A46]">6-Month Processing Time & Inflow Trend</h3>
              <p className="text-xs text-slate-500">Average clearance turnaround (Days) vs Dossiers received</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line yAxisId="left" type="monotone" dataKey="received" stroke="#172A46" strokeWidth={2.5} name="Applications Received" />
                <Line yAxisId="left" type="monotone" dataKey="approved" stroke="#3D8C82" strokeWidth={2.5} name="Clearances Issued" />
                <Line yAxisId="right" type="monotone" dataKey="avgDays" stroke="#D89B3C" strokeWidth={2} strokeDasharray="5 5" name="Avg Processing Days" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottleneck Radar Chart (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-[#172A46]">System Operational Health Radar</h3>
            <p className="text-xs text-slate-500">Multi-dimensional clearance velocity (0-100 score)</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarDimensions}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar name="Operational Score" dataKey="score" stroke="#263B63" fill="#D89B3C" fillOpacity={0.4} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* System Bottlenecks with Interactive Drilldown */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-[#172A46] flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              {isMarathi ? "प्रणालीतील अडथळे व सखोल विश्लेषण (Bottleneck Drilldown)" : "System Bottlenecks & Root Cause Drilldown"}
            </h3>
            <p className="text-xs text-slate-500">Click on any detected bottleneck to open granular diagnostic analysis</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bottlenecks.map((bn) => (
            <div
              key={bn.id}
              onClick={() => setDrillDownModalItem(bn)}
              className="rounded-lg border border-slate-200 p-4 space-y-3 cursor-pointer hover:border-[#172A46] hover:shadow-md transition-all flex flex-col justify-between bg-[#FBF9F5]"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#172A46]">Rank #{bn.rank}</span>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    bn.level === "Critical" ? "bg-rose-100 text-rose-800" :
                    bn.level === "Warning" ? "bg-amber-100 text-amber-800" :
                    "bg-blue-100 text-blue-800"
                  }`}>
                    {bn.level}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">
                  {isMarathi ? (bn.approvalMr || bn.approval) : bn.approval}
                </h4>
                <p className="text-xs font-semibold text-slate-600">{bn.metric}</p>
                <p className="text-[11px] text-slate-500 line-clamp-2">{bn.reason}</p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-[#263B63]">
                <span>Cost of Delay: {bn.applicationCount} Units</span>
                <span className="flex items-center gap-0.5 text-blue-700">Drill Down →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Drill Down Modal */}
      <Modal
        isOpen={!!drillDownModalItem}
        onClose={() => setDrillDownModalItem(null)}
        title={drillDownModalItem?.approval || "Bottleneck Diagnostic"}
        subtitle={`Rank #${drillDownModalItem?.rank} Root Cause Analysis`}
        size="lg"
      >
        {drillDownModalItem && (
          <div className="space-y-4 text-xs">
            <div className="rounded-lg bg-rose-50 p-4 border border-rose-200 text-rose-950 space-y-1">
              <span className="font-bold uppercase text-[10px] text-rose-800">Operational Delay Metric</span>
              <p className="text-sm font-bold">{drillDownModalItem.metric} • {drillDownModalItem.applicationCount} Industrial Units Delayed</p>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-[#FBF9F5] p-3 rounded-lg border border-[#E6E0D4]">
              <div>
                <span className="text-slate-400 block font-bold text-[10px] uppercase">Bottleneck Stage</span>
                <span className="font-bold text-slate-800">{drillDownModalItem.stage}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-bold text-[10px] uppercase">Cost of Delay</span>
                <span className="font-semibold text-slate-800">{drillDownModalItem.costOfDelay}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-slate-800 block text-[11px]">Identified Systemic Root Cause:</span>
              <p className="text-slate-700 bg-white p-3 rounded border border-slate-200 leading-relaxed font-medium">
                {drillDownModalItem.reason}
              </p>
            </div>

            <div className="rounded-lg bg-emerald-50 p-3.5 border border-emerald-200 text-emerald-950 space-y-1">
              <span className="font-bold block text-[11px] text-emerald-900">Recommended Executive Action:</span>
              <p className="text-emerald-800 leading-relaxed">{drillDownModalItem.recommendation}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
