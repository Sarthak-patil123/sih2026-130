'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  Plus, 
  GitMerge, 
} from 'lucide-react';
import { usePortal } from '@/context/PortalContext';
import { useLanguage } from '@/context/LanguageContext';
import { ProjectPassport } from '@/components/journey/ProjectPassport';
import { BusinessJourney } from '@/components/journey/BusinessJourney';
import { NextBestAction } from '@/components/journey/NextBestAction';
import { BlockerSystem } from '@/components/journey/BlockerSystem';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { BlockerItem } from '@/types';

export default function EntrepreneurDashboardPage() {
  const { 
    currentProject, 
    currentProjectApplications, 
  } = usePortal();

  const { isMarathi } = useLanguage();
  const router = useRouter();

  const handleResolveBlocker = (blocker: BlockerItem) => {
    if (blocker.applicationId) {
      router.push(`/entrepreneur/applications/${blocker.applicationId}`);
    } else {
      router.push('/entrepreneur/documents');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#263B63] bg-[#F4F1EA] px-2.5 py-0.5 rounded border border-[#E6E0D4]">
              {isMarathi ? "उद्योजक डॅशबोर्ड" : "Entrepreneur Dashboard"}
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#263B63] mt-1">
            {isMarathi ? "शुभ प्रभात, " : "Good morning, "} 
            <span className="text-[#D89B3C]">
              {isMarathi ? (currentProject?.companyNameMr || currentProject?.companyName) : currentProject?.companyName}
            </span> 👋
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isMarathi 
              ? "आपल्या प्रकल्पाचा पासपोर्ट, व्यवसाय प्रवास, आवश्यक कृती आणि मंजुऱ्यांचे थेट व्यवस्थापन."
              : "Single window tracking for your Project Passport, Business Journey, Next Best Actions, and statutory compliance."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            icon={GitMerge}
            onClick={() => router.push('/entrepreneur/roadmap')}
          >
            {isMarathi ? "मंजुरी नकाशा" : "Approval Roadmap"}
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => router.push('/entrepreneur/projects/new')}
          >
            {isMarathi ? "नवीन प्रकल्प नोंदणी" : "Register New Project"}
          </Button>
        </div>
      </div>

      {/* 1. Signature Concept: Project Passport */}
      <ProjectPassport
        project={currentProject}
        onOpenRoadmap={() => router.push('/entrepreneur/roadmap')}
        onOpenDocuments={() => router.push('/entrepreneur/documents')}
      />

      {/* 2. Signature Concept: Business Journey */}
      <BusinessJourney
        currentStage={4}
        progress={currentProject?.journeyProgress || 68}
        onNavigateTo={(path) => router.push(path)}
      />

      {/* 3. Signature Concept: Next Best Action Priorities */}
      <NextBestAction
        actions={currentProject?.nextBestActions || []}
        onActionClick={(link) => router.push(link)}
      />

      {/* 4. Signature Concept: What's Blocking Your Project? */}
      {currentProject?.blockers && currentProject.blockers.length > 0 && (
        <BlockerSystem
          blockers={currentProject.blockers}
          onResolveBlocker={handleResolveBlocker}
        />
      )}

      {/* 5. Recent Statutory Applications & Clearances */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-[#263B63]">
              {isMarathi ? "सध्याचे कायदेशीर अर्ज व मंजुऱ्या" : "Statutory Applications & Regulatory Clearances"}
            </h3>
            <p className="text-xs text-slate-500">Live clearance status across Maharashtra regulatory departments</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => router.push('/entrepreneur/applications')}
          >
            {isMarathi ? "सर्व अर्ज पहा" : "View All"}
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                <th className="py-3 px-3">Application ID</th>
                <th className="py-3 px-3">Clearance / Approval</th>
                <th className="py-3 px-3">Department</th>
                <th className="py-3 px-3">Submitted</th>
                <th className="py-3 px-3">SLA Target</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentProjectApplications.slice(0, 5).map((app) => (
                <tr
                  key={app.id}
                  onClick={() => router.push(`/entrepreneur/applications/${app.id}`)}
                  className="hover:bg-blue-50/40 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-3 font-mono font-bold text-[#263B63]">{app.id}</td>
                  <td className="py-3.5 px-3 font-bold text-slate-900">{app.approval}</td>
                  <td className="py-3.5 px-3 text-slate-500 truncate max-w-[160px]">{app.department}</td>
                  <td className="py-3.5 px-3 text-slate-600">{app.submittedOn}</td>
                  <td className="py-3.5 px-3 font-semibold text-slate-800">{app.deadline}</td>
                  <td className="py-3.5 px-3">
                    <StatusBadge status={app.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <span className="text-xs font-bold text-[#263B63] hover:text-[#3D8C82]">
                      {isMarathi ? "तपशील →" : "Details →"}
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
