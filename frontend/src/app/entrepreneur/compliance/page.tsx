'use client';

import React, { useState } from 'react';
import { 
  CalendarDays, 
  ShieldCheck, 
  RefreshCw, 
  ArrowRight, 
  TrendingUp, 
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { mockComplianceData } from '@/data/compliance';
import { ProjectExpansionSimulator } from '@/components/journey/ProjectExpansionSimulator';
import { Button } from '@/components/common/Button';

export default function ComplianceCenterPage() {
  const { isMarathi } = useLanguage();
  const [activeTab, setActiveTab] = useState("calendar"); // calendar, renewals, simulator

  const { healthScore, segments, calendarEvents, renewalsList } = mockComplianceData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Lifecycle Governance
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#263B63] mt-1">
            {isMarathi ? "अनुपालन केंद्र व दिनदर्शिका (Compliance Center)" : "Statutory Compliance Center & Calendar"}
          </h2>
          <p className="text-xs text-slate-500">
            {isMarathi 
              ? "नियमित कायदेशीर तपासण्या, परवाना नूतनीकरण आणि दीर्घकालीन अनुपालनाचे स्वयंचलित ट्रॅकिंग."
              : "Ongoing operational compliance, annual permit renewals, periodic environmental filings, and expansion modeling."}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-[#F4F1EA] p-1 rounded-lg border border-[#E6E0D4] text-xs">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
              activeTab === 'calendar' ? 'bg-[#263B63] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isMarathi ? "अनुपालन दिनदर्शिका" : "Compliance Calendar"}
          </button>
          <button
            onClick={() => setActiveTab('renewals')}
            className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
              activeTab === 'renewals' ? 'bg-[#263B63] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isMarathi ? "परवाना नूतनीकरण" : "Permit Renewals"}
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-md font-bold transition-all flex items-center gap-1 cursor-pointer ${
              activeTab === 'simulator' ? 'bg-[#263B63] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5 text-[#D89B3C]" />
            {isMarathi ? "विस्तार सिम्युलेटर" : "Expansion Simulator"}
          </button>
        </div>
      </div>

      {/* 4-Segment Health Overview */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#3D8C82]" />
            <h3 className="text-base font-bold text-[#263B63]">
              {isMarathi ? "अनुपालन आरोग्य निर्देशांक (Compliance Health)" : "Statutory Compliance Health Status"}
            </h3>
          </div>
          <span className="text-sm font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
            {healthScore}% Overall Good Health
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1 text-xs">
          {/* Segment 1: Documents */}
          <div className="rounded-lg bg-[#FBF9F5] p-3.5 border border-[#E6E0D4] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">{isMarathi ? segments.documents.labelMr : segments.documents.label}</span>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
            </div>
            <p className="font-bold text-emerald-800 text-sm">{segments.documents.score}</p>
            <span className="text-[10px] text-slate-400 block">Verified in Document Locker</span>
          </div>

          {/* Segment 2: Approvals */}
          <div className="rounded-lg bg-[#FBF9F5] p-3.5 border border-[#E6E0D4] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">{isMarathi ? segments.approvals.labelMr : segments.approvals.label}</span>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
            </div>
            <p className="font-bold text-emerald-800 text-sm">{segments.approvals.score}</p>
            <span className="text-[10px] text-slate-400 block">Clearances on Track</span>
          </div>

          {/* Segment 3: Renewals */}
          <div className="rounded-lg bg-[#FBF9F5] p-3.5 border border-[#E6E0D4] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">{isMarathi ? segments.renewals.labelMr : segments.renewals.label}</span>
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            </div>
            <p className="font-bold text-amber-800 text-sm">{segments.renewals.score}</p>
            <span className="text-[10px] text-slate-400 block">Fire Safety Certificate</span>
          </div>

          {/* Segment 4: Queries */}
          <div className="rounded-lg bg-[#FBF9F5] p-3.5 border border-[#E6E0D4] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">{isMarathi ? segments.queries.labelMr : segments.queries.label}</span>
              <span className="h-2.5 w-2.5 rounded-full bg-rose-600" />
            </div>
            <p className="font-bold text-rose-700 text-sm">{segments.queries.score}</p>
            <span className="text-[10px] text-slate-400 block">Water Demarcation Map</span>
          </div>
        </div>
      </div>

      {/* Tab 1: Compliance Calendar */}
      {activeTab === 'calendar' && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-[#263B63] flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-[#263B63]" />
                {isMarathi ? "सप्टेंबर - ऑक्टोबर २०२६ कायदेशीर दिनदर्शिका" : "September - October 2026 Statutory Calendar"}
              </h3>
              <p className="text-xs text-slate-500">Upcoming SLA milestones, inspection appointments, and periodic returns</p>
            </div>
          </div>

          <div className="space-y-3">
            {calendarEvents.map((evt) => (
              <div
                key={evt.id}
                className="rounded-lg border border-slate-200 bg-[#FBF9F5] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Big Date Badge */}
                  <div className="flex flex-col items-center justify-center h-14 w-14 rounded-lg bg-[#263B63] text-white shrink-0 shadow-2xs">
                    <span className="text-base font-black leading-none">{evt.day}</span>
                    <span className="text-[9px] uppercase font-bold text-[#D89B3C] mt-0.5">Sept</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#263B63]">
                        {isMarathi ? (evt.titleMr || evt.title) : evt.title}
                      </h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        evt.status === "Action Required" ? "bg-rose-100 text-rose-800" :
                        evt.status === "Scheduled" ? "bg-purple-100 text-purple-800" :
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {evt.status}
                      </span>
                    </div>

                    <p className="text-slate-600 font-medium">{evt.department} • Time: <strong>{evt.time}</strong></p>
                    <p className="text-[11px] text-slate-400">Venue: {evt.venue} (Officer: {evt.officer})</p>
                  </div>
                </div>

                <div className="shrink-0 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={ArrowRight}
                    iconPosition="right"
                    onClick={() => alert(`Opening event ${evt.title}`)}
                  >
                    View Schedule
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Renewals */}
      {activeTab === 'renewals' && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-[#263B63]">
              {isMarathi ? "कायदेशीर परवाना नूतनीकरण (Permit Renewals)" : "Upcoming Statutory Permit Expirations"}
            </h3>
            <p className="text-xs text-slate-500">Track and renew operational safety licenses before validity expires</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renewalsList.map((ren) => (
              <div key={ren.id} className="rounded-lg border border-slate-200 bg-[#FBF9F5] p-5 space-y-3 text-xs flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded text-[11px]">
                      Expires in {ren.expiresInDays} Days
                    </span>
                    <span className="text-slate-400">{ren.expiryDate}</span>
                  </div>

                  <h4 className="text-sm font-bold text-[#263B63]">
                    {isMarathi ? (ren.titleMr || ren.title) : ren.title}
                  </h4>
                  <p className="text-slate-500">{ren.department} • Used across {ren.usedInCount} clearances</p>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-end">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={RefreshCw}
                    onClick={() => alert(`Initiating renewal for ${ren.title}`)}
                  >
                    Initiate Renewal Filing
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Expansion Simulator */}
      {activeTab === 'simulator' && (
        <ProjectExpansionSimulator />
      )}
    </div>
  );
}
